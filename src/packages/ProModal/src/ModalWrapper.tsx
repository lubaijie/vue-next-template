import { getSlot } from '@/utils/helper/tsxHelper';
import { defineComponent, inject, onMounted, ref, unref } from 'vue';

export default defineComponent({
  name: 'ModalContent',
  setup(props, {slots}) {
    const modalRef = inject<any>('modalRef');

    console.log(unref(modalRef));

    return () => (
      <div class="modal-wrapper">
        {getSlot(slots, 'default')}
      </div>
    )
  }
})