<?php

require "connect.php";

class ConnectDatabase {
    protected $connect;
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

$pdo = new ConnectDatabase(constant("HOST"), constant("USER"), constant("PASSWORD"), constant("DATABASE"));


if (isset($_GET['data']))
{
    $menuJsonString = $_GET['data'];
    $menuid = $_GET['menuid'];
    //$menuJson = json_decode($_GET['data']); 
    //print_r($menuJsonString); print_r($menuid);

    $stmt = $pdo->conn->prepare("SELECT * FROM menutable WHERE id=? LIMIT 1");
    $stmt->execute([$menuid]);
    $row = $stmt->fetch();

    if ($row) {
        $stmt = $pdo->conn->prepare("UPDATE menutable SET menu=? WHERE id=?")->execute([$menuJsonString, $menuid]);
        print "The update is successful!";
    } else {
        $stmt = $pdo->conn->prepare("INSERT INTO menutable (id, menu) VALUES (?, ?)");
        $stmt->execute([$menuid, $menuJsonString]);
        print "The inserted is successful!";
    }
    
}

?>