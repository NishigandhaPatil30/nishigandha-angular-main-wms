<?php
include 'connection.php';

$data = json_decode(file_get_contents("php://input"));

$userName = mysqli_real_escape_string($conn, $data->Name);
$firstName = mysqli_real_escape_string($conn, $data->firstName);
$lastName = mysqli_real_escape_string($conn, $data->lastName);
$fullName = $firstName . ' ' . $lastName;
$email = mysqli_real_escape_string($conn, $data->email);
$password = mysqli_real_escape_string($conn, $data->password);
$confirmPassword = mysqli_real_escape_string($conn, $data->confirmPassword);
$dateOfBirth = mysqli_real_escape_string($conn, $data->dateOfBirth);
$gender = mysqli_real_escape_string($conn, $data->gender);
$mobileNumber = mysqli_real_escape_string($conn, $data->mobileNumber);
$Designation = mysqli_real_escape_string($conn, $data->Designation);
// Add data validation and sanitization here

// Validate that dateOfBirth is in the correct format (YYYY-MM-DD)
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $dateOfBirth)) {
    echo json_encode(array("message" => "Invalid date format"));
    exit();
}
// Insert data into Registration table
$queryRegistration = "INSERT INTO Registration (userName, firstName, lastName, email, password, dateOfBirth, gender, mobileNumber, confirmPassword,Designation)
          VALUES ('$userName', '$firstName', '$lastName', '$email', '$password', '$dateOfBirth', '$gender', '$mobileNumber', '$confirmPassword','$Designation')";

// Insert data into users table
$queryUsers = "INSERT INTO users ( `Name`, `Password`, `UserRole`, `FullName`, `Depot`, `PageAccess`,
`PreviousPageaccess`, `ConfirmPassword`, `Gender`, `SecreatQue`, `SecreatAns`, `BirthDate`, `UserStatus`, 
`UserMobile`, `UserEmail`, `ManagerId`, `DateOfJoining`, `UserType`, `Location`, `ResidentalAddress`, `imageurl`, `ActiveFlag`, `Designation`)
         VALUES ('$userName', '$password', '0', '$fullName', '0', '0', '0', '$confirmPassword','$gender','0','0','$dateOfBirth','0','$mobileNumber','$email','0','$dateOfBirth','0','0','0','0','0','$Designation')";

if (mysqli_query($conn, $queryRegistration) && mysqli_query($conn, $queryUsers)) {
    echo json_encode(array("message" => "User registered successfully in both tables"));
} else {
    echo json_encode(array("message" => "User registration failed: " . mysqli_error($conn)));
}

mysqli_close($conn);
?>
