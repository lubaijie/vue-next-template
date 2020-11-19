import BasicTitle from '@/packages/Basic/BasicTitle';
import { getSlot } from '@/utils/helper/tsxHelper';
import { splitProps } from '@/utils/helper/vueHelper';
import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
import { defineComponent, provide, ref, unref, watch } from "vue";
import ModalWrapper from './ModalWrapper';
import { defaultProps, modalProps } from './props';
import {AugmentProps, ModalProps } from './types';
import drag from './drag';

const ProModal = defineComponent({
  name: 'ProModal',
  props: defaultProps,
  directives: {
    drag: drag
  },
  setup(props: ModalProps, { slots, attrs }) {

    const modalWrapperRef = ref<any>(null);
    provide('modalWrapperRef', modalWrapperRef);

    const augmentPropsRef = ref<AugmentProps>(splitProps(modalProps, props).target);
    const propsRef = ref<ModalProps>(splitProps(modalProps, props).remain);

    let wrapClassNameFixed = unref(propsRef).wrapClassName;

    watch(props, val => {
      const { target, remain } = splitProps(modalProps, val);
      augmentPropsRef.value = target;
      propsRef.value = remain;
      // 设置全屏
      wrapClassNameFixed = unref(propsRef).wrapClassName;
      const className = unref(augmentPropsRef).fullScreen ? `${wrapClassNameFixed} fullscreen-modal` : wrapClassNameFixed;
      unref(propsRef).wrapClassName = className;
    })

    /**
     * @description 标题
     */
    function renderTitle() {
      const { titleProps } = unref(augmentPropsRef);
      return (
        <div style="padding: 12px 24px">
          <BasicTitle {...titleProps}>
            {slots.title ? getSlot(slots, 'title') : unref(propsRef).title}
          </BasicTitle>
        </div>
      )
    }

    /**
     * @description modalContent
     */
    function renderContent() {
      return (
        <ModalWrapper ref={modalWrapperRef} fullScreen={unref(augmentPropsRef).fullScreen} v-slots={{default: () => getSlot(slots, 'default')}} />
      )
    }
    
    /**
     * @description 全屏切换
     * @param e 
     */
    function handleFullScreen(e: Event) {
      e && e.stopPropagation();
      unref(augmentPropsRef).fullScreen = ! unref(augmentPropsRef).fullScreen;

      const className = unref(augmentPropsRef).fullScreen ? `${wrapClassNameFixed} fullscreen-modal` : wrapClassNameFixed;
      
      unref(propsRef).wrapClassName = className;
      
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
          {...{...propsRef.value, ...augmentPropsRef.value, ...attrs, closeIcon: () => renderClose(), title: () => renderTitle()}} 
          v-slots={{...slots, closeIcon: () => renderClose(), title: () => renderTitle(), default: () => renderContent()}} />
      </> 
    )
  }
});

export default ProModal;