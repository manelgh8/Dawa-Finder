<?php

use Leaf\Http\Request;
use Leaf\Router;

$app = new Leaf\App();
$request = new Request;

$app->post('/donation', function () use ($request) {
    require_once __DIR__ . '/../backend/db.php';
    $pdo = Db::connect();

    // Get form POST data
    $title     = $request->get('title');
    $descr     = $request->get('descr');
    $image     = $request->get('image');
    $category  = $request->get('category');
    $status    = $request->get('status');
    $expDate   = $request->get('expDate');
    $location  = $request->get('location');
    $contact   = $request->get('contact');
    $userId    = $request->get('userId');
    $quantity  = $request->get('quantity');

    // Basic validation
    if (!$title || !$descr || !$image || !$category || !$status || !$expDate || !$location || !$contact || !$userId || !$quantity) {
        echo "❌ Please fill in all fields.";
        return;
    }

    // Optional: check if user exists
    try {
        $checkUser = $pdo->prepare("SELECT idClient FROM client WHERE idClient = ?");
        $checkUser->execute([$userId]);
        if ($checkUser->rowCount() === 0) {
            echo "❌ User ID not found.";
            return;
        }

        // Insert donation into database
        $stmt = $pdo->prepare("INSERT INTO donation (title, descr, image, category, status, expDate, location, contact, userId, quantity) 
                               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$title, $descr, $image, $category, $status, $expDate, $location, $contact, $userId, $quantity]);

        echo "✅ Donation added successfully!";
        // Optional: redirect to user dashboard or confirmation page
        header('Location: /../public/user/user-dashbord.html');
    } catch (PDOException $e) {
        echo "❌ Database error: " . $e->getMessage();
    }
});
