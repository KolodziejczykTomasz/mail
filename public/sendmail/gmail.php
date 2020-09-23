<?php
require 'includes/PHPMailer.php';
require 'includes/SMTP.php';
require 'includes/Exception.php';


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer();
//$mail->IsSMTP();
$mail->Host = "smtp.gmail.com";
$mail->SMTPAuth = "true";
$mail->SMTPSecure = "tls";
$mail->Port = "587";
$mail->Username = "mailfrompage@gmail.com";
$mail->Password = "Bugi2020!";
$mail->Subject = "Test email";
$mail->setFrom("mailfrompage@gmail.com");
$mail->isHTML(true);
$mail->addAttachment('img/attachment.png');
$mail->Body = "<h1>This is plan h1</h1></br><p>This is paragraph..</p>";
$mail->addAddress("mailfrompage@gmail.com");
if ($mail->Send()){
  echo "Email sent!";
}else {
echo "Error..!";
};
$mail->smtpClose();
 ?>
