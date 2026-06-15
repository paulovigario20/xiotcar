<?php

namespace App\Services;

use App\Models\Car;
use App\Models\Retoma;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Process;
use PDO;
use RuntimeException;
use ZipArchive;

class BackupService
{
    private const DB_BACKUP_SQLITE3 = 'sqlite3_backup';
    private const DB_BACKUP_VACUUM_INTO = 'vacuum_into';
    private const DB_BACKUP_FILE_COPY = 'file_copy';
    /**
     * @return array{path: string, filename: string}
     */
    public function createBackupArchive(): array
    {
        if (! class_exists(ZipArchive::class)) {
            throw new RuntimeException('A extensão ZipArchive não está disponível no servidor.');
        }

        $databasePath = config('database.connections.sqlite.database');

        if (! is_string($databasePath) || ! is_file($databasePath)) {
            throw new RuntimeException('Base de dados SQLite não encontrada.');
        }

        $carsPath = storage_path('app/public/cars');
        $retomasPath = storage_path('app/public/retomas');

        $carsFiles = $this->collectFiles($carsPath, 'media/cars');
        $retomasFiles = $this->collectFiles($retomasPath, 'media/retomas');
        $includedFiles = array_merge(
            ['database.sqlite'],
            array_column($carsFiles, 'archive_path'),
            array_column($retomasFiles, 'archive_path'),
            ['manifest.json'],
        );

        $databaseSnapshot = $this->createConsistentDatabaseSnapshot($databasePath);

        $manifest = [
            'created_at' => now()->toIso8601String(),
            'app_version' => config('app.version', '1.0.0'),
            'laravel_version' => app()->version(),
            'cars_count' => Car::count(),
            'retomas_count' => Retoma::count(),
            'database_size_bytes' => filesize($databaseSnapshot['path']) ?: 0,
            'database_backup_method' => $databaseSnapshot['method'],
            'files' => $includedFiles,
        ];

        $filename = 'xiotecar-backup-' . now()->format('Y-m-d-Hi') . '.zip';
        $tempPath = tempnam(sys_get_temp_dir(), 'xiotecar-backup-');

        if ($tempPath === false) {
            throw new RuntimeException('Não foi possível criar ficheiro temporário para o backup.');
        }

        $zipPath = $tempPath . '.zip';
        @unlink($tempPath);

        $zip = new ZipArchive();

        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            @unlink($databaseSnapshot['path']);

            throw new RuntimeException('Não foi possível criar o ficheiro ZIP.');
        }

        try {
            $zip->addFile($databaseSnapshot['path'], 'database.sqlite');

            foreach (array_merge($carsFiles, $retomasFiles) as $file) {
                $zip->addFile($file['source_path'], $file['archive_path']);
            }

            $zip->addFromString('manifest.json', json_encode(
                $manifest,
                JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
            ) . PHP_EOL);

            $zip->close();
        } catch (\Throwable $e) {
            $zip->close();
            @unlink($zipPath);

            throw $e;
        } finally {
            @unlink($databaseSnapshot['path']);
        }

        return [
            'path' => $zipPath,
            'filename' => $filename,
        ];
    }

    /**
     * @return array{path: string, method: string}
     */
    private function createConsistentDatabaseSnapshot(string $sourcePath): array
    {
        $snapshotPath = tempnam(sys_get_temp_dir(), 'xiotecar-db-');

        if ($snapshotPath === false) {
            throw new RuntimeException('Não foi possível criar ficheiro temporário para o snapshot da base de dados.');
        }

        $snapshotPath .= '.sqlite';
        @unlink($snapshotPath);

        if ($this->backupDatabaseWithSqlite3($sourcePath, $snapshotPath)) {
            return [
                'path' => $snapshotPath,
                'method' => self::DB_BACKUP_SQLITE3,
            ];
        }

        if ($this->backupDatabaseWithVacuumInto($sourcePath, $snapshotPath)) {
            return [
                'path' => $snapshotPath,
                'method' => self::DB_BACKUP_VACUUM_INTO,
            ];
        }

        if (! @copy($sourcePath, $snapshotPath) || ! is_file($snapshotPath)) {
            throw new RuntimeException('Não foi possível criar snapshot consistente da base de dados SQLite.');
        }

        return [
            'path' => $snapshotPath,
            'method' => self::DB_BACKUP_FILE_COPY,
        ];
    }

    private function backupDatabaseWithSqlite3(string $sourcePath, string $destinationPath): bool
    {
        $sqlite3 = trim((string) shell_exec('command -v sqlite3 2>/dev/null'));

        if ($sqlite3 === '') {
            return false;
        }

        if (is_file($destinationPath)) {
            @unlink($destinationPath);
        }

        $result = Process::run([
            $sqlite3,
            $sourcePath,
            '.backup ' . $destinationPath,
        ]);

        return $result->successful()
            && is_file($destinationPath)
            && (filesize($destinationPath) ?: 0) > 0;
    }

    private function backupDatabaseWithVacuumInto(string $sourcePath, string $destinationPath): bool
    {
        if (is_file($destinationPath)) {
            @unlink($destinationPath);
        }

        try {
            $pdo = new PDO('sqlite:' . $sourcePath);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $escapedDestination = str_replace("'", "''", $destinationPath);
            $pdo->exec("VACUUM INTO '{$escapedDestination}'");

            return is_file($destinationPath) && (filesize($destinationPath) ?: 0) > 0;
        } catch (\Throwable) {
            @unlink($destinationPath);

            return false;
        }
    }

    /**
     * @return array<int, array{source_path: string, archive_path: string}>
     */
    private function collectFiles(string $directory, string $archivePrefix): array
    {
        if (! is_dir($directory)) {
            return [];
        }

        $files = [];

        foreach (File::allFiles($directory) as $file) {
            if (! $file->isFile()) {
                continue;
            }

            $relativePath = ltrim(str_replace($directory, '', $file->getPathname()), DIRECTORY_SEPARATOR);

            $files[] = [
                'source_path' => $file->getPathname(),
                'archive_path' => trim($archivePrefix . '/' . str_replace(DIRECTORY_SEPARATOR, '/', $relativePath), '/'),
            ];
        }

        return $files;
    }
}
