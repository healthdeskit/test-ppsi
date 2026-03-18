<?php
// Remove or restrict in production
header('Content-Type: text/plain; charset=utf-8');
echo "PHP is running.\n";
echo "PHP version: " . phpversion() . "\n";
echo "Server: " . ($_SERVER['SERVER_SOFTWARE'] ?? '') . "\n";
