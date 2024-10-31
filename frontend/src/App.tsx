import { useState } from "react";
import "./App.css";

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <h1>Heading</h1>
      <div className="card">
        <button onClick={() => setCount((prevCount: number) => prevCount + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">This should work</p>
    </>
  );
}

export default App;
