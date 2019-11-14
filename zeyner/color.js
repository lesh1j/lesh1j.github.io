$( document ).ready(function() {
	
	$('.showcolor').on('click', function(){
		if($('.color').css('right') == '-120px'){
			$('.color').css('right', '0px');
		}else{
			$('.color').css('right', '-120px');
		}
	});
	
	$('.ch-color.blue').on('click', function(){
		$('head').append('<link rel="stylesheet" type="text/css" href="css/colors/blue.css" />');
	});
	$('.ch-color.red').on('click', function(){
		$('head').append('<link rel="stylesheet" type="text/css" href="css/colors/red.css" />');
	});
	$('.ch-color.green').on('click', function(){
		$('head').append('<link rel="stylesheet" type="text/css" href="css/colors/green.css" />');
	});
	$('.ch-color.yellow').on('click', function(){
		$('head').append('<link rel="stylesheet" type="text/css" href="css/colors/yellow.css" />');
	});
	$('.ch-color.orange').on('click', function(){
		$('head').append('<link rel="stylesheet" type="text/css" href="css/colors/orange.css" />');
	});
	$('.ch-color.purple').on('click', function(){
		$('head').append('<link rel="stylesheet" type="text/css" href="css/colors/purple.css" />');
	});
	
});