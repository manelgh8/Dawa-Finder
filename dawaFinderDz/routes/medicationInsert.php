<?php

use Leaf\Http\Request;
use Leaf\Router;

$app = new Leaf\App();
$request = new Request;

$app->post('/medication', function () use ($request) {
    require_once __DIR__ . '/../backend/db.php';
    $pdo = Db::connect();

    // Get form data
    $latinName     = $request->get('latinName');
    $arabicName    = $request->get('arabicName');
    $type          = $request->get('type');
    $price         = $request->get('price');
    $size          = $request->get('size');
    $image         = $request->get('image');
    $registration  = $request->get('registration');
    $lastUpdated   = $request->get('lastUpdated');
    $labId         = $request->get('labId');
    $dosage        = $request->get('dosage');
    $prescription  = $request->get('prescription');

    // Validate
    $fields = [$latinName, $arabicName, $type, $price, $size, $image, $registration, $lastUpdated, $labId, $dosage, $prescription];
    if (in_array(null, $fields) || in_array('', $fields)) {
        echo "❌ Please fill in all fields.";
        return;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO medication (latinName, arabicName, type, price, size, image, registration, lastUpdated, labId, dosage, prescription) 
                               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([$latinName, $arabicName, $type, $price, $size, $image, $registration, $lastUpdated, $labId, $dosage, $prescription]);

        echo "✅ Medication added successfully!";
        // Optionally: header('Location: /some-success-page.html');
    } catch (PDOException $e) {
        echo "❌ Database error: " . $e->getMessage();
    }
});
