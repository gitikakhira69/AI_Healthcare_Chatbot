<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    echo json_encode(["status" => "error", "message" => "Missing fields"]);
    exit;
}

$email = $data->email;
$password = $data->password;

$stmt = $conn->prepare("SELECT id, password FROM users WHERE email=?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($userId, $hashedPassword);

if ($stmt->num_rows > 0) {
    $stmt->fetch();
    if (password_verify($password, $hashedPassword)) {
        echo json_encode(["status" => "success", "message" => "Login successful", "user_id" => $userId]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid password"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}

$stmt->close();
$conn->close();
?>
