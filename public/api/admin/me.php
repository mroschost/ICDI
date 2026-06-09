<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$admin = icdi_current_admin();
if (!$admin) {
    icdi_json(401, ['ok' => false, 'error' => 'not_authenticated']);
}

icdi_json(200, ['ok' => true, 'admin' => $admin]);
