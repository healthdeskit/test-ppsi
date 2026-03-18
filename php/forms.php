<?php
require_once __DIR__ . '/config.php';

function save_contact() {
  $payload = [
    'name' => trim((string)($_POST['name'] ?? '')),
    'email' => trim((string)($_POST['email'] ?? '')),
    'phone' => trim((string)($_POST['phone'] ?? '')),
    'message' => trim((string)($_POST['message'] ?? '')),
  ];
  $path = data_path('submissions.json');
  $list = read_json($path, []);
  $list[] = [
    'id' => count($list) ? max(array_column($list, 'id')) + 1 : 1,
    'type' => 'contact',
    'payload' => json_encode($payload),
    'created_at' => date('Y-m-d H:i:s'),
  ];
  write_json($path, $list);
  return true;
}

function save_appointment() {
  $payload = [
    'name' => trim((string)($_POST['name'] ?? '')),
    'phone' => trim((string)($_POST['phone'] ?? '')),
    'email' => trim((string)($_POST['email'] ?? '')),
    'preferred_location' => trim((string)($_POST['preferred_location'] ?? '')),
    'date_preference' => trim((string)($_POST['date_preference'] ?? '')),
    'message' => trim((string)($_POST['message'] ?? '')),
  ];
  $path = data_path('submissions.json');
  $list = read_json($path, []);
  $list[] = [
    'id' => count($list) ? max(array_column($list, 'id')) + 1 : 1,
    'type' => 'appointment',
    'payload' => json_encode($payload),
    'created_at' => date('Y-m-d H:i:s'),
  ];
  write_json($path, $list);
  return true;
}

function save_medical_record_request() {
  $payload = [
    'name' => trim((string)($_POST['name'] ?? '')),
    'date_of_birth' => trim((string)($_POST['date_of_birth'] ?? '')),
    'email' => trim((string)($_POST['email'] ?? '')),
    'phone' => trim((string)($_POST['phone'] ?? '')),
    'mailing_address' => trim((string)($_POST['mailing_address'] ?? '')),
    'details' => trim((string)($_POST['details'] ?? '')),
  ];
  $path = data_path('medical_record_requests.json');
  $list = read_json($path, []);
  $list[] = [
    'id' => count($list) ? max(array_column($list, 'id')) + 1 : 1,
    'payload' => json_encode($payload),
    'created_at' => date('Y-m-d H:i:s'),
  ];
  write_json($path, $list);
  return true;
}

function save_job_application() {
  $job_id = trim((string)($_POST['job_id'] ?? ''));
  $payload = [
    'job_id' => $job_id,
    'job_title' => trim((string)($_POST['job_title'] ?? '')),
    'name' => trim((string)($_POST['name'] ?? '')),
    'email' => trim((string)($_POST['email'] ?? '')),
    'phone' => trim((string)($_POST['phone'] ?? '')),
    'message' => trim((string)($_POST['message'] ?? '')),
    'resume_note' => trim((string)($_POST['resume_note'] ?? '')),
  ];
  if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
    $upload_dir = data_path('uploads');
    if (!is_dir($upload_dir)) @mkdir($upload_dir, 0755, true);
    $ext = pathinfo($_FILES['resume']['name'], PATHINFO_EXTENSION) ?: 'pdf';
    $filename = 'resume_' . time() . '_' . preg_replace('/[^a-z0-9_-]/i', '', $payload['name']) . '.' . $ext;
    if (move_uploaded_file($_FILES['resume']['tmp_name'], $upload_dir . '/' . $filename)) {
      $payload['resume_file'] = $filename;
    }
  }
  $path = data_path('job_applications.json');
  $list = read_json($path, []);
  $list[] = [
    'id' => count($list) ? max(array_column($list, 'id')) + 1 : 1,
    'payload' => json_encode($payload),
    'created_at' => date('Y-m-d H:i:s'),
  ];
  write_json($path, $list);
  return true;
}
