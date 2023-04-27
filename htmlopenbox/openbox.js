/**
 * Name.
 */
class Name {
  /**
   * @param {String} name Name.
   * @param {Number} mode Mode.
   * @param {Number} time Time to test.
   */
  constructor(name, mode, time) {
    /** @const {string} */
    this.name = name;
    /** @const {number} */
    this.mode = mode;
    /** @const {number} */
    this.time = time;
  }
}
let /** !Array<String> */ nm = [];
const /** !Array<Name> */ a = [];
const r = ['普评', '普单', '强评', '强单'];
const ifr = [];
let j;
let cntIframe;
let ppThreshold;
let pdThreshold;
let qpThreshold;
let qdThreshold;
let usePp;
let usePd;
let useQp;
let useQd;
/**
 * Start.
 */
function st() {
  nm = Array.prototype.slice.call($('#names')[0].value.split('\n'));
  usePp = $('#use-pp')[0].checked;
  usePd = $('#use-pd')[0].checked;
  useQp = $('#use-qp')[0].checked;
  useQd = $('#use-qd')[0].checked;
  if (usePp) {
    const mod = Number($('#pp-100')[0].checked);
    ppThreshold = Number($('#ppt')[0].value);
    for (const name of nm) a.push(new Name(name, 0, mod));
  }
  if (usePd) {
    const mod = Number($('#pd-100')[0].checked);
    pdThreshold = Number($('#pdt')[0].value);
    for (const name of nm) a.push(new Name(name, 1, mod));
  }
  if (useQp) {
    const mod = Number($('#qp-100')[0].checked);
    qpThreshold = Number($('#qpt')[0].value);
    for (const name of nm) a.push(new Name(name, 2, mod));
  }
  if (useQd) {
    const mod = Number($('#qd-100')[0].checked);
    qdThreshold = Number($('#qdt')[0].value);
    for (const name of nm) a.push(new Name(name, 3, mod));
  }
  cntIframe = Number($('#multi')[0].value);
  for (let i = 0; i < cntIframe; i++) {
    const nw = document.createElement('iframe');
    nw.src = 'https://deepmess.com/namerena/index.html';
    nw.sandbox = "allow-same-origin allow-scripts"
    // nw.hidden = true;
    nw.style.width = '400px';
    nw.style.height = '600px';
    document.body.appendChild(nw);
    ifr.push(nw);
    
  }
  j = cntIframe;

  const iframeLoaded = new Promise(resolve => {
    ifr[cntIframe-1].onload = resolve; 
  });
  
  iframeLoaded.then(() => {
    console.log('iframe loaded');
    window.addEventListener('message', (event) => {
      
      const name = event.data[0];
      const score = event.data[1];
      const m = event.data[2];
      const id = event.data[3];
      if (m === 0 && score >= ppThreshold) {
        $('#result')[0].value += `${name} ${r[m]} ${score}\n`;
      }
      if (m === 1 && score >= pdThreshold) {
        $('#result')[0].value += `${name} ${r[m]} ${score}\n`;
      }
      if (m === 2 && score >= qpThreshold) {
        $('#result')[0].value += `${name} ${r[m]} ${score}\n`;
      }
      if (m === 3 && score >= qdThreshold) {
        $('#result')[0].value += `${name} ${r[m]} ${score}\n`;
      }
      const cw = ifr[id].contentWindow;
      if (j < a.length) {
        cw.setMode(a[j].time, id);
        cw.reload(a[j].name, a[j].mode);
      }
      if (++j == a.length + ifr.length) alert('测试已完成');
    });
    setTimeout(() => {
      for (let i = 0; i < ifr.length; i++) {
        setTimeout(() => {
          const cw = ifr[i].contentWindow;
          cw.setMode(a[i].time, i);
          cw.reload(a[i].name, a[i].mode);
        }, i * 2000);
      }
    }, 5000);  
  });

    
    
}

