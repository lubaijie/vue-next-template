<template>
  <div>
    <test />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import test from '@/components/test'

export default defineComponent ({
  components: { test }
})
</script>