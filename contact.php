<?php
if( filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) ){
		$userName = $_POST ['name'];
		$userPhone = $_POST ['phone'];
		$userEmail = $_POST ['email'];
		$message = $_POST ['message'];
		$subject = "Website TGO";

		$to = "contato@marmeladads.com"; //change email here.
		$body = "";

		$body .= "From: ".$userName. "\r\n";
		$body .= "Phone: ".$userPhone. "\r\n";
		$body .= "Email: ".$userEmail. "\r\n";
		$body .= "Message: ".$message. "\r\n";

		mail($to,$subject,$body);
		 $message_sent = true;
		}
?>
<?php
header("Location: https://thingsgo.online/sent.html");
die();
?>
