import { getSlot } from '@/utils/helper/tsxHelper';
import { defineComponent, inject, onMounted, unref, watchEffect } from 'vue';

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
    
    watchEffect(() => {
      watchHeight();
    })
    onMounted(() => {
      watchHeight();
    })

    function watchHeight() {
      modalWrapperEl = unref(modalWrapperRef)?.$el as HTMLElement;
      if (!modalWrapperEl) return;

      modalBodyEl = modalWrapperEl.parentElement;
      
      modalContentEl = modalWrapperEl.parentElement?.parentElement;
      if (!modalContentEl) return;
      
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
      </div>
    )
  }
})