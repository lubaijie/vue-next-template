import BasicTitle from '@/packages/Basic/BasicTitle';
import { getSlot } from '@/utils/helper/tsxHelper';
import { splitProps } from '@/utils/helper/vueHelper';
import { CloseOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
import { defineComponent, provide, ref, unref, watch } from "vue";
import drag from './drag';
import ModalWrapper from './ModalWrapper';
import { defaultProps, modalProps } from './props';
import {AugmentProps, ModalProps } from './types';
import './index.scss';

const ProModal = defineComponent({
  name: 'ProModal',
  props: defaultProps,
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
        <>
          { unref(augmentPropsRef).draggable ? <div class="modal-drag" onMousedown={handleDrag}></div> : null }
          <div 
            style={unref(augmentPropsRef).titleStyle}
          >
            <BasicTitle {...titleProps}>
              {slots.title ? getSlot(slots, 'title') : unref(propsRef).title}
            </BasicTitle>
          </div>
        </>
      )
    }


    function handleDrag(event: MouseEvent) {
      const el = event.target as HTMLElement;
      if (!el) return;

      const modalEl = el.parentElement?.parentElement?.parentElement?.parentElement;
      if (!modalEl) return;

      modalEl.style.transition = 'none';

      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = event.clientX;
      const disY = event.clientY;
      const screenWidth = document.body.clientWidth; // body当前宽度
      const screenHeight = document.documentElement.clientHeight; // 可见区域高度(应为body高度，可某些环境下无法获取)

      const dragDomWidth = modalEl.offsetWidth; // 对话框宽度
      const dragDomheight = modalEl.offsetHeight; // 对话框高度

      const minDragDomLeft = modalEl.offsetLeft;

      const maxDragDomLeft = screenWidth - modalEl.offsetLeft - dragDomWidth;
      const minDragDomTop = modalEl.offsetTop;
      const maxDragDomTop = screenHeight - modalEl.offsetTop - dragDomheight;
      // 获取到的值带px 正则匹配替换
      const domLeft = getComputedStyle(modalEl).left;
      const domTop = getComputedStyle(modalEl).top;
      let styL = +domLeft;
      let styT = +domTop;

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (domLeft.includes('%')) {
        styL = +document.body.clientWidth * (+domLeft.replace(/%/g, '') / 100);
        styT = +document.body.clientHeight * (+domTop.replace(/%/g, '') / 100);
      } else {
        styL = +domLeft.replace(/px/g, '');
        styT = +domTop.replace(/px/g, '');
      }

      document.onmousemove = e => {

        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX;
        let top = e.clientY - disY;

        // 边界处理
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft;
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft;
        }

        if (-top > minDragDomTop) {
          top = -minDragDomTop;
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop;
        }
        console.log(left + styL);
        // 移动当前元素
        modalEl.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`;
      }

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        modalEl.style.transition = 'all .5s';
      };
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