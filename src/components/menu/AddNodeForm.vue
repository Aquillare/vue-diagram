<template>
  <div class="form-wrapper">
    <div v-if="true" class="q-gutter-y-md">
      <q-item-label header class="q-pa-none text-positive text-weight-bold"
        >Tipos de paso simple</q-item-label
      >
      <q-button class="simple-node-button bg-white">
        <q-icon
          class="custom-node-icon bg-green-1 text-positive"
          name="library_books"
          size="32px"
        />
        <span>{{ props.data?.labels?.simple_node }}</span>
      </q-button>
    </div>

    <div v-if="true" class="q-gutter-y-md">
      <q-item-label header class="q-pa-none text-amber text-weight-bold"
        >Tipos de paso branch</q-item-label
      >
      <q-button class="simple-node-button bg-white">
        <q-icon class="custom-node-icon bg-amber-1 text-amber" name="alt_route" size="32px" />
        <span>{{ props.data?.labels?.branch_node }}</span>
      </q-button>
    </div>

    <div v-if="true" class="q-gutter-y-md">
      <q-item-label header class="q-pa-none text-brown text-weight-bold"
        >Otros tipos de paso</q-item-label
      >
      <q-button class="simple-node-button bg-white">
        <q-icon class="custom-node-icon bg-brown-1 text-brown" name="alt_route" size="32px" />
        <span>{{ props.data?.labels?.other_node }}</span>
      </q-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: { labels?: { simple_node?: string; branch_node?: string; other_node?: string } };
}>();
</script>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  padding: 28px;
  gap: 20px;
}

.simple-node-button {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  width: 100%;
  height: 66px;
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
  transform: rotate(3.142rad);
  padding: 8px;
  border-radius: 6px;
}
</style>
