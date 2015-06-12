<?php
//require_once LIBS_PATH.'filter.input.php';
//require_once LIBS_PATH.'mailer.php';
//require_once LIBS_PATH.'ParserTemplate.php';

class Review extends Model {
    
    private $_PDOConn = null;
    
    public function __construct( $conn, $db_table )  {
        $this->_tableName = $db_table;
        $this->_primaryKey = '';
        $this->setMysqlConn( $conn );
        $this->_PDOConn = $conn;
    }
    
    public function insertInit ( $info, $template, $subject, $correo, $cc = array() ) {
        
        //  Validación de los datos
        $parameters = array(
            'contact_name' => array(
                'requerido' => 1, 'validador' => 'esAlfaNumerico', 'mensaje' => utf8_encode( 'El nombre es obligatorio.' ) ),
            'contact_business' => array(
                'requerido' => 1 ,'validador' => 'esAlfaNumerico', 'mensaje' => utf8_encode( 'La empresa es obligatoria.' ) ),
            'contact_phone' => array(
                'requerido' => 1, 'validador' => 'esAlfaNumerico', 'mensaje' => utf8_encode( 'El teléfono es obligatoria.' ) ),
            'contact_mail' => array( 
                'requerido' => 1, 'validador' => 'esEmail', 'mensaje' => utf8_encode( 'El mail es obligatoria.' ) ),
            'contact_area' => array(
                'requerido' => 0, 'validador' => 'esAlfaNumerico', 'mensaje' => utf8_encode( 'El área es obligatoria.' ) ),
            'contact_message' => array(
                'requerido' => 0, 'validador' => 'esAlfaNumerico', 'mensaje' => utf8_encode( 'El mensaje es obligatoria.' ) ),
        );
        
        $form = new Validator( $info, $parameters );
        
        // Si el formulario no es válido
        if ( !$form->validate() ) {
            
            $response = array( 
                'success' => 'false',
                'message'=> $form->getMessage() 
            );
        } else {
            
            try {
                
                //$this->_PDOConn->beginTransaction();
                
                //$info[ 'date_answer' ] = date( "Y/m/d" );
                
                //$success    = $this->insert( $info );
                
                //if ( $success ) {
                    
                    $emails = explode( ',' , $correo );
                    $to     = array();
                    
                    foreach ($emails as $email) {
                        
                        $params = array(
                            'mail' => array(
                                'requerido' => 1 ,'validador' => 'esEmail', 'mensaje' => utf8_encode( 'El correo no es v&aacute;lido.' ) )
                        );
                        
                        $destinatario = array(
                            'name' => $email,
                            'mail' => $email
                        );
                        
                        $form   = new Validator( $destinatario, $params );
                        if ( ( $form->validate() ) === false ) {
                            
                            throw new Exception('El correo ' . $email . ' no es v&aacute;lido.');
                        }
                        $to[] = $destinatario;
                    }
                    
                    $vars = array(
                            'contact_name'      => $info[ 'contact_name' ],
                            'contact_business'  => $info[ 'contact_business' ],
                            'contact_phone'     => $info[ 'contact_phone' ],
                            'contact_mail'      => $info[ 'contact_mail' ],
                            'contact_area'      => $info[ 'contact_area' ],
                            'contact_message'   => $info[ 'contact_message' ]
                        );
                    $tpl = ParserTemplate::parseTemplate( $template, $vars );
                    
                    $_cc    = $cc;
                    
                    if ( Mailer::sendMail( $subject, $tpl, $to , '' , $_cc ) ) {
                        
                        $response       = array (
                            'success' => 'true',
                            'message' => utf8_encode( 'Muchas gracias por ponerse en contacto con nosotros.' )
                        );
                    } else {
                        
                        $response = array (
                            'success'=>'false',
                            'message'=>utf8_encode( 'El servicio de correo no esta disponible' )
                        );
                    }
                /*} else {
                    
                    $response = array(
                        'success' => 'false', 
                        'message' => utf8_encode('No fue posible guardar la información.')
                    );
                }
                
                $this->_PDOConn->commit();*/
                
            } catch ( PDOException $e ) {
                
                $this->_PDOConn->rollBack();
                $response   = array ( 'success'=>'false', 'msg'=>'el servicio de DB no esta disponible' );
            } catch ( phpmailerException $e ) {
                
                $this->_PDOConn->rollBack();
                $response   = array ( 'success'=>'false', 'msg'=>'el servicio de correo no esta disponible' );
            }
        }
        return $response;
    }
}
