<?php

require "connect.php";

$pdo = new ConnectDatabase(constant("HOST"), constant("USER"), constant("PASSWORD"), constant("DATABASE"));

if (isset($_GET['data']))
{
    $mode = $_GET['mode'];
    $menuid = $_GET['menuid'];
    $menuname = $_GET['menuname'];
    $menujsonstring = $_GET['data'];

    if ($mode == 'delete') {
        $stmt=$pdo->conn->prepare("DELETE FROM menutable WHERE id=?");
        $stmt->execute([ $menuid]);
        print "The menu has been deleted from the database!";
        return;
    }

    if ($mode == 'insert') {
        $stmt = $pdo->conn->prepare("SELECT * FROM menutable WHERE id=? LIMIT 1");
        $stmt->execute([$menuid]);
        $row = $stmt->fetch();

        if ($row) {
            $stmt = $pdo->conn->prepare("UPDATE menutable SET menu=?, name=? WHERE id=?")->execute([$menujsonstring, $menuname, $menuid]);
            print "The update is successful!";
        } else {
            $stmt = $pdo->conn->prepare("INSERT INTO menutable (id, name, menu) VALUES (?,?,?)");
            $stmt->execute([$menuid, $menuname, $menujsonstring]);
            print "The inserted is successful!";
        }
    }
}

?>