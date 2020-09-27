<?php

header("Access-Control-Allow-Origin: *");

require 'includes/PHPMailer.php';
require 'includes/SMTP.php';
require 'includes/Exception.php';


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

if($_SERVER['HTTP_REFERER'] === "http://test.zielarskawiesblanki.pl/"){
    // extract the data from $_POST
    $name = isset($_GET['name']) ? $_GET['name'] : null;
    $message = isset($_GET['message']) ? $_GET['message'] : null;
    $email = isset($_GET['sendto']) ? $_GET['sendto'] : null;

    if($name && $message && $email){
    
        //Load composer's autoloader
        require 'vendor/autoload.php';

        $mail = new PHPMailer(true);
        try{
            // SMTP server configuration
            //$mail->isSMTP();                                      // Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                             // Enable SMTP authentication
            $mail->Username   = 'mailfrompage@gmail.com';           // SMTP username
            $mail->Password   = 'Bugi2020!';                        // SMTP password
            $mail->SMTPSecure = 'PHPMailer::ENCRYPTION_SMTPS';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` also accepted
            $mail->Port       = 465;

            // Recipients
            $mail->setFrom('mailfrompage@gmail.com', 'React Contact form');
            $mail->addAddress('mailfrompage@gmail.com');     // Add a recipient
            $mail->addReplyTo('mailfrompage@gmail.com', 'Information');

            // Content
            $mail->isHTML(true);      // Set email format to HTML
            $mail->Subject = 'React Contact form';
            $mail->Body    = 'Name: ' . $name . '<br />Email: ' . $email . '<br /><br /><b>Message:</b> '
            . $message;

            if($mail->send())
                echo "Message has been sent!";
        }catch (Exception $e){
            echo "Message couldn't be sent. Error: ", $mail->ErrorInfo;
        }
    }else{
        echo "All the fileds are required!";
    }
}else{
    echo "You can't use this server!";
}
?>