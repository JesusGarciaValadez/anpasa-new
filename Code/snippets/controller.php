<?php

header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past

if ( file_exists( 'config/config.php' ) ) {
    
    define( 'CURRENT_PATH',dirname(__FILE__) );
    require_once 'config/config.php';
} else {
    
    exit('no fue posible localizar el archivo de configuración.');
}

function __autoload( $className ) {
    
    require_once LIBS_PATH . "{$className}.php";
}

require_once SNIPPETS_PATH . 'db/connection.php';

error_reporting(E_ALL | E_STRICT);
ini_set('display_errors', 1);

if ( ! empty( $_GET['action'] ) ) {
    
    $action = strip_tags( trim( $_GET[ 'action' ] ) );
    
    $data = array();
    
    try {
        
        switch ( $action ) {
            case 'contact': 
                
                $toPass[ 'contact_name' ]       = $_POST[ 'contact_name' ];
                $toPass[ 'contact_business' ]   = $_POST[ 'contact_business' ];
                $toPass[ 'contact_phone' ]      = $_POST[ 'contact_phone' ];
                $toPass[ 'contact_mail' ]       = $_POST[ 'contact_mail' ];
                $toPass[ 'contact_area' ]       = $_POST[ 'contact_area' ];
                $toPass[ 'contact_message' ]    = $_POST[ 'contact_message' ];
                
                /*$cc = array( 
                        array( 
                            'mail'  => 'jgarcia@cmvasfalto.com.mx', 
                            'name'  => 'Jesús'), 
                        array(
                            'mail'  => 'vdavila@cmv.com.mx', 
                            'name'  => 'Vico')
                    );*/
                
                $doInsert   = new Review( $dbh, '' );
                $doInsert   = $doInsert->insertInit( 
                    $toPass, 
                    "template_mailing.html", 
                    $_POST[ 'contact_name' ] . " está interesado en pedir información", 
                    "m.marighi@pro-meta.com.mx", 
                    $cc );
                $data       = json_encode ( $doInsert );
                
                break;
        }
        echo $data;
        
    } catch ( Exception $e ) {
        
        switch ( $e->getCode() ) {
            
            case 5910 :
                echo 'DATA BASE ERROR: '.$e->getMessage();
                $message = 'Lo sentimos, ocurrió un error inesperado al tratar de guardar los datos.';
                break;
                
            case 5810 :
                echo 'MAILER ERROR: '. $e->getMessage();
                $message = 'Lo sentimos, ocurrió un error inesperado al tratar de enviar el correo.';
                break;
            default : $message = $e->getMessage();
        }
        
        $data = array ('success' => false , 'message' => $message ) ;
        echo json_encode( $data );
    }
}