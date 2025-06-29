<template>
  <div style="height: 100vh">
    <VueFlow
      v-model:nodes="nodes"
      v-model:edges="edges"
      class="vue-flow-basic-example bg-blue-grey-1"
      :default-viewport="{ zoom: 1, x: 0, y: 0 }"
      :default-zoom="0.2"
      :min-zoom="0.2"
      :max-zoom="4"
      :nodes-draggable="nodesDraggable"
      :zoom-on-double-click="false"
    >
      <Background :size="1.8" patternColor="#81818a" />

      <MiniMap />

      <Controls position="top-left" :style="{ display: 'flex' }" />

      <template #node-custom="nodeProps">
        <SpecialNode v-bind="nodeProps" />
      </template>

      <template #node-start="nodeProps">
        <StartNode v-bind="nodeProps" />
      </template>

      <template #node-simpleStep="nodeProps">
        <SimpleStepNode v-bind="nodeProps" />
      </template>

      <template #node-branch="nodeProps">
        <BranchNode v-bind="nodeProps" />
      </template>

      <template #node-subBranch="nodeProps">
        <SubBranchNode v-bind="nodeProps" />
      </template>

      <template #node-plusCircle="nodeProps">
        <PlusCircleNode v-bind="nodeProps" :toggleDrawer="toggleRightDrawer" />
      </template>

      <template #node-end="nodeProps">
        <EndNode v-bind="nodeProps" />
      </template>

      <template #edge-custom="edgeProps">
        <SpecialEdge v-bind="edgeProps" />
      </template>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import type { Node, Edge } from '@vue-flow/core';
import { MarkerType, VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';

// import default controls styles
import '@vue-flow/controls/dist/style.css';

// these components are only shown as examples of how to use a custom node or edge
// you can find many examples of how to create these custom components in the examples page of the docs
import SpecialNode from '../components/SpecialNode.vue';
import SpecialEdge from '../components/SpecialEdge.vue';
import PlusCircleNode from '../components/PlusCirlcleNode.vue';
import EndNode from 'src/components/EndNode.vue';
import StartNode from 'src/components/StartNode.vue';
import SimpleStepNode from 'src/components/SimpleStepNode.vue';
import BranchNode from 'src/components/BranchNode.vue';
import SubBranchNode from 'src/components/SubBranchNode.vue';

const nodesDraggable = ref(false);

const toggleRightDrawer = inject<(() => void) | undefined>('toggleRightDrawerKey');

// these are our nodes
const nodes = ref<Node[]>([
  // an input node, specified by using `type: 'input'`
  {
    id: '1-start',
    type: 'start',
    position: { x: 660, y: 50 },
    data: { label: 'Inicio' },
  },

  {
    id: '1-plus-node',
    type: 'plusCircle',
    position: { x: 695, y: 120 },
    data: { label: '+' },
  },

  {
    id: '1-end',
    type: 'end',
    position: { x: 672, y: 180 },
    data: { label: 'Fin' },
  },
]);

// these are our edges
const edges = ref<Edge[]>([
  // default bezier edge
  // consists of an edge id, source node id and target node id
  {
    id: '1-start->1-plus-node',
    source: '1-start',
    target: '1-plus-node',
  },

  {
    id: '1-plus-node->1-end',
    source: '1-plus-node',
    target: '1-end',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'grey',
      strokeWidth: 4,
    },
  },

  // a custom edge, specified by using a custom type name
  // we choose `type: 'special'` for this example
]);
</script>
