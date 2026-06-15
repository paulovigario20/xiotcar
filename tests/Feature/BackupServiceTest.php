<?php

namespace Tests\Feature;

use App\Models\Brand;
use App\Models\Car;
use App\Models\Retoma;
use App\Services\BackupService;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Tests\TestCase;
use ZipArchive;

class BackupServiceTest extends TestCase
{
    private string $databasePath;

    protected function setUp(): void
    {
        parent::setUp();

        $this->databasePath = storage_path('framework/backup-service-test.sqlite');
        File::delete($this->databasePath);
        File::ensureDirectoryExists(dirname($this->databasePath));
        touch($this->databasePath);

        config(['database.connections.sqlite.database' => $this->databasePath]);
        DB::purge('sqlite');
        DB::reconnect('sqlite');
        Artisan::call('migrate', ['--force' => true]);
    }

    protected function tearDown(): void
    {
        File::delete($this->databasePath);

        parent::tearDown();
    }

    public function test_create_backup_archive_includes_database_media_and_manifest(): void
    {
        $carsFile = storage_path('app/public/cars/test.jpg');
        $retomasFile = storage_path('app/public/retomas/test.jpg');
        File::ensureDirectoryExists(dirname($carsFile));
        File::ensureDirectoryExists(dirname($retomasFile));
        File::put($carsFile, 'car-image');
        File::put($retomasFile, 'retoma-image');

        $brand = Brand::factory()->create();
        Car::create([
            'brand_id' => $brand->id,
            'model' => '320d',
            'year' => 2018,
            'price' => 15000,
            'image' => 'cars/test.jpg',
        ]);
        Retoma::create([
            'marca' => 'Audi',
            'modelo' => 'A3',
            'ano' => 2017,
            'quilometragem' => 120000,
            'contacto' => '933188588',
            'imagens' => ['retomas/test.jpg'],
        ]);

        $backup = app(BackupService::class)->createBackupArchive();

        $this->assertFileExists($backup['path']);
        $this->assertStringStartsWith('xiotecar-backup-', $backup['filename']);

        $zip = new ZipArchive();
        $this->assertTrue($zip->open($backup['path']) === true);

        $manifest = json_decode($zip->getFromName('manifest.json'), true);
        $this->assertSame(1, $manifest['cars_count']);
        $this->assertSame(1, $manifest['retomas_count']);
        $this->assertGreaterThan(0, $manifest['database_size_bytes']);
        $this->assertContains('database.sqlite', $manifest['files']);
        $this->assertContains('media/cars/test.jpg', $manifest['files']);
        $this->assertContains('media/retomas/test.jpg', $manifest['files']);
        $this->assertContains($manifest['database_backup_method'], [
            'sqlite3_backup',
            'vacuum_into',
            'file_copy',
        ]);

        $dbContents = $zip->getFromName('database.sqlite');
        $this->assertNotFalse($dbContents);
        $this->assertStringStartsWith('SQLite format 3', $dbContents);

        $zip->close();

        @unlink($backup['path']);
        File::delete($carsFile);
        File::delete($retomasFile);
    }
}
