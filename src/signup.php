<?php
// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Read input data
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
    exit();
}

// Database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "healthcare";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Validate input and insert into database
if (
    isset($data["firstName"], $data["lastName"], $data["dob"], $data["gender"],
    $data["qualification"], $data["mobile"], $data["email"], $data["password"])
) {
    $firstName = $data["firstName"];
    $lastName = $data["lastName"];
    $dob = $data["dob"];
    $gender = $data["gender"];
    $qualification = $data["qualification"];
    $mobile = $data["mobile"];
    $email = $data["email"];
    $password = password_hash($data["password"], PASSWORD_DEFAULT);

    $stmt = $conn->prepare(
        "INSERT INTO users (first_name, last_name, dob, gender, qualification, mobile, email, password) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $stmt->bind_param("ssssssss", $firstName, $lastName, $dob, $gender, $qualification, $mobile, $email, $password);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "User registered successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Registration failed: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
}

$conn->close();
?>
