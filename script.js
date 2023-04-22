const switchButton = document.querySelector('#switch');
const new_old_button = document.querySelector('#new_old');
let jump = false;
let old = false;
switchButton.addEventListener('click', () => {
  if (jump) {
    switchButton.innerText = 'Off';
    jump = false;
  } else {
    switchButton.innerText = 'On'; 
    jump = true;
  }
})
new_old_button.addEventListener('click', () => {
  if (old) {
    new_old_button.innerText = 'new';
    old = false;
  } else {
    new_old_button.innerText = 'old'; 
    old = true;
  }
})

function get_url(names){
	var base64 = window.btoa(unescape(encodeURIComponent(names))).replace(/\+/g,'-').replace(/\//g,'_');
	var prefix = old ? 'https://xyf0076.gitee.io/namerena.github.io/#n=' : 'https://deepmess.com/namerena/#n='
	url= prefix + base64;
	return url;
}
function battle(names){
	url = get_url(names);
	if (jump){
		location.href=url;
	} else {
		document.querySelector('iframe').src = url;
	}
}
function run(){
	var names = document.querySelector('textarea').value;
	battle(names);
	
}
	
function test(){
	var names = "!test!\n!\n\n" + document.querySelector('textarea').value;
	battle(names);
}
	
function seed(){
	let timestamp = new Date().toISOString();
	var names = document.querySelector('textarea').value+"\n\nseed:"+timestamp+"@!";
	battle(names);
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
	    	let data = JSON.parse(xhr.responseText);
	    	namelist=data[enemy_type];
		random_name = namelist[Math.floor(Math.random() * namelist.length)]
		console.log(random_name)
		let timestamp = new Date().toISOString();
		var names = document.querySelector('textarea').value+"\n\n"+random_name+"\n\nseed:"+timestamp+"@!";
		battle(names);
	  }
	};
	xhr.send();
	
}
function multirounds(rounds){
	/*生成多轮对战的url链接文本，输出*/
	var nametext = document.querySelector('textarea').value;
	var urls = [];
	for (i=0; i<rounds; i++){
		setTimeout(() => {
  			let timestamp = new Date().toISOString();
			var names = nametext + "\n\nseed:"+timestamp+"@!";
			urls.push(get_url(names));
		}, 100);
		
	}
	
	var str=rounds + '轮对战的链接如下：\n';
	for (i=0; i<rounds; i++){
		str += `<a href=\"${urls[i]}\">第${i+1}轮</a>\n`;
	}
	
	document.querySelector('textarea[readonly]').value = str;
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
	
