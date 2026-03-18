<?php
if (session_status() === PHP_SESSION_NONE) session_start();
define('ADMIN_PASSWORD', getenv('ADMIN_PASSWORD') ?: 'ppsi-admin-2025');

function admin_logged_in() {
  return !empty($_SESSION['ppsi_admin']);
}

function require_admin() {
  if (!admin_logged_in()) {
    header('Location: /admin/login');
    exit;
  }
}
