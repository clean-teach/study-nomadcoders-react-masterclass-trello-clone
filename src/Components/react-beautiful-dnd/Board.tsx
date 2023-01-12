import { useForm } from 'react-hook-form';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import DragabbleCard from './DragabbleCard';
import { IBoard, toDoBoardState } from '../../atoms';
import { useRecoilState } from 'recoil';

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
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

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  input {
    width: 100%;
    font-size: 16px;
    border: 0;
    background-color: white;
    width: 80%;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
  }
`;

interface IBoardProps {
  currentBoard: IBoard;
}

interface IForm {
  toDo: string;
}

function Board({ currentBoard }: IBoardProps) {
  const [toDoBoards, setToDoBoards] = useRecoilState(toDoBoardState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const handleCreateTodo = ({ toDo }: IForm) => {
    const { boards } = toDoBoards;
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    const currentBoardOldToDo = boards.find(
      (board) => board.id === currentBoard.id,
    )?.todos;
    if (!currentBoardOldToDo) {
      console.log('등록된 보드가 없습니다.');
      return;
    }
    console.log(currentBoard);
    console.log(currentBoardOldToDo);
    setToDoBoards((oldBoards) => {
      return {
        boards: [
          ...oldBoards.boards,
          {
            id: currentBoard.id,
            title: currentBoard.title,
            todos: [...currentBoardOldToDo, newToDo],
          },
        ],
      };
    });
    setValue('toDo', '');
  };

  return (
    <Wrapper>
      <Title>{currentBoard.title}</Title>
      <Form onSubmit={handleSubmit(handleCreateTodo)}>
        <input
          {...register('toDo', { required: true })}
          type="text"
          placeholder={`Add task on ${currentBoard.title}`}
        />
      </Form>
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
