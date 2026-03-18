<?php
require_once __DIR__ . '/auth.php';
if (admin_logged_in()) {
  header('Location: /admin');
  exit;
}
$error = isset($_GET['error']);
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $p = trim((string)($_POST['password'] ?? ''));
  if ($p === ADMIN_PASSWORD) {
    $_SESSION['ppsi_admin'] = true;
    header('Location: /admin');
    exit;
  }
  header('Location: /admin/login?error=1');
  exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Login | PPSI</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #0f4c81; color: #fff; }
    .box { background: rgba(255,255,255,0.08); padding: 40px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.2); width: 100%; max-width: 360px; }
    h1 { margin: 0 0 24px; font-size: 22px; font-weight: 700; }
    label { display: block; margin-bottom: 8px; font-size: 14px; opacity: 0.9; }
    input[type="password"] { width: 100%; padding: 12px 16px; border: 1px solid rgba(255,255,255,0.3); border-radius: 8px; background: rgba(255,255,255,0.1); color: #fff; font-size: 16px; margin-bottom: 20px; }
    input::placeholder { color: rgba(255,255,255,0.5); }
    button { width: 100%; padding: 14px; background: #fff; color: #0f4c81; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; }
    button:hover { background: #e8f2fa; }
    .error { background: rgba(220,50,50,0.2); color: #ffb3b3; padding: 10px 14px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; display: none; }
    .error.show { display: block; }
    .hint { margin: 0 0 16px; font-size: 12px; opacity: 0.75; }
    .hint code { background: rgba(0,0,0,0.2); padding: 2px 6px; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="box">
    <h1>PPSI Admin</h1>
    <div class="error<?php echo $error ? ' show' : ''; ?>">Invalid password.</div>
    <form method="post" action="/admin/login">
      <label for="pw">Password</label>
      <input type="password" id="pw" name="password" required autocomplete="current-password" placeholder="ppsi-admin-2025" />
      <p class="hint">Default: <code>ppsi-admin-2025</code></p>
      <button type="submit">Log in</button>
    </form>
  </div>
</body>
</html>
