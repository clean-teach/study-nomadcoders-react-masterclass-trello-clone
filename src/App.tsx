import PracticeSelector from './Components/PracticeSelector';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { toDoState } from './atoms';
import Board from './Components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  // const onDragEnd = (args: DropResult) => {
  //   console.log(args);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    // setToDos((oldToDos) => {
    //   const toDosCopy = [...oldToDos];
    //   // 1) Delete item on source.index
    //   toDosCopy.splice(source.index, 1);
    //   // 2) Put back the item on the destination.index
    //   toDosCopy.splice(destination?.index, 0, draggableId);
    //   return toDosCopy;
    // });
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
