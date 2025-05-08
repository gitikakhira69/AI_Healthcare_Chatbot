<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
// Allow specific HTTP methods
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// Allow headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight OPTIONS request
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Connect to database
$conn = new mysqli("localhost", "root", "", "signup");

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Read JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Extract values
$first_name = $data["first_name"] ?? "";
$last_name = $data["last_name"] ?? "";
$gender = $data["gender"] ?? "";
$qualification = $data["qualification"] ?? "";
$mobile = $data["mobile"] ?? "";
$email = $data["email"] ?? "";
$password = password_hash($data["password"] ?? "", PASSWORD_DEFAULT);

// Prepare SQL statement
$stmt = $conn->prepare("INSERT INTO signup (First_Name, Last_Name, Gender, Qualification, Mobile_No, Email, Password) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $first_name, $last_name, $gender, $qualification, $mobile, $email, $password);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "User registered successfully!"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>