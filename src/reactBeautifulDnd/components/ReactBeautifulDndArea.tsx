import React from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { toDoBoardState } from '../atoms/atoms';
import Board from './Board';
import CreateBoardFrom from './CreateBoardFrom';
import DeleteCardArea from './DeleteCardArea';
import handleDragEnd from '../hooks/handleDragEnd';

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

  return (
    <>
      <DragDropContext
        onDragEnd={(info) => handleDragEnd(info, { toDoBoards, setToDoBoards })}
      >
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
