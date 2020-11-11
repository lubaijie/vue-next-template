import { ModalProps } from 'ant-design-vue/lib/modal'
export interface ModalProps extends ModalProps {
  // 是否可以进行全屏
  canFullScreen?: boolean;

  // 全屏
  fullScreen?: boolean;
}