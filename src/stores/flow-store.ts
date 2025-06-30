import { defineStore, acceptHMRUpdate } from 'pinia';
import type { Node } from '@vue-flow/core';

export const useFlowStore = defineStore('flow', {
  state: () => ({
    clickedNode: null as Node | null,
    sourceNodeOfClicked: null as Node | null,
    targetNodesOfClicked: [] as Node[],
    nodeAwaitingConnection: null as Node | null,
  }),
  actions: {
    setClickedNode(node: Node | null, sourceNode: Node | null, targetNodes: Node[] = []) {
      this.clickedNode = node;
      this.sourceNodeOfClicked = sourceNode;
      this.targetNodesOfClicked = targetNodes;
    },
    clearClickedNode() {
      this.clickedNode = null;
      this.sourceNodeOfClicked = null;
      this.targetNodesOfClicked = [];
      this.nodeAwaitingConnection = null;
    },

    setNodeAwaitingConnection(node: Node | null) {
      this.nodeAwaitingConnection = node;
    },
    clearNodeAwaitingConnection() {
      this.nodeAwaitingConnection = null;
    },
  },

  getters: {
    isNodeSelected: (state) => !!state.clickedNode,
    clickedNodeLabel: (state) =>
      state.clickedNode?.data?.label || state.clickedNode?.id || 'Ninguno',
    sourceNodeLabels: (state) =>
      state.sourceNodeOfClicked?.data?.label || state.clickedNode?.id || 'Ninguno',
    targetNodeLabels: (state) =>
      state.targetNodesOfClicked.map((n) => n.data?.label || n.id).join(', '),
    isAwaitingConnection: (state) => !!state.nodeAwaitingConnection,
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFlowStore, import.meta.hot));
}
