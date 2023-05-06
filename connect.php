<?php

define("HOST", "localhost");
define("USER","root");
define("PASSWORD","");
define("DATABASE","recursivemenu");

class ConnectDatabase {
    public $connect;
    public $conn;

    function __construct($host, $user, $password, $database)
    {
        $this->connectDatabase($host, $user, $password, $database);
    }
        
    function connectDatabase($host, $user, $password, $database) {
        $connectiondatas = [
            'host' => $host,
            'user' => $user,
            'password' => $password,
            'database' => $database
        ];
        $this->conn = new PDO ('mysql:host=localhost;dbname='.$connectiondatas['database'], $connectiondatas['user'], $connectiondatas['password']);

        try {
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
}

?>