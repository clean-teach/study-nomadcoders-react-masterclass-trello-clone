import PracticeSelector from './Components/PracticeSelector';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { toDoState } from './atoms';
import Board from './Components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  width: 100%;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { draggableId, source, destination } = info;

    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination?.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoardCopy = [...allBoards[source.droppableId]];
        const destinationBoardCopy = [...allBoards[destination.droppableId]];
        sourceBoardCopy.splice(source.index, 1);
        destinationBoardCopy.splice(destination?.index, 0, draggableId);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoardCopy,
          [destination.droppableId]: destinationBoardCopy,
        };
      });
    }
  };

  return (
    <>
      <div>
        <h2>#7.1 Set Selectors</h2>
        <PracticeSelector />
      </div>
      <div>
        <h2>Drag and Drop</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <Wrapper>
            <Boards>
              {Object.keys(toDos).map((boardId) => (
                <Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
              ))}
            </Boards>
          </Wrapper>
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
