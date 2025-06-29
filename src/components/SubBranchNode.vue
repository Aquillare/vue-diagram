<template>
  <div class="custom-node bg-white">
    <q-icon class="custom-node-icon bg-amber-1" name="alt_route" size="24px" />

    <span>{{ props.data?.label }}</span>

    <Handle type="source" :position="Position.Top" :style="{ opacity: 0 }" id="a" />

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
  border: 2px solid var(--q-warning);
  --vf-handle: gold;
  --vf-connection-path: grey;
  width: 280px;
  height: 46px;
  display: flex;
  gap: 10px;
  justify-content: start;
  padding: 8px;
  align-items: center;
}

.custom-node span {
  color: grey;
  font-weight: bold;
  max-height: 40px;
  overflow-y: auto;
}

.custom-node-icon {
  color: var(--q-warning);
  padding: 4px;
  border-radius: 6px;
  transform: rotate(3.142rad);
  opacity: 0;
}
</style>
