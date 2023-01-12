import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

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
  board: string;
}

function CreateBoardFrom() {
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const handleCreateBoard = ({ board }: IForm) => {
    console.log(board);
  };

  return (
    <Form onSubmit={handleSubmit(handleCreateBoard)}>
      <input
        {...register('board')}
        type="text"
        placeholder="추가 할 보드의 이름을 입력해 주세요"
      />
    </Form>
  );
}

export default CreateBoardFrom;
