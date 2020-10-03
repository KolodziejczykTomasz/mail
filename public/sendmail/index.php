<?php
header("Access-Control-Allow-Origin: *");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'includes/PHPMailer.php';
require 'includes/SMTP.php';
require 'includes/Exception.php';



if($_SERVER['HTTP_REFERER'] === "https://mailapp.netlify.app/"){   
    $name = isset($_GET['name']) ? $_GET['name'] : null;
    $message = isset($_GET['message']) ? $_GET['message'] : null;
    $sendto = isset($_GET['sendto']) ? $_GET['sendto'] : null; 
	$email = isset($_GET['email']) ? $_GET['email'] : null; 
	$phone = isset($_GET['phone']) ? $_GET['phone'] : null; 
	$subject = isset($_GET['subject']) ? $_GET['subject'] : null; 
	

    if($name && $message && $sendto && email && phone && subject ){    

        $mail = new PHPMailer(true);
        try{
        //$mailer->isSMTP();  
		$mail->Host = "smtp.gmail.com";
		$mail->SMTPAuth = "true";
		$mail->SMTPSecure = "tls";
		$mail->Port = "587";
		$mail->Username = $sendto;
		$mail->Password = "******";
		
		$mail->setFrom($sendto, "Mail from test page");
		$mail->addAddress($sendto);
		$mail->isHTML(true);
		$mail->Subject = "Mail from test page";
		$mail->Body   = '<strong>Name:</strong> ' . $name . 
		'<br /><strong>Email:</strong> ' . $email . 
		'<br /><strong>Message:</strong> ' . $message . 
		'<br /><strong>Phone:</strong> ' . $phone .
		'<br /><strong>Subject:</strong> ' . $subject;

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
