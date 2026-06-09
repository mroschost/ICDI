<?php
declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

const ICDI_ADMIN_PASSWORD_SALT = 'icdi-admin-2026';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    icdi_json(405, ['ok' => false, 'error' => 'method_not_allowed']);
}

$raw = file_get_contents('php://input');
$input = json_decode($raw ?: '', true);
if (!is_array($input)) {
    $input = $_POST;
}

$username = trim((string)($input['username'] ?? ''));
$password = (string)($input['password'] ?? '');

if ($username === '' || $password === '') {
    icdi_json(400, ['ok' => false, 'error' => 'missing_credentials']);
}

$stmt = icdi_pdo()->prepare(
    'SELECT id, username, full_name, role, password_hash, is_active
     FROM admin_users
     WHERE username = :username
     LIMIT 1'
);
$stmt->execute(['username' => $username]);
$admin = $stmt->fetch();

if (!$admin || !(int)$admin['is_active']) {
    icdi_json(401, ['ok' => false, 'error' => 'invalid_credentials']);
}

$expectedHash = hash('sha256', ICDI_ADMIN_PASSWORD_SALT . $password);
if (!hash_equals((string)$admin['password_hash'], $expectedHash)) {
    icdi_json(401, ['ok' => false, 'error' => 'invalid_credentials']);
}

session_regenerate_id(true);
$_SESSION['admin'] = [
    'id' => (int)$admin['id'],
    'username' => (string)$admin['username'],
    'fullName' => (string)$admin['full_name'],
    'role' => (string)$admin['role'],
];

$update = icdi_pdo()->prepare('UPDATE admin_users SET last_login_at = NOW() WHERE id = :id');
$update->execute(['id' => (int)$admin['id']]);

icdi_json(200, ['ok' => true, 'admin' => $_SESSION['admin']]);
