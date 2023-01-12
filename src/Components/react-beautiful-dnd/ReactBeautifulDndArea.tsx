import React from 'react';
import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { toDoBoardState } from '../../atoms';
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
  height: 100vh;
  gap: 10px;
`;

const Boards = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

function ReactBeautifulDndArea() {
  const [toDoBoards, setToDoBoards] = useRecoilState(toDoBoardState);
  const onDragEnd = (info: DropResult) => {
    // console.log(info);
    const { source, destination } = info;

    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setToDoBoards((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
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
