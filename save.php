<?php

require "connect.php";

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