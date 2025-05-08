<?php
// Handle CORS
header("Access-Control-Allow-Origin: *"); // or specify your React app's URL: http://localhost:3000
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Ensure POST method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Only POST method is allowed"]);
    exit();
}

// Get raw POST data
$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

// Debug if needed
// file_put_contents("debug.txt", $rawData);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid or missing JSON data"]);
    exit();
}

// DB connection
$conn = new mysqli("localhost", "root", "", "care_companion");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Sanitize inputs with null coalescing operator
$id = $conn->real_escape_string($data['id'] ?? '');
$name = $conn->real_escape_string($data['name'] ?? '');
$height = (float)($data['height'] ?? 0);
$weight = (float)($data['weight'] ?? 0);
$treatmentPlan = $conn->real_escape_string($data['treatmentPlan'] ?? '');
$history = $conn->real_escape_string($data['history'] ?? '');

// Input validation
if (empty($id) || empty($name) || $height <= 0 || $weight <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Missing or invalid required fields"]);
    exit();
}

// Check if patient already exists
$check = $conn->query("SELECT * FROM patients WHERE id = '$id'");

if ($check === false) {
    http_response_code(500);
    echo json_encode(["error" => "Error checking patient existence: " . $conn->error]);
    exit();
}

if ($check->num_rows > 0) {
    // Update the patient record
    $sql = "UPDATE patients SET name='$name', height=$height, weight=$weight, treatmentPlan='$treatmentPlan', history='$history' WHERE id='$id'";
} else {
    // Insert a new patient record
    $sql = "INSERT INTO patients (id, name, height, weight, treatmentPlan, history) VALUES ('$id', '$name', $height, $weight, '$treatmentPlan', '$history')";
}

// Execute the query
if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Patient record saved successfully"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $conn->error]);
}

$conn->close();
?>
