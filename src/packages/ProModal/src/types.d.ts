import { BasicTitleProps } from '@/packages/Basic/types';
import { ModalProps } from 'ant-design-vue/lib/modal'

export interface AugmentProps {
  // 是否可以进行全屏
  canFullScreen: boolean;
  // 全屏
  fullScreen: boolean;

  draggable: boolean;

  // 启用wrapper后 底部可以适当增加高度
  wrapperFooterOffset?: number;

  titleProps?: BasicTitleProps;
}

export type ModalProps = AugmentProps & ModalProps;
