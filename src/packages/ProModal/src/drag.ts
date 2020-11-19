let x = 0
let y = 0;
let px = 0;
let py = 0;
let onDrag = false;

let timer: number | null = null;

const dia = 0;

let tt = 0;


function drag(el: HTMLElement) {
  // const tt = (el.target as HTMLElement).clientWidth;
  const elWidth = el.clientLeft;
  el.onmousedown = e => {
    console.log(e.offsetX)
    if (timer === null) {
      timer = setTimeout(() => {
        timer = null;
      }, 20);
      x = e.clientX;
      y = e.clientY;
      px = el.offsetLeft;
      py = el.offsetTop;
      onDrag = true;
      el.style.cursor = 'move';

      tt = e.offsetX;
    }
  },
  window.onmousemove = e => {
    if (onDrag) {
      const nx = e.clientX + px - x;
      const ny = e.clientY + py - y;
      const width = document.body.clientWidth - dia;
      const height = document.body.clientHeight - dia;
      console.log(e.clientX - tt)
      if (e.clientX - tt > 20 && e.clientX + (300-tt-20) <= width) {
        el.style.left = nx + 'px'
        // console.log(nx, el.offsetLeft, width)
      }
      if (ny > 0 && ny <= height) {
        el.style.top = ny + 'px'
      }

    }
  },
  el.onmouseup = () => {
    if (onDrag) {
      onDrag = false;
      el.style.cursor = 'default';
    }
  }
  
}

export default drag;