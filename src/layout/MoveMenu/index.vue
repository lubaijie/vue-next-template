<template>
  <div 
    class="move-menu-container" 
    :style="isActivate ? { transform: 'scale(2)' } : { transform: 'scale(1)' } "
    v-drag 
    @mouseup.self="handleMenu">
    <div class="menu-container">
      
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue';

let x = 0
let y = 0;
let px = 0;
let py = 0;
let onDrag = false;

let timer: number | null = null;

let dia = 60;
const isActivate = ref(false);

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

export default defineComponent({
  directives: {
    drag: drag
  },
  setup() {

    // 展开菜单
    const handleMenu = e => {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;

        if (!isActivate.value) {
          isActivate.value = true;
          dia = 120;
        } else {
          isActivate.value = false;
          dia = 60;
        }
        

        console.log(e.target.childNodes);
      }
    };

    // const createMenu = (el: Element) => {
    //   const newEl = 
    // }

    return {
      handleMenu,
      isActivate
    }
  }
})
</script>

<style lang="scss">
.move-menu-container {
  position: absolute;
  bottom: 40px;
  right: 40px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background-image: url('../../assets/images/header.jpg');
  background-repeat: no-repeat;
  background-size: contain;

  transition: transform .5s;

  .menu-container{
    position: relative;
    top: -150px;
    height: 150px;
    width: 60px;
    background-color:red;
  }
}
</style>
