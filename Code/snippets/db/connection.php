<?php
try {
    
    $dbh = new PDO( 'mysql:host=localhost;dbname=', '', '' );
    $dbh->exec("SET CHARACTER SET utf8");
} catch ( PDOException $e ){
    
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}