<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "yatan";
$dbname = "portfolio_contacts";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database if it doesn't exist
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";
if ($conn->query($sql) !== TRUE) {
    die("Error creating database: " . $conn->error);
}

// Select the database
$conn->select_db($dbname);

// Create table if it doesn't exist
$sql = "CREATE TABLE IF NOT EXISTS contacts (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($sql) !== TRUE) {
    die("Error creating table: " . $conn->error);
}

// Process form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST['user_name'];
    $email = $_POST['user_email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    // Validate form data (basic validation)
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(["success" => false, "message" => "Please fill all required fields"]);
        exit;
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Invalid email format"]);
        exit;
    }
    
    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $subject, $message);
    
    // Execute the statement
    if ($stmt->execute()) {
        // Send email notification
        $to = "yatankumarcantact@gmail.com";
        $email_subject = "New Contact Form Submission: $subject";
        $email_body = "You have received a new message from your portfolio website.\n\n";
        $email_body .= "Name: $name\n";
        $email_body .= "Email: $email\n";
        $email_body .= "Subject: $subject\n";
        $email_body .= "Message:\n$message\n";
        
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        
        // Send email
        mail($to, $email_subject, $email_body, $headers);
        
        // Return success response
        echo json_encode(["success" => true, "message" => "Message sent successfully! I'll get back to you soon."]);
    } else {
        // Return error response
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }
    
    // Close statement
    $stmt->close();
} else {
    // Not a POST request
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}

// Close connection
$conn->close();
?>
