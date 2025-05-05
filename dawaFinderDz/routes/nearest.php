<?php

use Leaf\Http\Request;
use Leaf\Router;

$app = new Leaf\App();
$request = new Request;

$app->post('/nearest', function () use ($request) {
    require_once __DIR__ . '/../backend/db.php';
    $pdo = Db::connect();

    // Get form data (lat, lng, and medication)
    $userLat = $request->get('lat');
    $userLng = $request->get('lng');
    $medication = $request->get('medication');  // Get the medication name or latin name

    // Validate coordinates and medication
    if (is_null($userLat) || is_null($userLng) || $userLat == '' || $userLng == '' || is_null($medication) || $medication == '') {
        echo "❌ Missing coordinates or medication.";
        return;
    }

    // Fetch pharmacies that carry the specified medication
    $stmt = $pdo->prepare("
        SELECT pharmacy.*, medication.latinName 
        FROM pharmacy
        JOIN medication ON pharmacy.idPh = medication.idPh
        WHERE medication.latinName LIKE ? OR medication.arabicName LIKE ?
    ");
    $stmt->execute([$medication, $medication]);
    $pharmacies = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // If no pharmacies are found with the medication
    if (empty($pharmacies)) {
        echo "❌ No pharmacies found with the specified medication.";
        return;
    }

    // Calculate distances and sort pharmacies
    foreach ($pharmacies as &$pharmacy) {
        $pharmacy['distance'] = haversineDistance(
            (float)$userLat,
            (float)$userLng,
            (float)$pharmacy['latitude'],
            (float)$pharmacy['longitude']
        );
    }

    // Sort pharmacies by distance
    usort($pharmacies, function ($a, $b) {
        return $a['distance'] <=> $b['distance'];
    });

    // Return pharmacies in JSON format
    echo json_encode($pharmacies);
});

// Haversine distance calculation
function haversineDistance($lat1, $lon1, $lat2, $lon2) {
    $earthRadius = 6371; // km
    $dLat = deg2rad($lat2 - $lat1);
    $dLon = deg2rad($lon2 - $lon1);
    $a = sin($dLat / 2) * sin($dLat / 2) + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLon / 2) * sin($dLon / 2);
    $c = 2 * atan2(sqrt($a), sqrt(1 - $a));
    return $earthRadius * $c;
}

$app->run();
