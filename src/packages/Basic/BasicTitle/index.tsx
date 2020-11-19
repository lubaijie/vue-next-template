import { getSlot } from '@/utils/helper/tsxHelper';
import { defineComponent, PropType } from 'vue';
import './index.scss';
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import { BasicTitleProps } from '../types';

export default defineComponent({
  name: 'BasicTitle',
  props: {
    showSPan: {
      type: Boolean,
      default: true,
      required: false,
    },
    showHelper: {
      type: Boolean,
      default: false,
      required: false,
    },
    helperText: {
      type: String,
      default: '',
      required: false,
    },
    onMousedown: {
      type: Function as PropType<(e: Event) => void>,
      default: () => {}
    }
  },
  setup(props: BasicTitleProps, {slots, attrs, emit}) {

    return () => (
      <>
        <span class={ props.showSPan ? 'base-title show-span' : 'base-title' } {...attrs}
          onMousedown={(e: Event) => emit('mousedown', e)}
        >
          {getSlot(slots, 'default')}
          {
            props.showHelper ?
            <a-tooltip placement="right" title={props.helperText}>
              <QuestionCircleOutlined class="base-title__help" />
            </a-tooltip>
            : null
          }
          
        </span>
      </>
    )
  }
})