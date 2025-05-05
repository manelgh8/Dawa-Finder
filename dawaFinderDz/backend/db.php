<?php
class Db {
    public static function connect() {
        try {
            // Update the database credentials if necessary
            $pdo = new PDO("mysql:host=localhost;dbname=pharmaci", "root", "");
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $e) {
            die("❌ DB Connection failed: " . $e->getMessage());
        }
    }
}
