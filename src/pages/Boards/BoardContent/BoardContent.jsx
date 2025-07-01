import React, { useCallback, useEffect, useRef, useState } from 'react';
import ListColumns from "./ListColumns/ListColumns";
import { Box } from '@mui/material';
import { generatePlaceholderCard, sortCardsByOrder } from '~/ultis/sorts';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Column from './ListColumns/Column/Column';
import Cards from './ListColumns/Column/ListCard/Card/Cards';
import { cloneDeep, isEmpty, last } from 'lodash';
import { use } from 'react';

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BoardContent({ board }) {
  const [orderedColumns, setOrderedColumns] = useState([]);
  const [activeDragItemID, setActiveDragItemID] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDragStart, setOldColumnWhenDragStart] = useState(null);
  //điểm va chạm cuối cùng
  const lastOverId = useRef(null);
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 5 } });
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } });
  const sensors = useSensors(mouseSensor, touchSensor);

  const findColumnByCardId = (cardId) =>
    orderedColumns.find(column => column.cards.some(card => card._id === cardId));

  // Xử lý kéo thả card
  const moveCard = (overColumn, overId, active, over, activeDraggingCardID) => {
    setOrderedColumns(prev => {
      const overCardIndex = overColumn.cards.findIndex(card => card._id === overId);
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height / 2;
      const modifier = isBelowOverItem ? 1 : 0;
      const newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn.cards.length;
      //clone columns to avoid mutating the state directly
      const nextColumn = cloneDeep(prev);
      //la column dang keo tha (column cu khi keo)
      const nextActiveColumn = nextColumn.find(column => column._id === oldColumnWhenDragStart._id);

      const nextOverColumn = nextColumn.find(column => column._id === overColumn._id);
      if (!nextActiveColumn || !nextOverColumn) return prev;
      // Remove the card from the active column
      nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardID);
      // Update the card order IDs in the active column
      nextActiveColumn.cardOrderIds = nextActiveColumn.cards.filter(card => card._id);
      console.log("nextActiveColumn: ", nextActiveColumn);
      //them 1 card giu cho neu keo het gia tri
      if (isEmpty(nextActiveColumn.cards) || nextActiveColumn.cards.length === 0) {
        const placeholder = generatePlaceholderCard(nextActiveColumn);
        nextActiveColumn.cards = [placeholder];
        nextActiveColumn.cardOrderIds = [placeholder._id];

      }
      //update columnIds in active column
      //next over column
      nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardID);
      const rebuild_activeDraggingCardID = { ...activeDragItemData, columnId: nextOverColumn._id };
      nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardID);
      console.log("nextOverColumn truoc: ", nextOverColumn.cards);
      //xoa placeholder card neu co
      nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_Placeholder);
      nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id);
      console.log("nextOverColumn sau", nextOverColumn.cards);
      return nextColumn
    })
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardID, data: { current: activeDraggingCardData } } = active
      const { id: overId } = over
      const activeColumn = findColumnByCardId(activeDraggingCardID);
      const overColumn = findColumnByCardId(overId);
      if (!activeColumn || !overColumn) return;
      //neu keo card qua mot column khac
      if (oldColumnWhenDragStart._id !== overColumn._id) {
        moveCard(overColumn, overId, active, over, activeDraggingCardID);
      } //neu keo card trong cung mot column
      else {
        // If the card is dropped in the same column, reorder the cards
        // lay data tu oldColumnWhenDragStart 
        const oldIndex = oldColumnWhenDragStart.cards.findIndex(card => card._id === activeDragItemID);
        const newIndex = overColumn.cards.findIndex(card => card._id === overId);
        const dndCards = arrayMove(oldColumnWhenDragStart.cards, oldIndex, newIndex);
        // Update the cards in the column
        setOrderedColumns(prev => {
          //clone columns to avoid mutating the state directly
          const nextColumn = cloneDeep(prev);
          //tim column dang keo tha
          const nextActiveColumn = nextColumn.find(column => column._id === overColumn._id);
          if (!nextActiveColumn) return prev;
          //cap nhat lai cardids trong column
          nextActiveColumn.cards = dndCards;
          nextActiveColumn.cardOrderIds = dndCards.map(card => card._id);
          return nextColumn;
        });

      }
    } else if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {

      const oldIndex = orderedColumns.findIndex(column => column._id === active.id);
      const newIndex = orderedColumns.findIndex(column => column._id === over.id);
      setOrderedColumns(arrayMove(orderedColumns, oldIndex, newIndex));
    }

    setActiveDragItemData(null);
    setActiveDragItemID(null);
    setActiveDragItemType(null);
    setOldColumnWhenDragStart(null);
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveDragItemID(active?.id);
    setActiveDragItemType(active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN);
    setActiveDragItemData(active?.data?.current);
    if (active?.data?.current?.columnId) {
      setOldColumnWhenDragStart(findColumnByCardId(active.id));
    }
  };

  const handleDragOver = (event) => {

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return;
    const { active, over } = event;
    if (!active || !over) return;
    // if (active._id === over._id) return;
    const { id: activeDraggingCardID, data: { current: activeDraggingCardData } } = active
    const { id: overId } = over
    const activeColumn = findColumnByCardId(activeDraggingCardID);
    const overColumn = findColumnByCardId(overId);
    if (!activeColumn || !overColumn) return;
    if (activeColumn._id !== overColumn._id) {
      moveCard(overColumn, overId, active, over, activeDraggingCardID);
    }
  }

  useEffect(() => {
    setOrderedColumns(sortCardsByOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { transition: "transform 0.2s ease" } } }),
  };
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        // If dragging a column, use closestCorners for collision detection
        return closestCorners(args);
      }
      //tim kiếm các va chạm với con trỏ chuột
      const pointerCollisions = pointerWithin(args);
      if (!pointerCollisions?.length) {
        return
      }
      // neu không có va chạm với con trỏ chuột, sử dụng rectIntersection
      // const intersections = pointerCollisions?.length > 0 ? pointerCollisions : rectIntersection(args)
      //nếu có va chạm với con trỏ chuột, trả về các va chạm đó
      // console.log("intersections", intersections);
      let overId = getFirstCollision(pointerCollisions, "id");
      if (overId) {
        // If there are pointer collisions, return the first collision
        const intersectColumn = orderedColumns.find(column => column._id === overId);
        if (intersectColumn) {
          // console.log("overId before closestCorners", overId);
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              container => container.id !== intersectColumn._id
                && intersectColumn?.cardOrderIds?.includes(container.id)
            )
          })[0]?.id; // Use closestCorners to find the closest column
        }
        // console.log("overId after closestCorners", overId);
        lastOverId.current = overId;
        return [{ id: overId }];
      }
      //neu overId không tồn tại, sử dụng lastOverId tránh bug crash
      return lastOverId.current
        ? [{ id: lastOverId.current }]
        : []; // If no pointer collisions, return the last over ID or an empty array
    }, [activeDragItemType]
  );
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      onDragOver={handleDragOver}
      // collisionDetection={closestCorners}
      collisionDetection={collisionDetectionStrategy}
    >
      <Box
        sx={{
          padding: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? "#1976d2"
              : "#34495e",
          gap: 2,
          height: (theme) => theme.trello.heightContent,
        }}
      >
        <DragOverlay dropAnimation={dropAnimation}>
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && activeDragItemData && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && activeDragItemData && (
            <Cards card={activeDragItemData} />
          )}
        </DragOverlay>
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  );
}

export default BoardContent;