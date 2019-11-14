<?php
if($_POST['name'] != '' && $_POST['phone'] != '' && $_POST['email'] != '' && $_POST['message'] != ''){
	
	
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	$headers .= 'From: ' . $_POST["name"] . '<' . $_POST["email"] . '>' . "\r\n" .
    'Reply-To: ' . $_POST["email"] . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
	
	$subject = 'New mail from Zeyner';
	$message = '<b>Name:</b> '.$_POST["name"].'<br>
	<b>Email:</b> '.$_POST["email"].'<br>
	<b>Phone:</b> '.$_POST["phone"].'<br>
	<b>Message:</b> '.$_POST["message"];
	
	mail( "lesh1j@yandex.by", $subject, $message, $headers ); //  Replace with your email 
	
	echo '<div class="alert alert-success alert-dismissable">
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
			Your message has been send!
		</div>';
	
}else{
			
	echo '<div class="alert alert-danger alert-dismissable">
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
			All fields as required!
		</div>';
}
?>