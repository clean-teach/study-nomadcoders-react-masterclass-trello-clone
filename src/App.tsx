import styled from 'styled-components';
import PracticeSelector from './Components/PracticeSelector';
import ReactBeautifulDndArea from './Components/react-beautiful-dnd/ReactBeautifulDndArea';

const Wrapper = styled.div`
  & > div + div {
    border-top: 1px solid #cccccc;
  }
  h2 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }
`;

function App() {
  return (
    <Wrapper>
      <div>
        <h2>#7.1 Set Selectors</h2>
        <PracticeSelector />
      </div>
      <div>
        <h2>Drag and Drop</h2>
        <ReactBeautifulDndArea />
      </div>
    </Wrapper>
  );
}

export default App;
