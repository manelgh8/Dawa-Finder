<?php

use Leaf\Http\Request;
use Leaf\App;

$app = new App();

require_once __DIR__ . '/../backend/db.php';

$request = new Request;
$db = Db::connect();

// Route to update user profile
$app->post('/update_user_profil', function () use ($db) {
    // Get fields from request
    $data = request()->get(['fullName', 'phoneNumber', 'email', 'password', 'address', 'carteChifa']);

    // For testing only: set a specific client ID
    $data['id'] = 1; // Replace with dynamic ID in production (e.g., from session)

    // Prepare the fields to update
    $fields = [];
    $params = [];

    foreach ($data as $key => $value) {
        if ($key === 'id' || empty(trim($value))) continue;

        // Hash the password before storing
        if ($key === 'password') {
            $value = password_hash($value, PASSWORD_DEFAULT);
        }

        $fields[] = "$key = :$key";
        $params[$key] = $value;
    }

    // Handle empty form (nothing to update)
    if (empty($fields)) {
        response()->json(['error' => 'No fields to update'], 400);
        return;
    }

    // Add the client ID for WHERE clause
    $params['id'] = $data['id'];

    // Ensure the column name matches your DB schema (e.g., client_id)
    $sql = "UPDATE client SET " . implode(', ', $fields) . " WHERE idClient= :id";

    try {
        $stmt = $db->prepare($sql);
        $stmt->execute($params);
       // response()->json(['success' => 'Profile updated successfully!']);
        header('Location: /../public/user/Profil-user/index.html');
    } catch (PDOException $e) {
        response()->json(['error' => $e->getMessage()], 500);
    }
   

});
