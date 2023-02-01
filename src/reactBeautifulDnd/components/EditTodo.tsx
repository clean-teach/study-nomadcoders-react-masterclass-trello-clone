import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toDoBoardState } from '../atoms/atoms';
import { IBoard } from '../types/types';

interface IProps {
  handleToggleEditMode: () => void;
  toDoText: string;
  currentBoard: IBoard;
  toDoId: number;
}

function EditTodo({
  handleToggleEditMode,
  toDoText,
  currentBoard,
  toDoId,
}: IProps) {
  const [input, setInput] = useState(toDoText);
  const setTodoBoards = useSetRecoilState(toDoBoardState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const todosCopy = currentBoard.todos.map((todo) =>
      todo.id === toDoId
        ? {
            ...todo,
            text: input,
          }
        : todo,
    );
    const boardCopy = {
      ...currentBoard,
      todos: todosCopy,
    };

    setTodoBoards((oldBoards) => {
      const boardsCopy = oldBoards.boards.map((board) =>
        board.id === currentBoard.id ? boardCopy : board,
      );
      return {
        boards: boardsCopy,
      };
    });
    handleToggleEditMode();
  };

  return (
    <form onSubmit={handleEditSubmit}>
      <input type="text" value={input} onChange={handleChange} />
      <button>수정</button>
      <button onClick={handleToggleEditMode}>취소</button>
    </form>
  );
}

export default EditTodo;
