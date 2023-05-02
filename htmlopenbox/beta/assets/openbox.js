const testMode = ['!test!\n\n', '!test!\n!\n\n'];
let nameTesting;
let callback;
//let cnt = 0;
let mdd;
let id = -1;
let concise_mode;
/**
 * 10% score.
 * @param {Number} score score.
 */
function tenPercent(score) {
  window.parent.postMessage([nameTesting, score, mdd, id], '*');
}
/**
 * 100% score.
 * @param {Number} score score.
 */
function hundredPercent(score) {
  /*if (++cnt == 1) {
    return;
  }
  cnt = 0;*/
  window.parent.postMessage([nameTesting, score, mdd, id], '*');
}
/**
 * Set mode.
 * @param {Number} mode mode.
 * @param {Number} i i.
 */
function setMode(mode, i) {
  callback = !mode ? tenPercent : hundredPercent;
  if (id === -1) {
    window.addEventListener('message', (event) => {
      if (event.data !== 'run') {
        console.log(event.data);
        callback(Number(event.data));
      }
    }, false);
  }
  id = i;
  concise_mode = mode;
}

/**
 * to post message when the test finished
 * */
let flag = 0;
function check() {
  /*检查是否渲染失败*/
  if (cw().document.querySelectorAll('span.u').length == 0) {
      $('#refreshBtn')[0].click();
      $('.goBtn')[0].click();
      timer = setTimeout(() => {
        check();
      }, 10000);
        return;
     }
  
  if (concise_mode==0){
    if (cw().document.querySelectorAll('span.u').length <= 10) {
      timer = setTimeout(() => {
        check();
      }, 3000);
        return;
     }
    const progress = cw().document.querySelectorAll('span.u');
    let pos1 = -1;
    
    for (let i = 9; i < progress.length; i++) {
      const element = progress[i];
      if (element.textContent.split(' ')[0] === '》') {
        pos1 = i;
        break;
      }
    }
    
    if (pos1 == -1) {
      /*10%没出*/
      clearTimeout(timer);
      timer = setTimeout(() => {
        check();
      }, 1000);
      return;
    }

      const val = parseInt(progress[pos1].textContent.split(' ')[2]);
      window.postMessage(val,'*');
      console.log('sent 10% msg'+val);
      
      return;
  }
  
  if (concise_mode==1){
    
    if (cw().document.querySelectorAll('span.u').length <= 100) {
      timer = setTimeout(() => {
        check();
      }, 3000);
        return;
     }
    
    const progress = cw().document.querySelectorAll('span.u');
    let pos2 = -1;
    
     for (let i = 99; i < progress.length; i++) {
      const element = progress[i];
      if (element.textContent.split(' ')[0] === '》') {
        pos2 = i;
        break;
      }
    }
    
    if (pos2 == -1) {
      /*100%没出*/
      clearTimeout(timer);
      timer = setTimeout(() => {
        check();
      }, 1000);
      return;
    }

      const val = parseInt(progress[pos2].textContent.split(' ')[2]);
      window.postMessage(val,'*');
      console.log('sent 100% msg'+val);
      
      return;
    
  }
}

/**
 * Reload.
 * @param {String} name name to be tested.
 * @param {Number} mode test mode.
 */
function reload(name, mode) {
  //cnt = 0;
  nameTesting = name;
  mdd = mode;
  $('#textdiv>textarea')[0].value = (mode > 1 ? testMode[1] : testMode[0]) +
    name;
  if (mode & 1) {
    $('#textdiv>textarea')[0].value += '\n' + name;
  }
  $('.goBtn')[0].click();
  timer = setTimeout(() => {
        check();
   }, 3000);
}
