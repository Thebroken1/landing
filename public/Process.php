<?php
session_start();

// CORS headers for local dev and cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight OPTIONS request and exit early
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// === 1️⃣ Language loading via $_SESSION ===
if (!isset($_SESSION['lang'])) {
    $_SESSION['lang'] = 'en'; // default
}
$lang = $_SESSION['lang'];

// === 2️⃣ Validate & sanitize ===
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $errors = [];
file_put_contents("debug.txt", print_r($_POST, true) . print_r($_FILES, true));

    function sanitize($data) {
        return htmlspecialchars(stripslashes(trim($data)));
    }

    $name = sanitize($_POST['name'] ?? '');
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $country = sanitize($_POST['country'] ?? '');
    $program = sanitize($_POST['program'] ?? '');
    $message = sanitize($_POST['message'] ?? '');

    if (empty($name)) $errors[] = "Name is required";
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Valid email is required";
    if (empty($country)) $errors[] = "Country is required";
    if (empty($program)) $errors[] = "Program is required";
    if (empty($message)) $errors[] = "Message is required";

    // === 3️⃣ File upload ===
    $uploadDir = __DIR__ . '/uploads/';
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $uploadedFile = $_FILES['file'] ?? null;

    if ($uploadedFile && $uploadedFile['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $uploadedFile['tmp_name'];
        $fileName = basename($uploadedFile['name']);
        $fileSize = $uploadedFile['size'];
        $fileType = mime_content_type($fileTmpPath);

        $allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

        if (!in_array($fileType, $allowedTypes)) {
            $errors[] = "Only PDF, JPG, or PNG files are allowed.";
        }

        if ($fileSize > 5 * 1024 * 1024) { // 5 MB limit
            $errors[] = "File is too large.";
        }

        $uniqueName = uniqid() . "_" . preg_replace("/[^A-Za-z0-9.\-_]/", "", $fileName);
        $destination = $uploadDir . $uniqueName;
    } else {
        $errors[] = "File upload failed or file missing.";
    }

    // === 4️⃣ Save data ===
    if (empty($errors)) {
        if (move_uploaded_file($fileTmpPath, $destination)) {
            $entry = [
                "name" => $name,
                "email" => $email,
                "country" => $country,
                "program" => $program,
                "message" => $message,
                "file" => $uniqueName,
                "timestamp" => date('Y-m-d H:i:s')
            ];

            $file = __DIR__ . '/submissions.json';

            if (file_exists($file)) {
                $existing = json_decode(file_get_contents($file), true);
                if (!is_array($existing)) $existing = [];
            } else {
                $existing = [];
            }

            $existing[] = $entry;
            file_put_contents($file, json_encode($existing, JSON_PRETTY_PRINT));

            echo json_encode([
                "status" => "success",
                "message" => "Thank you for your submission!"
            ]);
            exit;

        } else {
            echo json_encode([
                "status" => "error",
                "message" => "Failed to move uploaded file."
            ]);
            exit;
        }
    } else {
        echo json_encode([
            "status" => "error",
            "errors" => $errors
        ]);
        exit;
    }

} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request."
    ]);
    exit;
}
?>
