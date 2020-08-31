import { defineComponent, computed } from 'vue';
// import { isExternal } from '@/utils/validate.ts';

interface SvgIconProps {
  iconClass: string;
  className: string;
}

const svgIcon = {
  width: '1em',
  height: '1em',
  verticalAlign: '-0.15em',
  fill: 'currentColor',
  overflow: 'hidden'
};

const svgExternalIcon = {
  backgroundColor: 'currentColor',
  maskSize: 'cover!important',
  display: 'inline-block'
}

const SvgIcon = defineComponent({
  name: 'SvgIcon',
  setup(props: SvgIconProps) {
    const external = computed(() => {
      return /^(https?:|mailto:|tel:)/.test(props.iconClass);
    });
    const iconName = computed(() => {
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

    return () => (
      <div>
        <svg class={svgClass.value} aria-hidden="true">
          <use href={iconName.value} />
        </svg>
      </div>
    )
  }
})

export default SvgIcon;