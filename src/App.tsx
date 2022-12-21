import PracticeSelector from './Components/PracticeSelector';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
  const onDragEnd = () => {};

  return (
    <>
      <div>
        <h2>#7.1 Set Selectors</h2>
        <PracticeSelector />
      </div>
      <div>
        <h2>Drag and Drop</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="one">
            {() => (
              <ul>
                <Draggable draggableId="one" index={0}>
                  {() => <li>One</li>}
                </Draggable>
                <Draggable draggableId="two" index={1}>
                  {() => <li>Two</li>}
                </Draggable>
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
