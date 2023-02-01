import { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragabbleCard from './DragabbleCard';
import { toDoBoardState } from '../atoms/atoms';
import CreateCardForm from './CreateCardForm';
import { useSetRecoilState } from 'recoil';
import { IAreaProps, IBoard } from '../types/types';
import EditBoardTitle from './EditBoardTitle';

const Wrapper = styled.div`
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const ButtonDelete = styled.button`
  position: absolute;
  right: 1rem;
  top: 1rem;
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

interface IBoardProps {
  currentBoard: IBoard;
  index: number;
}

function Board({ currentBoard, index }: IBoardProps) {
  const setTodoBoards = useSetRecoilState(toDoBoardState);
  const [isEditableBoardTitle, setIsEditableBoardTitle] = useState(false);
  const handleDeleteBoard = () => {
    if (
      window.confirm(
        '보드를 삭제하시면, 포함된 할 일도 삭제됩니다. 정말 삭제 하시겠습니까?',
      )
    ) {
      setTodoBoards((oldBoards) => {
        const boardsCopy = oldBoards.boards.filter(
          (board) => board.id !== currentBoard.id,
        );
        return {
          boards: boardsCopy,
        };
      });
    }
  };
  const handleDeleteAllTodos = () => {
    if (
      window.confirm(
        '해당 보드 내의 모든 할 일이 삭제됩니다. 정말 삭제 하시겠습니까?',
      )
    ) {
      const boardCopy = {
        ...currentBoard,
        todos: [],
      };
      setTodoBoards((oldBoards) => {
        const boardsCopy = oldBoards.boards.map((board) =>
          board.id === currentBoard.id ? boardCopy : board,
        );
        return {
          boards: boardsCopy,
        };
      });
    }
  };
  const handleToggleEditToBoardTitle = () => {
    setIsEditableBoardTitle((current) => !current);
  };

  return (
    <Draggable draggableId={currentBoard.id + ''} index={index}>
      {(magic, snapshot) => (
        <Wrapper
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {isEditableBoardTitle ? (
            <EditBoardTitle
              currentBoard={currentBoard}
              handleToggleEditToBoardTitle={handleToggleEditToBoardTitle}
            />
          ) : (
            <>
              <Title>{currentBoard.title}</Title>
              <button title="제목 수정" onClick={handleToggleEditToBoardTitle}>
                ✏
              </button>
            </>
          )}
          <ButtonDelete title="삭제" onClick={handleDeleteBoard}>
            ❌
          </ButtonDelete>
          <CreateCardForm currentBoard={currentBoard} />
          <button onClick={handleDeleteAllTodos}>전체 삭제</button>
          <Droppable droppableId={currentBoard.title}>
            {(magic, info) => (
              <Area
                isDraggingOver={info.isDraggingOver}
                isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {currentBoard.todos.map((toDo, index) => (
                  <DragabbleCard
                    key={toDo.id}
                    index={index}
                    toDoId={toDo.id}
                    toDoText={toDo.text}
                    currentBoard={currentBoard}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default Board;
