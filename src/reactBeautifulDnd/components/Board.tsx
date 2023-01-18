import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragabbleCard from './DragabbleCard';
import { IBoard, toDoBoardState } from '../atoms/atoms';
import CreateCardForm from './CreateCardForm';
import { useSetRecoilState } from 'recoil';

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

interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}

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
}

function Board({ currentBoard }: IBoardProps) {
  const setTodoBoards = useSetRecoilState(toDoBoardState);
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

  return (
    <Wrapper>
      <Title>{currentBoard.title}</Title>
      <ButtonDelete onClick={handleDeleteBoard}>❌</ButtonDelete>
      <CreateCardForm currentBoard={currentBoard} />
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
  );
}

export default Board;
