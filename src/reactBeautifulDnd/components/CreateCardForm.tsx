import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { IBoard, toDoBoardState } from '../atoms/atoms';

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

function CreateCardForm({ currentBoard }: IBoardProps) {
  const setToDoBoards = useSetRecoilState(toDoBoardState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const handleCreateTodo = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    const newBoard = {
      ...currentBoard,
      todos: currentBoard.todos.concat(newToDo),
    };

    setToDoBoards((oldBoards) => {
      const newBoards = oldBoards.boards.map((board) =>
        board.id === currentBoard.id ? newBoard : board,
      );
      return {
        boards: newBoards,
      };
    });
    setValue('toDo', '');
  };

  return (
    <Form onSubmit={handleSubmit(handleCreateTodo)}>
      <input
        {...register('toDo', { required: true })}
        type="text"
        placeholder={`Add task on ${currentBoard.title}`}
      />
    </Form>
  );
}

export default CreateCardForm;
