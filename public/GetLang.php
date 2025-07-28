<?php
session_start();

if (isset($_GET['lang'])) {
  $lang = $_GET['lang'];
  $_SESSION['lang'] = $lang;
} else if (isset($_SESSION['lang'])) {
  $lang = $_SESSION['lang'];
} else {
  $lang = 'en'; // default
}

$langFile = __DIR__ . "/lang/{$lang}.php";

if (file_exists($langFile)) {
  $strings = include $langFile;
  header('Content-Type: application/json; charset=utf-8');
  echo json_encode([
    'lang' => $lang,
    'strings' => $strings
  ]);
} else {
  http_response_code(404);
  echo json_encode(['error' => 'Language file not found']);
}
