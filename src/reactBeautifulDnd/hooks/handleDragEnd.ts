import { DropResult } from 'react-beautiful-dnd';
import { SetterOrUpdater } from 'recoil';
import { IBoards } from '../types/types';

interface IProps {
  toDoBoards: IBoards;
  setToDoBoards: SetterOrUpdater<IBoards>;
}

const handleDragEnd = (
  info: DropResult,
  { toDoBoards, setToDoBoards }: IProps,
) => {
  // console.log(info);
  const { source, destination } = info;

  console.log(source);
  console.log(destination);

  if (!destination) return;

  if (source.droppableId === 'allBoards') {
    const boardsCopy = [...toDoBoards.boards];
    const teskObj = boardsCopy[source.index];
    boardsCopy.splice(source.index, 1);
    boardsCopy.splice(destination.index, 0, teskObj);

    setToDoBoards({ boards: boardsCopy });
  } else {
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      const currentBoard = toDoBoards.boards.find(
        (board) => board.title === destination?.droppableId,
      );
      const currentTodos = currentBoard?.todos;
      if (currentTodos) {
        const todosCopy = [...currentTodos];
        const teskObj = todosCopy[source.index];
        todosCopy.splice(source.index, 1);
        todosCopy.splice(destination.index, 0, teskObj);
        const boardCopy = {
          id: currentBoard.id,
          title: currentBoard.title,
          todos: todosCopy,
        };
        const boardsCopy = toDoBoards.boards.map((board) =>
          board.id === currentBoard.id ? boardCopy : board,
        );

        setToDoBoards({
          boards: boardsCopy,
        });
      }
    }

    if (destination?.droppableId !== source.droppableId) {
      // cross board movement
      const sourceBoard = toDoBoards.boards.find(
        (board) => board.title === source.droppableId,
      );
      const destinationBoard = toDoBoards.boards.find(
        (board) => board.title === destination?.droppableId,
      );
      const sourceTodos = sourceBoard?.todos;
      const destinationTodos = destinationBoard?.todos;
      if (sourceTodos && destinationTodos) {
        const sourceTodosCopy = [...sourceTodos];
        const teskObj = sourceTodosCopy[source.index];
        const destinationTodosCopy = [...destinationTodos];
        sourceTodosCopy.splice(source.index, 1);
        destinationTodosCopy.splice(destination.index, 0, teskObj);
        const sourceBoardCopy = {
          id: sourceBoard.id,
          title: sourceBoard.title,
          todos: sourceTodosCopy,
        };
        const destinationBoardCopy = {
          id: destinationBoard.id,
          title: destinationBoard.title,
          todos: destinationTodosCopy,
        };
        const boardsCopy = toDoBoards.boards
          .map((board) =>
            board.id === sourceBoard.id ? sourceBoardCopy : board,
          )
          .map((board) =>
            board.id === destinationBoard.id ? destinationBoardCopy : board,
          );

        setToDoBoards({
          boards: boardsCopy,
        });
      }
    }
  }
};

export default handleDragEnd;
