import { MarkerType, useVueFlow, type Node } from '@vue-flow/core';
import { useFlowStore } from 'src/stores/flow-store';
import { computed, inject, ref } from 'vue';
import { removeNodeAndDescendants } from '../initialNodes';

export const useFormFunctions = () => {
  const toggleDrawer = inject<(() => void) | undefined>('toggleRightDrawerKey');

  const flowStore = useFlowStore();

  const {
    nodes,
    addNodes,
    addEdges,
    removeNodes,
    findNode,
    edges,
    removeEdges /** ,  toObject, fromObject*/,
  } = useVueFlow('flowId');

  const nodeCount = computed(() => nodes.value.length);

  const showOtherStepButton = computed(() => nodeCount.value >= 4);

  const isClickedButtonToAddNode = computed(() => flowStore.clickedNode?.type === 'plusCircle');
  const isClickedButtonToEditSimpleStep = computed(
    () => flowStore.clickedNode?.type === 'simpleStep',
  );
  const isClickedButtonToEditBranch = computed(() => flowStore.clickedNode?.type === 'branch');

  const closeSide = computed(
    () =>
      !isClickedButtonToAddNode.value &&
      !isClickedButtonToEditSimpleStep.value &&
      !isClickedButtonToEditBranch.value,
  );

  //Values to form
  const simpleStepName = ref('');
  const branchNames = {
    branchName: ref(''),
    subBranchOneName: ref(''),
    subBranchTwoName: ref(''),
  };

  const handleAddNode = (nodeType: 'step' | 'branch' | 'other') => {
    const id = nodeCount.value + 1;

    const clickedNode = flowStore.clickedNode;
    const sourceClickedNode = flowStore.sourceNodeOfClicked;
    // const firstTargetClickedNode = flowStore.targetNodesOfClicked[0];

    console.log(flowStore.clickedNode?.id, 'pinia');

    if (clickedNode) {
      let newSimpleNode: Node | null = null;
      let newPlusNodeOne: Node | null = null;
      let newPlusNodeTwo: Node | null = null;
      let newBranchNode: Node | null = null;
      let newSubBranchNodeOne: Node | null = null;
      let newSubBranchNodeTwo: Node | null = null;
      let newEndNodeOne: Node | null = null;
      let newEndNodeTwo: Node | null = null;
      let newGoToNode: Node | null = null;

      if (nodeType === 'step') {
        newSimpleNode = {
          id: `step-node-${id}`,
          type: 'simpleStep',
          data: { label: 'Paso simple' },
          position: {
            x: (clickedNode?.position.x || 0) - 125,
            y: (clickedNode?.position.y || 0) + 70,
          },
        };

        newPlusNodeOne = {
          id: `plusOne-node-${id}`,
          type: 'plusCircle',
          data: { label: '+' },
          position: {
            x: clickedNode?.position.x || 0,
            y: (newSimpleNode?.position.y || 0) + 70,
          },
        };

        const oldEndNodeOne = nodes.value.find(
          (node) => node.id === `endOne-${clickedNode.id.split('-')[2]}`,
        );

        const oldEndNodeTwo = nodes.value.find(
          (node) => node.id === `endTwo-${clickedNode.id.split('-')[2]}`,
        );

        if (oldEndNodeOne || oldEndNodeTwo) {
          if (
            ['One', 'step', 'start'].some((substring) => sourceClickedNode?.id.includes(substring))
          ) {
            if (oldEndNodeOne) {
              removeNodes([oldEndNodeOne]);
            }
          } else {
            if (oldEndNodeTwo) {
              removeNodes([oldEndNodeTwo]);
            }
          }

          newEndNodeOne = {
            id: `endOne-${id}`,
            type: 'end',
            data: { label: 'fin' },
            position: {
              x: (clickedNode?.position.x || 0) - 22,
              y: (newPlusNodeOne?.position.y || 0) + 70,
            },
          };

          addNodes([newSimpleNode, newPlusNodeOne, newEndNodeOne]);
        }

        //Edges

        const newPlusEdge = {
          id: `${clickedNode?.id}->${newSimpleNode.id}`,
          source: clickedNode?.id,
          target: newSimpleNode.id,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: 'grey',
            strokeWidth: 4,
          },
        };

        const newSimpleEdge = {
          id: `b${newSimpleNode.id}->${newPlusNodeOne.id}`,
          source: newSimpleNode.id,
          target: newPlusNodeOne.id,
          sourceHandle: 'b',
        };

        const newFormPlusToEndEdge = {
          id: `${newPlusNodeOne.id}->endOne-${id}`,
          source: newPlusNodeOne.id,
          target: `endOne-${id}`,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: 'grey',
            strokeWidth: 4,
          },
        };

        addEdges([newSimpleEdge, newPlusEdge, newFormPlusToEndEdge]);
      }

      if (nodeType === 'branch') {
        newBranchNode = {
          id: `branch-node-${id}`,
          type: 'branch',
          data: { label: 'Nombre de paso branch' },
          position: {
            x: (clickedNode?.position.x || 0) - 125,
            y: (clickedNode?.position.y || 0) + 70,
          },
        };

        newSubBranchNodeOne = {
          id: `subBranchOne-node-${id}`,
          type: 'subBranch',
          data: { label: 'Nombre de branch 1' },
          position: {
            x: (newBranchNode?.position.x || 0) - 150,
            y: (newBranchNode?.position.y || 0) + 100,
          },
        };

        newSubBranchNodeTwo = {
          id: `subBranchTwo-node-${id}`,
          type: 'subBranch',
          data: { label: 'Nombre de branch 2' },
          position: {
            x: (newBranchNode?.position.x || 0) + 150,
            y: (newBranchNode?.position.y || 0) + 100,
          },
        };

        newPlusNodeOne = {
          id: `plusOne-node-${id}`,
          type: 'plusCircle',
          data: { label: '+' },
          position: {
            x: (newSubBranchNodeOne?.position.x || 0) + 125,
            y: (newSubBranchNodeOne?.position.y || 0) + 70,
          },
        };

        newPlusNodeTwo = {
          id: `plusTwo-node-${id}`,
          type: 'plusCircle',
          data: { label: '+' },
          position: {
            x: (newSubBranchNodeTwo?.position.x || 0) + 125,
            y: (newSubBranchNodeTwo?.position.y || 0) + 70,
          },
        };

        const oldEndNodeOne = nodes.value.find(
          (node) => node.id === `endOne-${clickedNode.id.split('-')[2]}`,
        );

        const oldEndNodeTwo = nodes.value.find(
          (node) => node.id === `endTwo-${clickedNode.id.split('-')[2]}`,
        );

        if (oldEndNodeOne || oldEndNodeTwo) {
          if (oldEndNodeOne !== undefined && oldEndNodeOne !== null) {
            removeNodes([oldEndNodeOne]);
          }
          if (oldEndNodeTwo !== undefined && oldEndNodeTwo !== null) {
            removeNodes([oldEndNodeTwo]);
          }

          newEndNodeOne = {
            id: `endOne-${id}`,
            type: 'end',
            data: { label: 'fin' },
            position: {
              x: (newPlusNodeOne?.position.x || 0) - 22,
              y: (newPlusNodeOne?.position.y || 0) + 60,
            },
          };

          newEndNodeTwo = {
            id: `endTwo-${id}`,
            type: 'end',
            data: { label: 'fin' },
            position: {
              x: (newPlusNodeTwo?.position.x || 0) - 22,
              y: (newPlusNodeTwo?.position.y || 0) + 60,
            },
          };

          addNodes([
            newBranchNode,
            newSubBranchNodeOne,
            newSubBranchNodeTwo,
            newPlusNodeOne,
            newPlusNodeTwo,
            newEndNodeOne,
            newEndNodeTwo,
          ]);
        }
        //Edges

        const newPlusToBranchEdge = {
          id: `${clickedNode?.id}->${newBranchNode.id}`,
          source: clickedNode?.id,
          target: newBranchNode.id,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: 'grey',
            strokeWidth: 4,
          },
        };

        const newBranchToSubBranchOneEdge = {
          id: `b${newBranchNode.id}->${newSubBranchNodeOne.id}`,
          source: newBranchNode.id,
          target: newSubBranchNodeOne.id,
          sourceHandle: 'b',
          type: 'step',
        };

        const newBranchToSubBranchTwoEdge = {
          id: `b${newBranchNode.id}->${newSubBranchNodeTwo.id}`,
          source: newBranchNode.id,
          target: newSubBranchNodeTwo.id,
          sourceHandle: 'b',
          type: 'step',
        };

        const newSubBranchToPlusOneEdge = {
          id: `b${newSubBranchNodeOne.id}->${newPlusNodeOne.id}`,
          source: newSubBranchNodeOne.id,
          target: newPlusNodeOne.id,
          sourceHandle: 'b',
        };

        const newSubBranchToPlusTwoEdge = {
          id: `b${newSubBranchNodeTwo.id}->${newPlusNodeTwo.id}`,
          source: newSubBranchNodeTwo.id,
          target: newPlusNodeTwo.id,
          sourceHandle: 'b',
        };

        const newPlusOneToEndOneEdge = {
          id: `${newPlusNodeOne.id}->endOne-${id}`,
          source: newPlusNodeOne.id,
          target: `endOne-${id}`,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: 'grey',
            strokeWidth: 4,
          },
        };

        const newPlusTwoToEndTwoEdge = {
          id: `${newPlusNodeTwo.id}->endTwo-${id}`,
          source: newPlusNodeTwo.id,
          target: `endTwo-${id}`,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: 'grey',
            strokeWidth: 4,
          },
        };

        addEdges([
          newPlusToBranchEdge,
          newBranchToSubBranchOneEdge,
          newBranchToSubBranchTwoEdge,
          newSubBranchToPlusOneEdge,
          newSubBranchToPlusTwoEdge,
          newPlusOneToEndOneEdge,
          newPlusTwoToEndTwoEdge,
        ]);
      }

      if (nodeType === 'other') {
        newGoToNode = {
          id: `goTo-node-${id}`,
          type: 'goTo',
          data: { label: '' },
          position: {
            x: (clickedNode?.position.x || 0) - 12,
            y: (clickedNode?.position.y || 0) + 56,
          },
        };

        const oldEndNodeOne = nodes.value.find(
          (node) => node.id === `endOne-${clickedNode.id.split('-')[2]}`,
        );

        const oldEndNodeTwo = nodes.value.find(
          (node) => node.id === `endTwo-${clickedNode.id.split('-')[2]}`,
        );

        if (oldEndNodeOne || oldEndNodeTwo) {
          if (
            ['One', 'step', 'start'].some((substring) => sourceClickedNode?.id.includes(substring))
          ) {
            if (oldEndNodeOne) {
              removeNodes([oldEndNodeOne]);
            }
          } else {
            if (oldEndNodeTwo) {
              removeNodes([oldEndNodeTwo]);
            }
          }

          addNodes([newGoToNode]);
        }
      }

      flowStore.clearClickedNode();
      console.log('selection cleared in Pinia.');
      if (toggleDrawer) toggleDrawer();
    }
  };

  const handleEditStepNameNode = (newName: string) => {
    const nodeToUpdate = findNode(flowStore.clickedNode?.id);

    if (newName && nodeToUpdate) {
      nodeToUpdate.data.label = newName;
      simpleStepName.value = '';
      if (toggleDrawer) toggleDrawer();
    }
  };

  const handleEditBranchNameNode = (data: {
    newBranchName: string;
    newSubBranchOneName: string;
    newSubBranchTwoName: string;
  }) => {
    const { newBranchName, newSubBranchOneName, newSubBranchTwoName } = data;

    const nodesToUpdate = {
      branchNode: findNode(flowStore.clickedNode?.id),
      subBranchOneNode: findNode(flowStore.targetNodesOfClicked[0]?.id),
      subBranchTwoNode: findNode(flowStore.targetNodesOfClicked[1]?.id),
    };

    if (nodesToUpdate.branchNode && newBranchName) {
      nodesToUpdate.branchNode.data.label = newBranchName;
      branchNames.branchName.value = '';
    }

    if (nodesToUpdate.subBranchOneNode && newSubBranchOneName) {
      nodesToUpdate.subBranchOneNode.data.label = newSubBranchOneName;
      branchNames.subBranchOneName.value = '';
    }

    if (nodesToUpdate.subBranchTwoNode && newSubBranchTwoName) {
      nodesToUpdate.subBranchTwoNode.data.label = newSubBranchTwoName;
      branchNames.subBranchTwoName.value = '';
    }

    if (toggleDrawer) toggleDrawer();
  };

  const handleCancelEdit = () => {
    if (toggleDrawer) toggleDrawer();
  };

  const handleDeleteNode = () => {
    const nodeToDelete = findNode(flowStore.clickedNode?.id);
    const sourceOfNodeToDelete = flowStore.sourceNodeOfClicked;

    if (nodeToDelete?.id && sourceOfNodeToDelete?.id) {
      removeNodeAndDescendants(nodeToDelete?.id, edges, removeEdges, removeNodes);

      const sourceOfNodeToDeleteIdNumber = parseInt(sourceOfNodeToDelete.id.split('-')[2] || '');

      const newEndNodeOne = {
        id: `endOne-${sourceOfNodeToDeleteIdNumber}`,
        type: 'end',
        data: { label: 'fin' },
        position: {
          x: (sourceOfNodeToDelete?.position.x || 0) - 22,
          y: (sourceOfNodeToDelete?.position.y || 0) + 70,
        },
      };

      addNodes([newEndNodeOne]);

      const newFormPlusToEndEdge = {
        id: `${sourceOfNodeToDelete.id}->endOne-${sourceOfNodeToDeleteIdNumber}`,
        source: sourceOfNodeToDelete.id,
        target: `endOne-${sourceOfNodeToDeleteIdNumber}`,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: 'grey',
          strokeWidth: 4,
        },
      };

      addEdges([newFormPlusToEndEdge]);

      if (toggleDrawer) toggleDrawer();
    }
  };

  return {
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
  };
};
