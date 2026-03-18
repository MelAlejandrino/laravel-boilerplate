<?php

namespace App\Console\Commands;

use App\Constants\Permissions;
use Illuminate\Console\Command;
use ReflectionClass;

class GeneratePermissionsTs extends Command
{
    protected $signature = 'generate:permissions-ts';
    protected $description = 'Generate permissions.ts from Permissions.php';

    public function handle(): void
    {
        $reflection = new ReflectionClass(Permissions::class);
        $constants = $reflection->getConstants();

        unset($constants['ALL']);

        $lines = ["export const PERMISSIONS = {"];

        foreach ($constants as $key => $value) {
            $lines[] = "    {$key}: '{$value}',";
        }

        $lines[] = "} as const;";
        $lines[] = "";
        $lines[] = "export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];";

        $output = implode("\n", $lines);
        $path = resource_path('js/constants/permissions.ts');

        file_put_contents($path, $output);

        $this->info('Generated resources/js/constants/permissions.ts');
    }
}
