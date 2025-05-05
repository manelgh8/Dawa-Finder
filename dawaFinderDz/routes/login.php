<?php

use Leaf\Http\Request;

$app->post('/login', function () {
    $request = new Request();
    $pdo = Db::connect();

    $email = trim($request->get('email'));
    $password = trim($request->get('password'));

    if (!$email || !$password) {
        echo "❌ Email and password are required.";
        return;
    }

    $stmt = $pdo->prepare("SELECT * FROM client WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        echo "✅ Welcome, " . $user['fullName'];
    } else {
        echo "❌ Invalid email or password.";
    }
});
