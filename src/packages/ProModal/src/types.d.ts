import { BasicTitleProps } from '@/packages/Basic/types';
import { ModalProps } from 'ant-design-vue/lib/modal'
import type { CSSProperties } from 'vue';

export interface AugmentProps {
  // 是否可以进行全屏
  canFullScreen: boolean;
  // 全屏
  fullScreen: boolean;

  draggable: boolean;

  // 启用wrapper后 底部可以适当增加高度
  wrapperFooterOffset?: number;

  titleProps?: BasicTitleProps;

  titleStyle?: CSSProperties
}

export type ModalProps = AugmentProps & ModalProps;
