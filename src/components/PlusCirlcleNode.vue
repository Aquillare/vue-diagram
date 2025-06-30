<template>
  <div class="custom-node" @click="handleRightMenu">
    <span>{{ props.data?.label }}</span>

    <!-- <Handle type="source" :position="Position.Top" :style="{ opacity: 0 }" id="a" />

    <Handle type="source" :position="Position.Bottom" :style="{ opacity: 0 }" id="b" /> -->
  </div>
</template>

<script setup lang="ts">
// import { Handle, Position } from '@vue-flow/core';

const props = defineProps<{
  data: { label?: string };
  toggleDrawer?: ((string?: 'open' | 'close') => void) | undefined;
}>();

const handleRightMenu = () => {
  if (props?.toggleDrawer !== undefined) props.toggleDrawer();
};
</script>

<style scoped>
.custom-node {
  background: white;
  border: 3px solid grey;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-node span {
  color: grey;
  font-weight: bold;
  font-size: 20px;
}
</style>
