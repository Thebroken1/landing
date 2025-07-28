<?php
session_start();

// Allow CORS from any origin (for development)
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');

if (isset($_GET['lang'])) {
  $lang = $_GET['lang'];
  $_SESSION['lang'] = $lang;
} elseif (isset($_SESSION['lang'])) {
  $lang = $_SESSION['lang'];
} else {
  $lang = 'en'; // default
}

$langFile = __DIR__ . "/lang/{$lang}.php";

if (file_exists($langFile)) {
  $strings = include $langFile;
  // $strings should be an array returned by the lang file
  echo json_encode([
    'lang' => $lang,
    'strings' => $strings
  ]);
} else {
  http_response_code(404);
  echo json_encode(['error' => 'Language file not found']);
}
