import React, { useState, useEffect } from "react";
import { getVisualization } from "@/api/visualization.ts";
import HorizontalBar from "@/components/HorizontalBar";
import MapChart from "./components/MapChart";
import RadarBar from "./components/RadarBar";
import Relation from "./components/Relation";
import RingBar from "./components/RingBar";
import TotalData from "./components/TotalData";
import VerticalBar from "./components/VerticalBar";
import WordCloud from "./components/WordCloud";

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
  if (data) {
    return (
      <>
        <div className="bg-[url('assets/images/bg.png')] bg-cover bg-center h-screen text-white p-3 flex overflow-hidden">
          {/* <!-- left --> */}
          <div className="flex-1 mr-3 bg-opacity-50 bg-slate-800 p-3">
            {/* <!-- 横向柱状图 --> */}
            <HorizontalBar
              className="h-1/3 box-border pb-2"
              data={data.regionData}
            />
            {/* <!-- 雷达图 --> */}
            <RadarBar className="h-1/3 box-border pb-2" data={data.riskData} />
            {/* <!-- 关系图 --> */}
            <Relation className="h-1/3" data={data.relationData} />
          </div>
          {/* <!-- center --> */}
          <div className="w-1/2 mr-3 flex flex-col">
            {/* <!-- 数据总览图 --> */}
            <TotalData
              className="bg-opacity-50 bg-slate-800 p-3"
              data={data.totalData}
            />
            {/* <!-- 地图可视化 --> */}
            <MapChart
              className="bg-opacity-50 bg-slate-800 p-3 mt-3 flex-1"
              data={data.mapData}
            />
          </div>
          {/* <!-- right --> */}
          <div className="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
            {/* <!-- 竖向柱状图 --> */}
            <VerticalBar
              className="h-1/3 box-border pb-2"
              data={data.serverData}
            />
            {/* <!-- 环形图 --> */}
            <RingBar
              className="h-1/3 box-border pb-2"
              data={data.abnormalData}
            />
            {/* <!-- 文档云图 --> */}
            <WordCloud className="h-1/3" data={data.wordCloudData} />
          </div>
        </div>
      </>
    );
  }
};

export default App;
