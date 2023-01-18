import React from 'react';
import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { toDoBoardState } from '../atoms/atoms';
import Board from './Board';
import CreateBoardFrom from './CreateBoardFrom';
import DeleteCardArea from './DeleteCardArea';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 680px;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Boards = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  flex-wrap: wrap;
  & > * {
    flex: 40%;
  }
`;

function ReactBeautifulDndArea() {
  const [toDoBoards, setToDoBoards] = useRecoilState(toDoBoardState);
  const onDragEnd = (info: DropResult) => {
    // console.log(info);
    const { source, destination } = info;

    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      const currentBoard = toDoBoards.boards.find(
        (board) => board.title === destination?.droppableId,
      );
      const currentTodos = currentBoard?.todos;
      if (currentTodos) {
        const todosCopy = [...currentTodos];
        const teskObj = todosCopy[source.index];
        todosCopy.splice(source.index, 1);
        todosCopy.splice(destination.index, 0, teskObj);
        const boardCopy = {
          id: currentBoard.id,
          title: currentBoard.title,
          todos: todosCopy,
        };
        const boardsCopy = toDoBoards.boards.map((board) =>
          board.id === currentBoard.id ? boardCopy : board,
        );

        setToDoBoards({
          boards: boardsCopy,
        });
      }
    }
    if (destination?.droppableId !== source.droppableId) {
      // cross board movement
      setToDoBoards((allBoards) => {
        const sourceBoardCopy = [...allBoards[source.droppableId]];
        const taskObj = sourceBoardCopy[source.index];
        const destinationBoardCopy = [...allBoards[destination.droppableId]];
        sourceBoardCopy.splice(source.index, 1);
        destinationBoardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoardCopy,
          [destination.droppableId]: destinationBoardCopy,
        };
      });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <CreateBoardFrom />
          <Boards>
            {toDoBoards.boards.map((board) => (
              <Board key={board.id} currentBoard={board} />
            ))}
          </Boards>
          <DeleteCardArea />
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default ReactBeautifulDndArea;
