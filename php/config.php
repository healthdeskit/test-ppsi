<?php
define('ROOT', dirname(__DIR__));
define('DATA_DIR', ROOT . '/data');

$CLEAN_URL_MAP = [
  '' => 'index.html',
  'index' => 'index.html',
  'about-us' => 'about-us.html',
  'contact-us' => 'contact-us.html',
  'locations' => 'locations.html',
  'medical-appointment' => 'medical-appointment.html',
  'medical-records' => 'medical-records.html',
  'medical-record-request' => 'medical-record-request.html',
  'pain-management' => 'pain-management.html',
  'spine-surgery' => 'spine-surgery.html',
  'chiropractic' => 'chiropractic.html',
  'orthopedics' => 'orthopedics.html',
  'podiatry' => 'podiatry.html',
  'physical-therapy' => 'physical-therapy.html',
  'practice-areas' => 'practice-areas.html',
  'interventional' => 'interventional.html',
  'auto-injury' => 'auto-injury.html',
  'doctors' => 'doctors.html',
  'dr-wael-elkholy-m-d' => 'dr-wael-elkholy-m-d.html',
  'dr-wael-elkholy-resume' => 'dr-wael-elkholy-resume.html',
  'alexios-apazidis' => 'alexios-apazidis.html',
  'dr-ashraf-sakr' => 'dr-ashraf-sakr.html',
  'fouad-karam' => 'fouad-karam.html',
  'edward-sofo' => 'edward-sofo.html',
  'patrick-nierva' => 'patrick-nierva.html',
  'north-brunswick' => 'north-brunswick.html',
  'edison' => 'edison.html',
  'clifton' => 'clifton-new-jersey.html',
  'clifton-new-jersey' => 'clifton-new-jersey.html',
  'jersey-city' => 'jersey-city.html',
  'elizabeth' => 'elizabeth.html',
  'hamilton' => 'hamilton-new-jersey.html',
  'hamilton-new-jersey' => 'hamilton-new-jersey.html',
  'patient-portal' => 'patient-portal.html',
  'insurance' => 'insurance.html',
  'careers' => 'careers.html',
  'blogs' => 'blogs.html',
  'covid-19' => 'covid-19.html',
  'privacy-policy' => 'privacy-policy.html',
  'terms-of-service' => 'terms-of-service.html',
];

function data_path($file) {
  if (!is_dir(DATA_DIR)) @mkdir(DATA_DIR, 0755, true);
  return DATA_DIR . '/' . $file;
}

function read_json($path, $default = []) {
  if (!is_file($path)) return $default;
  $raw = @file_get_contents($path);
  if ($raw === false) return $default;
  $d = json_decode($raw, true);
  return is_array($d) ? $d : $default;
}

function write_json($path, $data) {
  file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT), LOCK_EX);
}
