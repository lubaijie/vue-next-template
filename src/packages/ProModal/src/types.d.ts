import { ModalProps } from 'ant-design-vue/lib/modal'

export interface AugmentProps {
  // 是否可以进行全屏
  canFullScreen: boolean;
  // 全屏
  fullScreen: boolean;

  draggable: boolean;

  // 启用wrapper后 底部可以适当增加高度
  wrapperFooterOffset?: number;

  wrapperProps: any;
}

export type ModalProps = AugmentProps & ModalProps;

export interface ModalWrapperProps {
  footerOffset?: number;
  loading: boolean;
  modalHeaderHeight: number;
  modalFooterHeight: number;
  minHeight: number;
  visible: boolean;
  fullScreen: boolean;
}