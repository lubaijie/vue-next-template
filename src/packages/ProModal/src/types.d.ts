import { ModalProps } from 'ant-design-vue/lib/modal'

export interface AugmentProps {
  // 是否可以进行全屏
  canFullScreen?: boolean;
  // 全屏
  fullScreen?: boolean;

  title?: VNodeTypes;
}

export type ModalProps = AugmentProps & ModalProps;