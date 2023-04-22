const switchButton = document.querySelector('#switch');
let jump = false;

switchButton.addEventListener('click', () => {
  if (jump) {
    switchButton.innerText = 'Off';
    jump = false;
  } else {
    switchButton.innerText = 'On'; 
    jump = true;
  }
})

function run(){
	var names = document.querySelector('textarea').value;
	var base64 = window.btoa(unescape(encodeURIComponent(names))).replace(/\+/g,'-').replace(/\//g,'_');
	url='https://deepmess.com/namerena/#n=' + base64;
	if (jump){
		location.href=url;
	} else {
		document.querySelector('iframe').src = url;
	}
	
}
	
function test(){
	var names = "!test!\n!\n\n" + document.querySelector('textarea').value;
	var base64 = window.btoa(unescape(encodeURIComponent(names))).replace(/\+/g,'-').replace(/\//g,'_');
	url='https://deepmess.com/namerena/#n=' + base64;
	if (jump){
		location.href=url;
	} else {
		document.querySelector('iframe').src = url;
	}
}
	
function seed(){
	let timestamp = new Date().toISOString();
	var names = document.querySelector('textarea').value+"\n\nseed:"+timestamp+"@!";
	var base64 = window.btoa(unescape(encodeURIComponent(names))).replace(/\+/g,'-').replace(/\//g,'_');
	url='https://deepmess.com/namerena/#n=' + base64;
	if (jump){
		location.href=url;
	} else {
		document.querySelector('iframe').src = url;
	}
}
function random_enemy(){
	let selector = document.querySelector('#enemy_type');
	let enemy_type;
	enemy_type = selector.value;
	console.log(enemy_type)
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'top_ladder.json');
	xhr.onload = function() {
	  if (xhr.status === 200) { 
		console.log(xhr.responseText)
	    	let data = JSON.parse(xhr.responseText);
	    	namelist=data[enemy_type];
		
		random_name = namelist[Math.floor(Math.random() * namelist.length)]
		console.log(random_name)
		let timestamp = new Date().toISOString();
		var names = document.querySelector('textarea').value+"\n\n"+random_name+"\n\nseed:"+timestamp+"@!";
		var base64 = window.btoa(unescape(encodeURIComponent(names))).replace(/\+/g,'-').replace(/\//g,'_');
		url='https://deepmess.com/namerena/#n=' + base64;
		if (jump){
			location.href=url;
		} else {
			document.querySelector('iframe').src = url;
		}
	  }
	};
	xhr.send();
	
}
function onMessage(e) {
	console.log(JSON.stringify(e.data, null, ' '));
	document.querySelector('textarea[readonly]').value = e.data.winners.join('\n');
	if (e.data.all[0][0]==e.data.winners[0]){/*单人对战，胜者在前排序入result */
		result=[e.data.all[0][0],e.data.all[1][0]];
	}else if (e.data.all[1][0]==e.data.winners[0]){
		result=[e.data.all[1][0],e.data.all[0][0]];
	}
	
		
}
	
window.addEventListener('message', onMessage);
	
