<template>
  <div class="custom-node bg-positive">
    <span>{{ props.data?.label }}</span>

    <!--<Handle type="source" :position="Position.Top" :style="{ opacity: 0 }" id="a" /> -->

    <Handle type="source" :position="Position.Bottom" id="b" />
  </div>
</template>

<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core';

const props = defineProps<{
  data: { label?: string };
}>();
</script>

<style scoped>
.custom-node {
  border-radius: 8px;
  --vf-handle: green;
  --vf-connection-path: grey;
  width: 100px;
  height: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-node span {
  color: white;
  font-weight: bold;
}
</style>
