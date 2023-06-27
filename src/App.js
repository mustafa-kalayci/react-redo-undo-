import { useState } from "react";

function App() {
  const [points, setPoints] = useState([]);
  const [data, setData] = useState([]);
  const clickHandle = (e) => {
    setPoints((points) => [
      ...points,
      {
        x: e.clientX,
        y: e.clientY,
      },
    ]);
    console.log(e.clientX, e.clientY);
    setData([]);
  };
  const undoHandle = (e) => {
    e.stopPropagation();
    const d = [...data];
    const item = d.pop();
    setPoints((points) => [...points, item]);
    setData(d);
  };
  const redoHandle = (e) => {
    e.stopPropagation();
    const data = [...points];
    const item = data.pop();
    setData((data) => [...data, item]);
    setPoints(data);
  };

  return (
    <div className="screen" onClick={clickHandle}>
      <header className="header">
        <button disabled={points.length === 0} onClick={redoHandle}>
          Undo
        </button>
        <button disabled={data.length === 0} onClick={undoHandle}>
          Redo
        </button>
      </header>
      {points.map((point, key) => {
        return (
          <div
            className="point"
            key={key}
            style={{ left: point.x, top: point.y }}
          ></div>
        );
      })}
    </div>
  );
}

export default App;
