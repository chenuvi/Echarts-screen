import React, { useState, useEffect } from "react";
import { getVisualization } from "@/api/visualization.ts";

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  const [data, setData] = useState(null);
  console.log("🚀 ~ file: App.tsx:8 ~ data:", data);
  const loadData = async () => {
    const res: any = await getVisualization();
    setData(res);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className=" text-red-600 text-4xl">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
};

export default App;
