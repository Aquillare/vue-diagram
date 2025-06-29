<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="rightDrawerOpen" side="right" bordered :width="500" :breakpoint="600">
      <AddNodeForm
        :data="{
          labels: {
            simple_node: 'Paso simple',
            branch_node: 'Paso branch',
            other_node: 'Paso ir a',
          },
        }"
      />
    </q-drawer>
    <router-view />
  </q-layout>
</template>

<script setup lang="ts">
import AddNodeForm from 'src/components/menu/AddNodeForm.vue';
import { provide, ref } from 'vue';

const rightDrawerOpen = ref(false);

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value;
}

provide('toggleRightDrawerKey', toggleRightDrawer);
</script>
