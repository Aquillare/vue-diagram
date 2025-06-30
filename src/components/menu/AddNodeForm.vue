<template>
  <!-- Form to add new node -->
  <div v-if="isClickedButtonToAddNode" class="form-wrapper" id="add_node_form">
    <div v-if="true" class="q-gutter-y-md">
      <q-item-label header class="q-pa-none text-positive text-weight-bold"
        >Tipos de paso simple</q-item-label
      >
      <button type="button" class="simple-node-button bg-white" @click="handleAddNode('step')">
        <q-icon
          class="custom-node-icon transform bg-green-1 text-positive"
          name="library_books"
          size="32px"
        />
        <span>{{ props.data?.labels?.simple_node }}</span>
      </button>
    </div>

    <div v-if="true" class="q-gutter-y-md">
      <q-item-label header class="q-pa-none text-amber text-weight-bold"
        >Tipos de paso branch</q-item-label
      >
      <button class="simple-node-button bg-white" @click="handleAddNode('branch')">
        <q-icon
          class="custom-node-icon transform bg-amber-1 text-amber"
          name="alt_route"
          size="32px"
        />
        <span>{{ props.data?.labels?.branch_node }}</span>
      </button>
    </div>

    <div v-if="showOtherStepButton" class="q-gutter-y-md">
      <q-item-label header class="q-pa-none text-brown text-weight-bold"
        >Otros tipos de paso</q-item-label
      >
      <button class="simple-node-button bg-white" @click="handleAddNode('other')">
        <q-icon class="custom-node-icon bg-brown-1 text-brown" name="moving" size="32px" />
        <span>{{ props.data?.labels?.other_node }}</span>
      </button>
    </div>
  </div>

  <!-- Form to edit Simple step node -->

  <div v-if="isClickedButtonToEditSimpleStep" class="form-wrapper" id="edit_simple_step_form">
    <div v-if="true" class="q-gutter-y-md">
      <div class="title-section">
        <q-icon class="custom-node-icon transform text-positive" name="library_books" size="24px" />
        <q-item-label header class="q-pa-none text-weight-bold">Simple</q-item-label>
      </div>

      <q-input outlined v-model.trim="simpleStepName" label="nombre" class="custom-input" />

      <div class="actions-buttons-section">
        <q-btn size="sm" flat color="white" text-color="red" @click="handleDeleteNode()"
          >Eliminar</q-btn
        >
        <q-btn size="sm" flat color="white" text-color="black" @click="handleCancelEdit()"
          >Cancelar</q-btn
        >
        <q-btn
          size="sm"
          color="dark"
          text-color="white"
          @click="handleEditStepNameNode(simpleStepName)"
          >Guardar</q-btn
        >
      </div>
    </div>
  </div>

  <!-- Form to edit branch node -->
  <div v-if="isClickedButtonToEditBranch" class="form-wrapper" id="edit_simple_step_form">
    <div v-if="true" class="q-gutter-y-md">
      <div class="title-section">
        <q-icon class="custom-node-icon transform text-amber" name="alt_route" size="24px" />
        <q-item-label header class="q-pa-none text-weight-bold">Branch</q-item-label>
      </div>

      <q-input
        outlined
        v-model.trim="branchName"
        label="nombre del paso branch"
        class="custom-input"
      />
      <q-input
        outlined
        v-model.trim="subBranchOneName"
        label="nombre de la branch 1"
        class="custom-input"
      />
      <q-input
        outlined
        v-model.trim="subBranchTwoName"
        label="nombre de la branch 2"
        class="custom-input"
      />

      <div class="actions-buttons-section">
        <q-btn size="sm" flat color="white" text-color="red" @click="handleDeleteNode()"
          >Eliminar</q-btn
        >
        <q-btn size="sm" flat color="white" text-color="black" @click="handleCancelEdit()"
          >Cancelar</q-btn
        >
        <q-btn
          size="sm"
          color="dark"
          text-color="white"
          @click="
            handleEditBranchNameNode({
              newBranchName: branchName,
              newSubBranchOneName: subBranchOneName,
              newSubBranchTwoName: subBranchTwoName,
            })
          "
          >Guardar</q-btn
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormFunctions } from './useFormFunctions';

const props = defineProps<{
  data: { labels?: { simple_node?: string; branch_node?: string; other_node?: string } };
  toggleDrawer?: ((string?: 'open' | 'close') => void) | undefined;
}>();

const {
  showOtherStepButton,
  handleAddNode,
  isClickedButtonToAddNode,
  isClickedButtonToEditSimpleStep,
  isClickedButtonToEditBranch,
  handleEditStepNameNode,
  handleCancelEdit,
  handleEditBranchNameNode,
  simpleStepName,
  branchNames,
  handleDeleteNode,
  closeSide,
} = useFormFunctions();

if (closeSide.value) {
  if (props.toggleDrawer) props.toggleDrawer('close');
}

const { branchName, subBranchOneName, subBranchTwoName } = branchNames;
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
  cursor: pointer;
}

.custom-node span {
  color: grey;
  font-weight: bold;
  max-height: 40px;
  overflow-y: auto;
}

.custom-node-icon {
  padding: 8px;
  border-radius: 6px;
}

.transform {
  transform: rotate(3.142rad);
}

.title-section {
  width: 100%;
  display: flex;
  justify-content: start;
  gap: 10px;
  align-items: center;
}

.custom-input {
  height: 50px;
  max-height: 50px;
  padding: 0px;
}

.actions-buttons-section {
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: end;
  align-items: center;
}
</style>
