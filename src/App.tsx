import styled from 'styled-components';
import PracticeSelector from './practiceSelector/components/PracticeSelector';
import ReactBeautifulDndArea from './reactBeautifulDnd/components/ReactBeautifulDndArea';

const Wrapper = styled.div`
  & > div {
    padding: 2rem;
  }
  & > div + div {
    border-top: 1px solid #cccccc;
  }
  h2 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    padding: 1rem 0 2rem;
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
