<?php

namespace App\Http\Controllers;

use App\Services\BackupService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class BackupController extends Controller
{
    public function download(Request $request, BackupService $backupService): BinaryFileResponse
    {
        $user = $request->user();

        if (! $user || ! $user->isAdministrator()) {
            abort(403);
        }

        try {
            $backup = $backupService->createBackupArchive();
        } catch (\Throwable $e) {
            Log::error('Falha ao gerar backup manual: ' . $e->getMessage());

            abort(500, 'Não foi possível gerar o backup. Tente novamente.');
        }

        return response()->download(
            $backup['path'],
            $backup['filename'],
            ['Content-Type' => 'application/zip']
        )->deleteFileAfterSend(true);
    }
}
