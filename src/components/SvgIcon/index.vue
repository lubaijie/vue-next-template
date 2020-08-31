<template>
<div v-if="external" :style="styleExternalIcon" class="svg-external-icon svg-icon" v-on="$listeners"></div>
<svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
  <use :href="iconName" />
</svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { isExternal } from '@/utils/validate'

export default defineComponent({
  name: 'SvgIcon',

  props: {
    iconClass: {
      type: String,
      default: ''
    },
    className: String,
  },

  setup(props) {

    const external = computed(() => {
      return isExternal(props.iconClass);
    });
    const iconName = computed(() => {
      console.log(props.iconClass);
      return `#icon-${props.iconClass}`;
    });
    const svgClass = computed(() => {
      if (props.className) {
        return 'svg-icon ' + props.className;
      } else {
        return 'svg-icon'
      }
    });
    const styleExternalIcon = computed(() => {
      return {
        mask: `url(${props.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${props.iconClass}) no-repeat 50% 50%`
      }
    });

    return {
      external,
      iconName,
      svgClass,
      styleExternalIcon
    }
  }
})
</script>
