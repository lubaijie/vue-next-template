<template>
<div class="move-menu-container" v-drag>
  测试
</div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';

let x = 0
let y = 0;
let px = 0;
let py = 0;
let onDrag = false;

const drag = {
  mounted(el) {
    el.onmousedown = e => {
        x = e.clientX;
        y = e.clientY;
        px = el.offsetLeft;
        py = el.offsetTop;
        onDrag = true;
        el.style.cursor = 'move';
      },
      window.onmousemove = e => {
        if (onDrag) {
          const nx = e.clientX + px - x;
          const ny = e.clientY + py - y;
          const width = document.body.clientWidth - 100;
          const height = document.body.clientHeight - 100;
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
  }
})
</script>

<style lang="scss">
.move-menu-container {
  position: absolute;
  bottom: 40px;
  right: 40px;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
</style>
