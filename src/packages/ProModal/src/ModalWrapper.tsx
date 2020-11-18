import { getSlot } from '@/utils/helper/tsxHelper';
import { defineComponent, inject, onMounted, unref, watchEffect } from 'vue';

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
      const modalWrapperEl = unref(modalWrapperRef)?.$el as HTMLElement;
      if (!modalWrapperEl) return;

      const modalBodyEl = modalWrapperEl.parentElement;
      
      const modalContentEl = modalWrapperEl.parentElement?.parentElement;
      if (!modalContentEl) return;
      
      const modalHeaderEl = modalContentEl.getElementsByClassName('ant-modal-header')[0];

      const modalFooterEl = modalContentEl.getElementsByClassName('ant-modal-footer')[0];

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