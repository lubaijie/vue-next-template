import {
  defineComponent,
  ref
} from 'vue';
import './index.scss'

let x = 0
let y = 0;
let px = 0;
let py = 0;
let onDrag = false;

let timer: number | null = null;

let dia = 60;
const isActivate = ref(false);
const menuElement = ref()

const createMenu = e => {
  const menuStyle: any = {
    top: e.clientY,
    left: e.clientX,
  };
  const childStyle: any = {
    height: '30px',
    lineHeight: '30px',
    position: 'absolute',
  };
  let dir = 'bottom';
  if (e.clientY > (document.body.clientHeight - 120) /2) {
    menuStyle.bottom = '120px';
    dir = 'bottom';
  } else {
    menuStyle.top = '30px';
    dir = 'top';
  }
  let index = 0;
  const list: number[] = [];
  
  const startTime = setInterval(() => {
    if (list.length > 10 || !isActivate.value ) {
      clearInterval(startTime);
      return;
    }
    list.push(index++)
    menuElement.value = <div class="menu-container" style={ menuStyle }>
      {
        list.map((element,index) => {
          if (dir === 'bottom') {
            childStyle.top = index * -40 + 'px';
          } else {
            childStyle.top = index * 40 + 'px';
          }
          return (<div style={childStyle}>{element}</div>)      
        })
      }
    </div>
  }, 100)
  
}

const destroyMenu = () => {
  menuElement.value = null;
}

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
          // isActivate.value = false;
          // destroyMenu();
          const nx = e.clientX + px - x;
          const ny = e.clientY + py - y;
          const width = document.body.clientWidth - dia;
          const height = document.body.clientHeight - dia;
          if (nx > 0 && nx <= width) {
            el.style.left = nx + 'px'
          }
          if (ny > 0 && ny <= height) {
            el.style.top = ny + 'px'
          }

        }
      },
      el.onmouseup = e => {
        if (onDrag) {
          onDrag = false;
          el.style.cursor = 'default';
        }

        if (el.childNodes[0] === e.target) {
          if (timer !== null) {
            clearTimeout(timer);
            timer = null;
    
            if (!isActivate.value) {
              isActivate.value = true;
              dia = 120;
              setTimeout(() => createMenu(e), 200)
              ;
            } else {
              isActivate.value = false;
              dia = 60;
              destroyMenu();
            }
          }
        }
        
      }
  }
}

export default defineComponent({
  directives: {
    drag: drag
  },
  setup() {

    return () => (
      <div 
        class="move-menu-container" 
        v-drag>
        <div class="menu-controller" style={isActivate.value ? { transform: 'scale(2)' } : { transform: 'scale(1)' } }/>
        {menuElement.value}
      </div>
    )
  }
})