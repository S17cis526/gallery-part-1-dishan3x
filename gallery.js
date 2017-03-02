// javascript for galllery page

var title = document.getElementById('gallery-title');
title.onclick = function(e){
	e.preventDefault();
	var form = document.getElementById('gallery-title-form');
	form.style.display='block';
}