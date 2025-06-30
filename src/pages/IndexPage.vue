<template>
  <div style="height: 100vh">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      class="vue-flow-basic-example bg-blue-grey-1"
      :default-viewport="{ zoom: 1, x: 0, y: 0 }"
      :default-zoom="0.2"
      :min-zoom="0.2"
      :max-zoom="4"
      :nodes-draggable="nodesDraggable"
      :zoom-on-double-click="false"
      id="flowId"
    >
      <Background :size="1.8" patternColor="#81818a" />

      <MiniMap />

      <Controls position="top-left" :style="{ display: 'flex' }" />

      <template #node-custom="nodeProps">
        <SpecialNode v-bind="nodeProps" />
      </template>

      <template #node-start="nodeProps">
        <StartNode v-bind="nodeProps" :toggleDrawer="toggleRightDrawer" />
      </template>

      <template #node-simpleStep="nodeProps">
        <SimpleStepNode v-bind="nodeProps" :toggleDrawer="toggleRightDrawer" />
      </template>

      <template #node-branch="nodeProps">
        <BranchNode v-bind="nodeProps" :toggleDrawer="toggleRightDrawer" />
      </template>

      <template #node-subBranch="nodeProps">
        <SubBranchNode v-bind="nodeProps" :toggleDrawer="toggleRightDrawer" />
      </template>

      <template #node-plusCircle="nodeProps">
        <PlusCircleNode v-bind="nodeProps" :toggleDrawer="toggleRightDrawer" />
      </template>

      <template #node-end="nodeProps">
        <EndNode v-bind="nodeProps" :toggleDrawer="toggleRightDrawer" />
      </template>

      <template #node-goTo="nodeProps">
        <GoToNode v-bind="nodeProps" :toggleDrawer="toggleRightDrawer" />
      </template>

      <template #edge-custom="edgeProps">
        <SpecialEdge v-bind="edgeProps" />
      </template>

      <CreditsCard />
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';
import type { Node, Edge } from '@vue-flow/core';
import { MarkerType, useVueFlow, VueFlow } from '@vue-flow/core';
import { Background } from '@vue-flow/background';
import { Controls } from '@vue-flow/controls';
import { MiniMap } from '@vue-flow/minimap';

// import default controls styles
import '@vue-flow/controls/dist/style.css';

// import default minimap styles
import '@vue-flow/minimap/dist/style.css';

import SpecialNode from '../components/SpecialNode.vue';
import SpecialEdge from '../components/SpecialEdge.vue';
import PlusCircleNode from '../components/PlusCirlcleNode.vue';
import EndNode from 'src/components/EndNode.vue';
import StartNode from 'src/components/StartNode.vue';
import GoToNode from 'src/components/GoToNode.vue';
import SimpleStepNode from 'src/components/SimpleStepNode.vue';
import BranchNode from 'src/components/BranchNode.vue';
import SubBranchNode from 'src/components/SubBranchNode.vue';
import CreditsCard from 'src/components/CreditsCard.vue';
import { useFlowStore } from 'src/stores/flow-store';
import { useFormFunctions } from 'src/components/menu/useFormFunctions';

const flowStore = useFlowStore();

const { handleConectionNode } = useFormFunctions();
const nodesDraggable = ref(true);

const toggleRightDrawer = inject<(() => void) | undefined>('toggleRightDrawerKey');

const nodes = ref<Node[]>([
  {
    id: 'start',
    type: 'start',
    position: { x: 660, y: 50 },
    data: { label: 'Inicio' },
  },

  {
    id: 'plus-node-1',
    type: 'plusCircle',
    position: { x: 695, y: 120 },
    data: { label: '+' },
  },

  {
    id: 'endOne-1',
    type: 'end',
    position: { x: 672, y: 180 },
    data: { label: 'Fin' },
  },
]);

const edges = ref<Edge[]>([
  {
    id: 'start->plus-node-1',
    source: 'start',
    target: 'plus-node-1',
  },

  {
    id: 'plus-node-1>endOne-1',
    source: 'plus-node-1',
    target: 'endOne-1',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'grey',
      strokeWidth: 4,
    },
  },
]);

const { onNodeClick, getConnectedEdges, findNode /**, onPaneClick**/ } = useVueFlow('flowId');

onNodeClick(({ node }) => {
  const connectedEdges = getConnectedEdges(node.id);

  let sourceNode: Node | null = null;

  const targetNodes: Node[] = [];

  connectedEdges.forEach((edge) => {
    if (edge.target === node.id) {
      const foundSourceNode = findNode(edge.source);
      if (foundSourceNode) {
        sourceNode = foundSourceNode;
      }
    }

    if (edge.source === node.id) {
      const targetNode = findNode(edge.target);
      if (targetNode) {
        targetNodes.push(targetNode);
      }
    }

    if (flowStore.isAwaitingConnection) {
      handleConectionNode(node);
    }
  });

  flowStore.setClickedNode(node, sourceNode, targetNodes);

  console.log(
    'Node clicked and saved in Pinia:',
    node.id,
    'sourceNode',
    sourceNode,
    'targetNodes',
    targetNodes,
  );
});

// onPaneClick(() => {
//   flowStore.clearClickedNode();
//   console.log('Canvas clicked, selection cleared in Pinia.');
// });
</script>
