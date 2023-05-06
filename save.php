<?php

class ConnectDatabase {
    protected $connect;
    protected $conn;

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
            echo "Connected successfully";
        } catch(PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
}

define("HOST", "localhost");
define("USER","root");
define("PASSWORD","");
define("DATABASE","recursivemenu");

$connect = new ConnectDatabase(constant("HOST"), constant("USER"), constant("PASSWORD"), constant("DATABASE"));

if (isset($_POST["menu"]))
{
    echo "Létezik a Menu variable!!!";
    $menu = $_POST["menu"];
    print_r($_POST["menu"]);
    print_r(get_defined_vars());

}

?>