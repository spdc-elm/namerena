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
const r2 = ['PP','PD','QP','QD'];
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
  results={};
  nm = Array.prototype.slice.call($('#names')[0].value.split('\n'));
  const mode_set = [$('#use-pp')[0].checked,$('#use-pd')[0].checked,$('#use-qp')[0].checked,$('#use-qd')[0].checked];
  const concise_mode = [Number($('#pp-100')[0].checked),Number($('#pd-100')[0].checked),Number($('#qp-100')[0].checked),Number($('#qd-100')[0].checked)];
  const thresholds = [Number($('#ppt')[0].value),Number($('#pdt')[0].value),Number($('#qpt')[0].value),Number($('#qdt')[0].value)];
  for (const name of nm) {
    results[name]={};
    for (const i of [0, 1, 2, 3]) {
      if (mode_set[i]) {
        a.push(new Name(name, i, concise_mode[i]));
        results[name][r2[i]]=-1;
      }
    } 
    
  }
  
//   if (usePp) {
//     const mod = Number($('#pp-100')[0].checked);
//     ppThreshold = Number($('#ppt')[0].value);
//     for (const name of nm) a.push(new Name(name, 0, mod));
//   }
//   if (usePd) {
//     const mod = Number($('#pd-100')[0].checked);
//     pdThreshold = Number($('#pdt')[0].value);
//     for (const name of nm) a.push(new Name(name, 1, mod));
//   }
//   if (useQp) {
//     const mod = Number($('#qp-100')[0].checked);
//     qpThreshold = Number($('#qpt')[0].value);
//     for (const name of nm) a.push(new Name(name, 2, mod));
//   }
//   if (useQd) {
//     const mod = Number($('#qd-100')[0].checked);
//     qdThreshold = Number($('#qdt')[0].value);
//     for (const name of nm) a.push(new Name(name, 3, mod));
//   }
  
  cntIframe = Number($('#multi')[0].value);
  for (let i = 0; i < cntIframe; i++) {
    const nw = document.createElement('iframe');
    nw.src = './beta/index.html';
    // nw.hidden = true;
    nw.style.width = '400px';
    nw.style.height = '600px';
    document.body.appendChild(nw);
    ifr.push(nw);
  }
  j = cntIframe;
  
  
  window.addEventListener('message', (event) => {
    const name = event.data[0];
    const score = event.data[1];
    const m = event.data[2];
    const id = event.data[3];
    console.log(name);
    
    results[name][r2[m]]= score;
    if (score >= thresholds[m]) $('#result')[0].value += `${name}\t${r[m]}\t${score}\n`;
    
//     if (m === 0) {
      
      
//     }
//     if (m === 1 && score >= pdThreshold) {
//       $('#result')[0].value += `${name}_${r[m]}_${score}\n`;
//     }
//     if (m === 2 && score >= qpThreshold) {
//       $('#result')[0].value += `${name}_${r[m]}_${score}\n`;
//     }
//     if (m === 3 && score >= qdThreshold) {
//       $('#result')[0].value += `${name}_${r[m]}_${score}\n`;
//     }
    const cw = ifr[id].contentWindow;
    if (j < a.length) {
      cw.setMode(a[j].time, id);
      cw.reload(a[j].name, a[j].mode);
    }
    if (++j == a.length + ifr.length){
      alert('测试已完成');
      $('#done')[0].checked = true;
      setTimeout(() => {
        for (let i = 0; i < ifr.length; i++) {
            let cw = ifr[i].contentWindow;
            cw.stop();
        }
      }, 3000);
    }
  });//event listener end
  
  
  setTimeout(() => {
    for (let i = 0; i < ifr.length; i++) {
      setTimeout(() => {
        const cw = ifr[i].contentWindow;
        cw.setMode(a[i].time, i);
        cw.reload(a[i].name, a[i].mode);
      }, i * 2000);
    }
  }, 5000);
}

/*整理，按输入顺序为字符串排序.尚未完工,没有处理不同模式可能对应的一对多问题*/
function arrage(){
  let names = $('#names')[0].value.split('\n');
  let output = $('#result')[0].value.split('\n');
  let obj = {};
  for (let i = 0; i < names.length; i++) {
    obj[names[i]] = i; 
  }

  let temp = [];
  let left = [];
  
  for (let str of output) {
    let index = str.split('_')[0];
    if (temp[obj[index]]!==undefined){
      temp[obj[index]] = str;
    } else {
      left.push(str);
    }
  }
  temp = temp.concat(left);
  output = temp.join('\n');
  $('#result')[0].value = output;
}
