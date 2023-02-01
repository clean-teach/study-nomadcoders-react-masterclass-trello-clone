import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toDoBoardState } from '../atoms/atoms';
import { IBoard } from '../types/types';

interface IProps {
  currentBoard: IBoard;
  handleToggleEditToBoardTitle: () => void;
}

function EditBoardTitle({
  handleToggleEditToBoardTitle,
  currentBoard,
}: IProps) {
  const [input, setInput] = useState(currentBoard.title);
  const setTodoBoards = useSetRecoilState(toDoBoardState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const handleEditBoardTitle = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const boardCopy = {
      ...currentBoard,
      title: input,
    };
    setTodoBoards((oldBoards) => {
      const boardsCopy = oldBoards.boards.map((board) =>
        board.id === currentBoard.id ? boardCopy : board,
      );
      return {
        boards: boardsCopy,
      };
    });
    handleToggleEditToBoardTitle();
  };

  return (
    <form onSubmit={handleEditBoardTitle}>
      <input type="text" value={input} onChange={handleChange} />
      <button type="submit">수정</button>
      <button type="button" onClick={handleToggleEditToBoardTitle}>
        취소
      </button>
    </form>
  );
}

export default EditBoardTitle;
