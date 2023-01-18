import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IBoard, toDoBoardState } from '../atoms/atoms';

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? '#e4f2ff' : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? '0px 2px 5px rgba(0, 0, 0, 0.05)' : 'none'};
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
  currentBoard: IBoard;
}

function DragabbleCard({
  toDoId,
  toDoText,
  index,
  currentBoard,
}: IDragabbleCardProps) {
  const setTodoBoard = useSetRecoilState(toDoBoardState);
  const handleDelete = () => {
    if (window.confirm('정말 삭제 하시겠습니까?')) {
      setTodoBoard((oldTodos) => {
        const newTodos = currentBoard.todos.filter(
          (todo) => todo.id !== toDoId,
        );
        const newBoards = oldTodos.boards.map((board) =>
          board.id === currentBoard.id
            ? {
                id: currentBoard.id,
                title: currentBoard.title,
                todos: newTodos,
              }
            : board,
        );
        return {
          boards: newBoards,
        };
      });
    }
  };

  return (
    <Draggable draggableId={toDoId + ''} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
          <button onClick={handleDelete}>❌</button>
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
