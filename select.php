<?php

require "connect.php";

$pdo = new ConnectDatabase(constant("HOST"), constant("USER"), constant("PASSWORD"), constant("DATABASE"));

$data = $pdo->conn->query("SELECT * FROM menutable")->fetchAll();

$dataSave = [];
foreach ($data as $row) {
    array_push($dataSave, ['id' => $row['id'], 'name' => $row['name'], 'menu' => $row['menu']]);
}

$myJSON = json_encode($dataSave);

echo $myJSON;
?>