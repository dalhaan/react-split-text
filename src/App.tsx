import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

import { SplitText } from './SplitText';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <SplitText by="WORD" as="h1" animate>
        <SplitText as="i">React + GSAP</SplitText> is a good combo
        <br />
        <br />
        <SplitText as="span">
          Hey this is a really long line. It just keeps on going. and ooooo
        </SplitText>
      </SplitText>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
