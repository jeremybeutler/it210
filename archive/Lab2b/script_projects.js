window.onload = (function(){
	$(".carousel").carousel("pause");
	let urlParams = new URLSearchParams(window.location.search);
	let slideNum = urlParams.get('index');
	$('.carousel').carousel(slideNum-1);
});
