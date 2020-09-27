<?php
header("Access-Control-Allow-Origin: *");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'includes/PHPMailer.php';
require 'includes/SMTP.php';
require 'includes/Exception.php';



if($_SERVER['HTTP_REFERER'] === "http://test.zielarskawiesblanki.pl/"){   
    $name = isset($_GET['name']) ? $_GET['name'] : null;
    $message = isset($_GET['message']) ? $_GET['message'] : null;
    $email = isset($_GET['sendto']) ? $_GET['sendto'] : null;  
	

    if($name && $message && $email){    

        $mail = new PHPMailer(true);
        try{
        //$mailer->isSMTP();  
		$mail->Host = "smtp.gmail.com";
		$mail->SMTPAuth = "true";
		$mail->SMTPSecure = "tls";
		$mail->Port = "587";
		$mail->Username = 'kolodziejczyk.tomasz44@gmail.com';
		$mail->Password = "******";
		
		$mail->setFrom('kolodziejczyk.tomasz44@gmail.com', "Mail from test page");
		$mail->addAddress('kolodziejczyk.tomasz44@gmail.com');
		$mail->isHTML(true);
		$mail->Subject = "Mail from test page";
		$mail->Body    =  "test";

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
