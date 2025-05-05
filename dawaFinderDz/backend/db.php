<?php
require_once __DIR__ . '/../vendor/autoload.php';

use Leaf\Config;

class Db {
    public static function connect() {
         
        Config::loadEnv(__DIR__ . '/../');

        try {
            $host = getenv('DB_HOST');
            $name = getenv('DB_NAME');
            $user = getenv('DB_USER');
            $pass = getenv('DB_PASS');

            $pdo = new PDO("mysql:host=$host;dbname=$name", $user, $pass);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $e) {
            die("❌ DB Connection failed: " . $e->getMessage());
        }
    }
}
