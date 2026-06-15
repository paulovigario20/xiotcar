<?php

namespace Tests\Feature;

use App\Models\User;
use App\Services\BackupService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use ZipArchive;

class BackupDownloadTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_download_backup(): void
    {
        $this->get(route('backup.download'))->assertRedirect(route('login'));
    }

    public function test_non_admin_cannot_download_backup(): void
    {
        $user = User::factory()->create(['email' => 'user@example.com']);

        $this->actingAs($user)
            ->get(route('backup.download'))
            ->assertForbidden();
    }

    public function test_admin_can_download_backup_zip(): void
    {
        $admin = User::factory()->create(['email' => 'admin@xiotecar.pt']);

        $zipPath = tempnam(sys_get_temp_dir(), 'backup-test-') . '.zip';
        $zip = new ZipArchive();
        $zip->open($zipPath, ZipArchive::CREATE);
        $zip->addFromString('manifest.json', json_encode([
            'cars_count' => 2,
            'retomas_count' => 1,
            'files' => ['database.sqlite', 'manifest.json'],
        ]));
        $zip->addFromString('database.sqlite', 'sqlite-content');
        $zip->close();

        $this->mock(BackupService::class, function ($mock) use ($zipPath) {
            $mock->shouldReceive('createBackupArchive')
                ->once()
                ->andReturn([
                    'path' => $zipPath,
                    'filename' => 'xiotecar-backup-2026-06-16-1530.zip',
                ]);
        });

        $response = $this->actingAs($admin)->get(route('backup.download'));

        $response->assertOk();
        $response->assertDownload('xiotecar-backup-2026-06-16-1530.zip');
    }
}
