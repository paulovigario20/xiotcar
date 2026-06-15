<?php

namespace App\Services;

use App\Models\Car;
use App\Models\Retoma;
use Illuminate\Support\Facades\File;
use RuntimeException;
use ZipArchive;

class BackupService
{
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

        $manifest = [
            'created_at' => now()->toIso8601String(),
            'app_version' => config('app.version', '1.0.0'),
            'laravel_version' => app()->version(),
            'cars_count' => Car::count(),
            'retomas_count' => Retoma::count(),
            'database_size_bytes' => filesize($databasePath) ?: 0,
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
            throw new RuntimeException('Não foi possível criar o ficheiro ZIP.');
        }

        try {
            $zip->addFile($databasePath, 'database.sqlite');

            foreach (array_merge($carsFiles, $retomasFiles) as $file) {
                $zip->addFile($file['source_path'], $file['archive_path']);
            }

            $zip->addFromString('manifest.json', json_encode(
                $manifest,
                JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
            ) . PHP_EOL);
        } catch (\Throwable $e) {
            $zip->close();
            @unlink($zipPath);

            throw $e;
        }

        $zip->close();

        return [
            'path' => $zipPath,
            'filename' => $filename,
        ];
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
