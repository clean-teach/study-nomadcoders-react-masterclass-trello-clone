import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoBoardState } from '../atoms/atoms';

const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
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

interface IForm {
  boardTitle: string;
}

function CreateBoardFrom() {
  const setTodoBoards = useSetRecoilState(toDoBoardState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const handleCreateBoard = ({ boardTitle }: IForm) => {
    const newBoard = {
      id: Date.now(),
      title: boardTitle,
      todos: [],
    };
    setTodoBoards((oldBoards) => {
      const boardsCopy = oldBoards.boards.concat(newBoard);
      return {
        boards: boardsCopy,
      };
    });
    setValue('boardTitle', '');
  };

  return (
    <Form onSubmit={handleSubmit(handleCreateBoard)}>
      <input
        {...register('boardTitle')}
        type="text"
        placeholder="추가 할 보드의 이름을 입력해 주세요"
      />
    </Form>
  );
}

export default CreateBoardFrom;
