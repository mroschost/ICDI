<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

// Update these values on Hostinger before using the API.
const ICDI_DB_HOST = 'localhost';
const ICDI_DB_NAME = 'u190624049_icdi';
const ICDI_DB_USER = 'u190624049_adminicdi';
const ICDI_DB_PASS = 'MROSCH0st!ng';
const ICDI_SESSION_NAME = 'icdi_admin_session';

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_name(ICDI_SESSION_NAME);
    session_start();
}

function icdi_json(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function icdi_pdo(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=utf8mb4', ICDI_DB_HOST, ICDI_DB_NAME);
    $pdo = new PDO($dsn, ICDI_DB_USER, ICDI_DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);

    return $pdo;
}

function icdi_current_admin(): ?array
{
    return $_SESSION['admin'] ?? null;
}

function icdi_require_admin(): array
{
    $admin = icdi_current_admin();
    if (!$admin) {
        icdi_json(401, ['ok' => false, 'error' => 'not_authenticated']);
    }

    return $admin;
}
