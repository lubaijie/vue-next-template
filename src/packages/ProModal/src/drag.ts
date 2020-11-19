let x = 0
let y = 0;
let px = 0;
let py = 0;
let onDrag = false;

let timer: number | null = null;

const dia = 60;


const drag = {
  mounted(el) {
    el.onmousedown = e => {
      if (timer === null) {
        timer = setTimeout(() => {
          timer = null;
        }, 200);
        x = e.clientX;
        y = e.clientY;
        px = el.offsetLeft;
        py = el.offsetTop;
        onDrag = true;
        el.style.cursor = 'move';
      }
      },
      window.onmousemove = e => {
        if (onDrag) {
          const nx = e.clientX + px - x;
          const ny = e.clientY + py - y;
          const width = document.body.clientWidth - dia;
          const height = document.body.clientHeight - dia;
          console.log(el.style.left)
          if (nx > 0 && nx <= width) {
            el.style.left = nx + 'px'
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
}

export default drag;