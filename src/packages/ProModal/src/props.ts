import type { CSSProperties, PropType } from 'vue';
import { Modal } from 'ant-design-vue';
import { BasicTitleProps } from '@/packages/Basic/types';
export const modalProps = {
  canFullScreen: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  fullScreen: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  // open drag
  draggable: {
    type: Boolean as PropType<boolean>,
    default: true,
  },

  wrapperFooterOffset: {
    type: Number as PropType<number>,
    default: 0,
  },

  titleProps: Object as PropType<BasicTitleProps>,

  titleStyle: {
    type: Object as PropType<CSSProperties>,
    default: { padding: '12px 24px' }
  }
};

export const defaultProps = Object.assign({}, modalProps, Modal.props)

