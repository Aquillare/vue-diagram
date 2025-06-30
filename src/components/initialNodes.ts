import {
  type Edge,
  type GraphEdge,
  type GraphNode,
  MarkerType,
  type RemoveEdges,
  type RemoveNodes,
} from '@vue-flow/core';
import { type Ref } from 'vue';

export const initial_nodes = [
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
    id: 'end-1',
    type: 'end',
    position: { x: 672, y: 180 },
    data: { label: 'Fin' },
  },
];

export const initial_edges = [
  {
    id: 'start->plus-node-1',
    source: 'start',
    target: 'plus-node-1',
  },

  {
    id: 'plus-node-1>end-1',
    source: 'plus-node-1',
    target: 'end-1',
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: 'grey',
      strokeWidth: 4,
    },
  },
];

export const toMoveNode = (
  id: string,
  nodes: Ref<GraphNode<string>[], GraphNode<string>[]>,
  newX: number,
  newY: number,
) => {
  const nodeToUpdate = nodes.value.find((node) => node.id === id);

  if (nodeToUpdate) {
    nodeToUpdate.position = { x: newX, y: newY };
  }
};

export const updateEdge = (
  id: string,
  edges: Ref<GraphEdge[], GraphEdge[]>,
  newProperties: Edge,
) => {
  const edgeToUpdate = edges.value.find((edge) => edge.id === id);

  if (edgeToUpdate) {
    Object.assign(edgeToUpdate, newProperties);
  }
};

export const removeNodeAndDescendants = (
  startNodeId: string,
  edges: Ref<GraphEdge[], GraphEdge[]>,
  removeEdges: RemoveEdges,
  removeNodes: RemoveNodes,
) => {
  const nodesToDeleteIds = new Set<string>();
  const edgesToDeleteIds = new Set<string>();
  const queue: string[] = [startNodeId];

  let head = 0;
  while (head < queue.length) {
    const currentId = queue[head++]; // Get the next node in the queue

    if (currentId && nodesToDeleteIds.has(currentId)) continue;

    if (currentId) nodesToDeleteIds.add(currentId); // Add the node to the deletion list

    const outgoingEdges = edges.value.filter((edge) => edge.source === currentId);
    outgoingEdges.forEach((edge) => {
      edgesToDeleteIds.add(edge.id); // Añadir la arista a la lista de eliminación
      // Añadir el nodo destino a la cola para seguir buscando descendientes
      queue.push(edge.target);
    });

    // También encontrar aristas entrantes a este nodo (si se eliminan, deben borrarse)
    const incomingEdges = edges.value.filter((edge) => edge.target === currentId);
    incomingEdges.forEach((edge) => {
      edgesToDeleteIds.add(edge.id);
    });
  }

  // Convertir Sets a arrays para los métodos de Vue Flow
  const finalNodesToDelete = Array.from(nodesToDeleteIds);
  const finalEdgesToDelete = Array.from(edgesToDeleteIds);

  // 2. Ejecutar la eliminación con los métodos de Vue Flow
  // Primero eliminamos las aristas para evitar errores de referencias rotas
  removeEdges(finalEdgesToDelete);
  // Luego eliminamos los nodos
  removeNodes(finalNodesToDelete);
};
