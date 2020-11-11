import { getSlot } from '@/utils/helper/tsxHelper';
import { splitObject } from '@/utils/helper/vueHelper';
import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, unref } from "vue";
// import { defaultProps } from './props';
import { ModalProps, AugmentProps } from './types';

const augmentPros: AugmentProps = {
  canFullScreen: true,
  fullScreen: false,
}

const ProModal = defineComponent({
  name: 'ProModal',
  setup(props: ModalProps, { slots, emit, attrs }) {

    const augmentPropsRef = ref<AugmentProps>(splitObject(augmentPros, props));

    /**
     * @description 关闭按钮
     */
    function renderClose() {
      const { canFullScreen, fullScreen } = unref(augmentPropsRef)
      if (!canFullScreen) {
        return null;
      }

      return (
        <div class="custom-close-iocn">
          {
            unref(fullScreen) ? <FullscreenExitOutlined role="full" /> : <FullscreenOutlined role="close" />
          }
          {
            (props.closeIcon || getSlot(slots, 'closeIcon')) ? 
              (props.closeIcon ? props.closeIcon : getSlot(slots, 'closeIcon'))
              : <CloseOutlined />
          }
        </div>
      )
    }

    return () => (
      <>
        <a-modal {...props} v-slots={{...slots, closeIcon: () => renderClose()}} />
      </> 
    )
  }
});

export default ProModal;