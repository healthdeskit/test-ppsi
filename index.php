<?php
session_start();
require_once __DIR__ . '/php/config.php';
require_once __DIR__ . '/php/forms.php';

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$path = isset($_GET['path']) ? trim($_GET['path'], '/') : '';

// Form handlers (POST)
if ($method === 'POST') {
  if ($path === 'contact-us') {
    if (save_contact()) header('Location: /contact-us?sent=1');
    else header('Location: /contact-us?error=1');
    exit;
  }
  if ($path === 'medical-appointment') {
    if (save_appointment()) header('Location: /medical-appointment?sent=1');
    else header('Location: /medical-appointment?error=1');
    exit;
  }
  if ($path === 'medical-record-request') {
    if (save_medical_record_request()) header('Location: /medical-record-request?sent=1');
    else header('Location: /medical-record-request?error=1');
    exit;
  }
  if ($path === 'careers/apply' || $path === 'job-application') {
    if (save_job_application()) header('Location: /careers?sent=1');
    else header('Location: /careers?error=1');
    exit;
  }
}

// Serve page (GET): clean URL -> file
$key = $path === '' ? '' : $path;
$file = $CLEAN_URL_MAP[$key] ?? ($path ? $path . '.html' : 'index.html');
$filepath = ROOT . '/' . $file;

if (!is_file($filepath)) {
  $filepath = is_file(ROOT . '/404.html') ? ROOT . '/404.html' : ROOT . '/index.html';
  http_response_code(404);
}

header('Content-Type: text/html; charset=utf-8');
readfile($filepath);
