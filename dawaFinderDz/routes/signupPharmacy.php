<?php

use Leaf\Http\Request;
use Leaf\Router;

$app = new Leaf\App();
$request = new Request;

$app->post('/signupPharmacy', function () use ($request) {
    require_once __DIR__ . '/../backend/db.php';
    $pdo = Db::connect();

    $latinName = $request->get('latin_name');
    $arabicName = $request->get('arabic_name');
    $email = $request->get('email');
    $phone = $request->get('phone');
    $address = $request->get('address');
    $password = $request->get('pswd');


    if (!$latinName || !$arabicName || !$email || !$phone|| !$address || !$password ) {
        echo "❌ Please fill in all fields.";
        return;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("INSERT INTO pharmacy (latinName, arabicName,email, phoneNumber, address, password) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$latinName, $arabicName,$email, $phone, $address, $hashedPassword]);

        echo "✅ Signed up successfully!";
        header('Location: /../public/pharmacy/pharmacy-dashbord.html');

    } catch (PDOException $e) {
        echo "❌ Database error: " . $e->getMessage();
    }
});
