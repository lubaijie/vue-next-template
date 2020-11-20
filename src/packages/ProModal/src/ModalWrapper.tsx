import { getSlot } from '@/utils/helper/tsxHelper';
import { defineComponent, inject, onMounted, ref, unref, watchEffect, Teleport } from 'vue';
import './index.scss';

let modalEl;
let modalContentEl;
let modalWrapperEl;
let modalBodyEl;
let modalHeaderEl;
let modalFooterEl;

export default defineComponent({
  name: 'ModalContent',
  props: {
    fullScreen: {
      type: Boolean,
      required: true
    }
  },
  setup(props, {slots}) {
    const modalWrapperRef = inject<any>('modalWrapperRef');

    const resizeIcon = ref<JSX.Element | null>(null);
    
    watchEffect(() => {
      watchHeight();
    })
    onMounted(() => {
      watchHeight();
      resizeIcon.value = (
        <Teleport to={modalContentEl}>
          <div class="modal-resize-icon" onMousedown={resize}></div>
        </Teleport>
      )
    })

    function resize(e: MouseEvent) {
      console.log(e);
      
      console.log(modalContentEl.getBoundingClientRect());

      window.onmousemove = e => {
        console.log(e.x, e.y)
        modalContentEl.style.cssText += `;width: ${e.x}px; height: ${e.y}px`;
      }

      window.onmouseup = () => {
        console.log(modalContentEl.getBoundingClientRect());
        // modalEl.style.cssText += `;width: ${getComputedStyle(modalContentEl).width}`;
        window.onmousemove = null;
      }
    }

    function watchHeight() {
      modalWrapperEl = unref(modalWrapperRef)?.$el as HTMLElement;
      if (!modalWrapperEl) return;

      modalBodyEl = modalWrapperEl.parentElement;
      
      modalContentEl = modalWrapperEl.parentElement?.parentElement;
      if (!modalContentEl) return;

      modalEl = modalContentEl.parentElement;
      
      modalHeaderEl = modalContentEl.getElementsByClassName('ant-modal-header')[0];

      modalFooterEl = modalContentEl.getElementsByClassName('ant-modal-footer')[0];

      const bodyHeight = props.fullScreen ? (window.innerHeight - (modalHeaderEl ? modalHeaderEl.clientHeight : 0)
        - (modalFooterEl ? modalFooterEl.clientHeight : 0)) 
        : modalWrapperEl.clientHeight;

        modalBodyEl?.setAttribute('style',`height: ${bodyHeight}px`);
    }

    return () => (
      <div class="modal-wrapper">
        {getSlot(slots, 'default')}
        {unref(resizeIcon)}
      </div>
    )
  }
})