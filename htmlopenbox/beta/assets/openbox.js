const testMode = ['!test!\n\n', '!test!\n!\n\n'];
let nameTesting;
let callback;
let cnt = 0;
let mdd;
let id = -1;
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
  if (++cnt == 1) {
    return;
  }
  cnt = 0;
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
        callback(Number(event.data.slice(6)));
      }
    }, false);
  }
  id = i;
}
/**
 * Reload.
 * @param {String} name name to be tested.
 * @param {Number} mode test mode.
 */
function reload(name, mode) {
  cnt = 0;
  nameTesting = name;
  mdd = mode;
  $('#textdiv>textarea')[0].value = (mode > 1 ? testMode[1] : testMode[0]) +
    name;
  if (mode & 1) {
    $('#textdiv>textarea')[0].value += '\n' + name;
  }
  $('.goBtn')[0].click();
}
