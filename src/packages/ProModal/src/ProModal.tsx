import { getSlot } from '@/utils/helper/tsxHelper';
import { splitProps } from '@/utils/helper/vueHelper';
import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref, unref, watch } from "vue";
import ModalWrapper from './ModalWrapper';
import { defaultProps, modalProps } from './props';
import {AugmentProps, ModalProps } from './types';

const ProModal = defineComponent({
  name: 'ProModal',
  props: defaultProps,
  setup(props, { slots, emit, attrs }) {

    const augmentPropsRef = ref<AugmentProps>(splitProps(modalProps, props).target);
    const propsRef = ref<ModalProps>(splitProps(modalProps, props).remain);
    watch(props, val => {
      const { target, remain } = splitProps(modalProps, val);
      augmentPropsRef.value = target;
      propsRef.value = remain;
    })

    const modalWrapperRef = ref<any>(null);
    // modal   Bottom and top height
    const extHeightRef = ref<number>(0);

    /**
     * @description modalContent
     */
    function renderContent() {

      // const { wrapperProps } = unref(augmentPropsRef);

      const showFooter = unref(propsRef).footer !== undefined && !unref(propsRef).footer ? 0 : undefined;
      return (
        <ModalWrapper
          footerOffset={unref(augmentPropsRef).wrapperFooterOffset}
          fullScreen={unref(augmentPropsRef).fullScreen}
          visible={unref(propsRef).visible}
          ref={modalWrapperRef}
          modalFooterHeight={showFooter}
          onGetExtHeight={(height: number) => {
            extHeightRef.value = height
          }}
          onHeightChange={(height: string) => {
            emit('heightChange', height)
          }}
          v-slots={{default: () => getSlot(slots, 'default')}}/>
      )
    }

    function handleFullScreen(e: Event) {
      e && e.stopPropagation();
      unref(augmentPropsRef).fullScreen = ! unref(augmentPropsRef).fullScreen;
      console.log('全屏');
    }

    /**
     * @description 关闭按钮
     */
    function renderClose() {
      if (!unref(augmentPropsRef).canFullScreen) {
        return null;
      }

      return (
        <div class="custom-close-iocn">
          {
            unref(augmentPropsRef).fullScreen ? <FullscreenExitOutlined role="full" onClick={handleFullScreen} /> 
            : <FullscreenOutlined role="close" onClick={handleFullScreen} />
          }
          {
            (props.closeIcon || getSlot(slots, 'closeIcon')) ? 
              (getSlot(slots, 'closeIcon') ? getSlot(slots, 'closeIcon') : props.closeIcon)
              : <CloseOutlined />
          }
        </div>
      )
    }

    return () => (
      <>
        <a-modal 
          {...{...propsRef.value, ...augmentPropsRef.value, closeIcon: () => renderClose()}} 
          v-slots={{...slots, closeIcon: () => renderClose(), default: () => renderContent()}} />
      </> 
    )
  }
});

export default ProModal;