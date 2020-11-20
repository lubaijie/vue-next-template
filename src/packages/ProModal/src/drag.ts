// let x = 0
// let y = 0;
// let px = 0;
// let py = 0;
let onDrag = false;

let timer: number | null = null;

// let dia = 60;


const drag = (el) => {
  el.onmousedown = e => {
    if (timer === null) {
      timer = setTimeout(() => {
        timer = null;
      }, 20);
      // x = e.clientX;
      // y = e.clientY;
      // px = el.offsetLeft;
      // py = el.offsetTop;
      onDrag = true;
    }
    },
    window.onmousemove = e => {
      // console.log(count++);
      if (onDrag) {
        
        // const nx = e.clientX + px - x;
        // const ny = e.clientY + py - y;
        // const width = document.body.clientWidth - dia;
        // const height = document.body.clientHeight - dia;
        // if (nx > 0 && nx <= width) {
        //   el.style.left = nx + 'px'
        // }
        // if (ny > 0 && ny <= height) {
        //   el.style.top = ny + 'px'
        // }
      }
    },
    el.onmouseup = e => {
      if (onDrag) {
        onDrag = false;
        el.style.cursor = 'default';
      }
      
    }
}

export default drag;