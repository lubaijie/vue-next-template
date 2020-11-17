import type { PropType } from 'vue';
import { Modal } from 'ant-design-vue';
import { ModalWrapperProps } from './types';
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

  wrapperProps: Object as PropType<any>,
};

export const defaultProps = Object.assign({}, modalProps, Modal.props)

