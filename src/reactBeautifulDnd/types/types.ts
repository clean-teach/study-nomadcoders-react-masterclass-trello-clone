export interface ITodo {
  id: number;
  text: string;
}
export interface IBoard {
  id: number;
  title: string;
  todos: ITodo[];
}
export interface IBoards {
  [key: string]: IBoard[];
}

export interface IAreaProps {
  isDraggingFromThis: boolean;
  isDraggingOver: boolean;
}
