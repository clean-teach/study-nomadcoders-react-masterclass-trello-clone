import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { toDoBoardState } from '../atoms/atoms';
import Board from './Board';
import CreateBoardFrom from './CreateBoardFrom';
import DeleteCardArea from './DeleteCardArea';
import handleDragEnd from '../hooks/handleDragEnd';
import { IAreaProps } from '../types/types';

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
    width: calc(50% - 5px);
  }
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? '#dfe6e9'
      : props.isDraggingFromThis
      ? '#b2bec3'
      : 'transparent'};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
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
          <Droppable droppableId={'allBoards'}>
            {(magic, info) => (
              <Area
                isDraggingOver={info.isDraggingOver}
                isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                <Boards>
                  {toDoBoards.boards.map((board, index) => (
                    <Board key={board.id} currentBoard={board} index={index} />
                  ))}
                </Boards>
                <DeleteCardArea />
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default ReactBeautifulDndArea;
