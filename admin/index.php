<?php
require_once __DIR__ . '/auth.php';
require_admin();
require_once dirname(__DIR__) . '/php/config.php';

$submissions = read_json(data_path('submissions.json'), []);
$medical = read_json(data_path('medical_record_requests.json'), []);
$jobs = read_json(data_path('job_applications.json'), []);

// Sort newest first
usort($submissions, fn($a, $b) => strcmp($b['created_at'] ?? '', $a['created_at'] ?? ''));
usort($medical, fn($a, $b) => strcmp($b['created_at'] ?? '', $a['created_at'] ?? ''));
usort($jobs, fn($a, $b) => strcmp($b['created_at'] ?? '', $a['created_at'] ?? ''));
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Dashboard | PPSI</title>
  <link rel="stylesheet" href="/css/ppsi-shared.css" />
  <style>
    .admin-wrap { min-height: 100vh; background: #f0f6fb; }
    .admin-header { background: #0f4c81; color: #fff; padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 2px 8px rgba(15,76,129,0.2); }
    .admin-header h1 { margin: 0; font-size: 20px; font-weight: 700; }
    .admin-header a { color: rgba(255,255,255,0.95); text-decoration: none; font-size: 14px; font-weight: 600; padding: 8px 16px; border-radius: 8px; background: rgba(255,255,255,0.15); }
    .admin-header a:hover { background: rgba(255,255,255,0.25); }
    .admin-main { max-width: 1200px; margin: 0 auto; padding: 32px 24px; }
    .admin-card { background: #fff; border-radius: 16px; padding: 24px; margin-bottom: 24px; box-shadow: 0 2px 12px rgba(15,76,129,0.08); border: 1px solid rgba(15,76,129,0.06); }
    .admin-card h2 { margin: 0 0 20px; font-size: 18px; font-weight: 700; color: #0f4c81; }
    .admin-table { width: 100%; border-collapse: collapse; font-size: 14px; }
    .admin-table th, .admin-table td { text-align: left; padding: 12px 16px; border-bottom: 1px solid #eef5fb; }
    .admin-table th { background: #f8fbfd; color: #0f4c81; font-weight: 600; }
    .admin-table tr:hover td { background: #fafcfe; }
    .admin-badge { display: inline-block; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
    .admin-badge-contact { background: #e3f2fd; color: #0f4c81; }
    .admin-badge-appointment { background: #e8f5e9; color: #2e7d32; }
    .admin-payload { font-family: monospace; font-size: 12px; max-width: 400px; white-space: pre-wrap; word-break: break-word; color: #475467; }
    .admin-meta { color: #667085; font-size: 12px; }
    .admin-empty { color: #94a3b8; padding: 24px; text-align: center; }
    .admin-count { background: #0f4c81; color: #fff; padding: 2px 8px; border-radius: 10px; font-size: 12px; font-weight: 600; margin-left: 8px; }
  </style>
</head>
<body class="admin-wrap">
  <header class="admin-header">
    <h1>PPSI Admin Dashboard</h1>
    <a href="/admin/logout">Log out</a>
  </header>
  <main class="admin-main">
    <div class="admin-card">
      <h2>Form submissions <span class="admin-count"><?php echo count($submissions); ?></span></h2>
      <?php if (empty($submissions)): ?>
        <p class="admin-empty">No submissions yet.</p>
      <?php else: ?>
        <table class="admin-table">
          <thead>
            <tr><th>Date</th><th>Type</th><th>Details</th></tr>
          </thead>
          <tbody>
            <?php foreach ($submissions as $r): $p = json_decode($r['payload'] ?? '{}', true) ?: []; ?>
            <tr>
              <td class="admin-meta"><?php echo htmlspecialchars($r['created_at'] ?? ''); ?></td>
              <td><span class="admin-badge admin-badge-<?php echo ($r['type'] ?? '') === 'contact' ? 'contact' : 'appointment'; ?>"><?php echo htmlspecialchars($r['type'] ?? ''); ?></span></td>
              <td><div class="admin-payload"><?php echo htmlspecialchars(implode(' · ', array_map(function($k, $v) { return $k . ': ' . (is_string($v) ? $v : (string)$v) ?: '-'; }, array_keys($p), $p))); ?></div></td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      <?php endif; ?>
    </div>

    <div class="admin-card">
      <h2>Medical record requests <span class="admin-count"><?php echo count($medical); ?></span></h2>
      <?php if (empty($medical)): ?>
        <p class="admin-empty">No medical record requests yet.</p>
      <?php else: ?>
        <table class="admin-table">
          <thead>
            <tr><th>Date</th><th>Details</th></tr>
          </thead>
          <tbody>
            <?php foreach ($medical as $r): $p = json_decode($r['payload'] ?? '{}', true) ?: []; ?>
            <tr>
              <td class="admin-meta"><?php echo htmlspecialchars($r['created_at'] ?? ''); ?></td>
              <td><div class="admin-payload"><?php echo htmlspecialchars(implode(' · ', array_map(function($k, $v) { return $k . ': ' . (is_string($v) ? $v : (string)$v) ?: '-'; }, array_keys($p), $p))); ?></div></td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      <?php endif; ?>
    </div>

    <div class="admin-card">
      <h2>Job applications <span class="admin-count"><?php echo count($jobs); ?></span></h2>
      <?php if (empty($jobs)): ?>
        <p class="admin-empty">No job applications yet.</p>
      <?php else: ?>
        <table class="admin-table">
          <thead>
            <tr><th>Date</th><th>Position</th><th>Applicant</th><th>Details</th></tr>
          </thead>
          <tbody>
            <?php foreach ($jobs as $r): $p = json_decode($r['payload'] ?? '{}', true) ?: []; ?>
            <tr>
              <td class="admin-meta"><?php echo htmlspecialchars($r['created_at'] ?? ''); ?></td>
              <td><strong><?php echo htmlspecialchars($p['job_title'] ?? $p['job_id'] ?? '-'); ?></strong></td>
              <td><?php echo htmlspecialchars(($p['name'] ?? '') . ' · ' . ($p['email'] ?? '')); ?></td>
              <td><div class="admin-payload"><?php echo htmlspecialchars(($p['phone'] ?? '') . ($p['resume_file'] ? ' · Resume: ' . $p['resume_file'] : '')); ?></div></td>
            </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      <?php endif; ?>
    </div>
  </main>
</body>
</html>
