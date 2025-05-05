<?php

use Leaf\Http\Request;
use Leaf\Router;

$app = new Leaf\App();
$request = new Request;

$app->post('/signupUser', function () use ($request) {
    require_once __DIR__ . '/../backend/db.php';
    $pdo = Db::connect();

    $name = $request->get('name');
    $email = $request->get('email');
    $phone = $request->get('phone');
    $address = $request->get('address');
    $id_card = $request->get('id_card');
    $password = $request->get('pswd');

    if (!$name || !$email || !$phone || !$address || !$password || !$id_card) {
        echo "❌ Please fill in all fields.";
        return;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("INSERT INTO client (fullName, email, phoneNumber, address, carteChifa, password) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$name, $email, $phone, $address, $id_card, $hashedPassword]);

        echo "✅ Signed up successfully!";
        header('Location: /../public/user/user-dashbord.html');

    } catch (PDOException $e) {
        echo "❌ Database error: " . $e->getMessage();
    }
});
