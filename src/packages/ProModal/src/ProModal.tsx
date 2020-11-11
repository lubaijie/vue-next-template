import { extendSlots, getSlot } from '@/utils/helper/tsxHelper';
import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, unref, watchEffect } from "vue";
// import { defaultProps } from './props';
import { ModalProps } from './types';

const ProModal = defineComponent({
  name: 'ProModal',
  // props: defaultProps,
  setup(props: ModalProps, { slots, emit, attrs }) {

    // const ll = keyof(ModalProps);
    // console.log(ll.value);

    const canFullScreenRef = ref<boolean | undefined>(true);
    watchEffect(() => {
      if (props.canFullScreen) {
        canFullScreenRef.value = props.canFullScreen;
      }
      
    })

    const fullScreenRef = ref<boolean | undefined>(false);
    watchEffect(() => {
      if(props.fullScreen) fullScreenRef.value = props.fullScreen;
    })

    /**
     * @description 关闭按钮
     */
    function renderClose() {
      if (!canFullScreenRef.value) {
        return null;
      }

      return (
        <div class="custom-close-iocn">
          {
            unref(fullScreenRef) ? <FullscreenExitOutlined role="full" /> : <FullscreenOutlined role="close" />
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