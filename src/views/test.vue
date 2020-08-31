<template>
<div>
  <test content="1234" />
</div>
</template>

<script lang="ts">
import {
  defineComponent
} from 'vue'
import test from '@/components/test'

export default defineComponent({
  components: {
    test
  }
})
</script>
