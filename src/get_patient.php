<?php
// Handle preflight CORS requests (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");  // Or: header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);  // Stop further execution for OPTIONS request
}

// Handle actual POST requests below
header("Access-Control-Allow-Origin: *");  // Or: header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Your normal PHP logic goes here


// DB connection
$conn = new mysqli("localhost", "root", "", "care_companion");

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$sql = "SELECT * FROM patients";
$result = $conn->query($sql);

$patients = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $patients[] = $row;
    }
}

echo json_encode($patients);

$conn->close();
?>
