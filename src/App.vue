<script setup>
import HorizontalBar from "./components/HorizontalBar.vue";
import MapChart from "./components/MapChart.vue";
import RadarBar from "./components/RadarBar.vue";
import Relation from "./components/Relation.vue";
import RingBar from "./components/RingBar.vue";
import TotalData from "./components/TotalData.vue";
import VerticalBar from "./components/VerticalBar.vue";
import WordCloud from "./components/WordCloud.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

import { getVisualization } from "@/api/visualization.js";

const data = ref(null);
let timer = null;
const loadData = async () => {
  data.value = await getVisualization();
};
onMounted(() => {
  timer = setInterval(() => {
    loadData();
  }, 3000);
});

onBeforeUnmount(() => clearInterval(timer));
</script>

<template>
  <div>
    <div
      class="bg-[url('assets/images/bg.png')] bg-cover bg-center h-screen text-white p-3 flex overflow-hidden"
      v-if="data"
    >
      <!-- left -->
      <div class="flex-1 mr-3 bg-opacity-50 bg-slate-800 p-3">
        <!-- 横向柱状图 -->
        <HorizontalBar class="h-1/3 box-border pb-2" :data="data.regionData" />
        <!-- 雷达图 -->
        <RadarBar class="h-1/3 box-border pb-2" />
        <!-- 关系图 -->
        <Relation class="h-1/3" />
      </div>
      <!-- center -->
      <div class="w-1/2 mr-3 flex flex-col">
        <!-- 数据总览图 -->
        <TotalData class="bg-opacity-50 bg-slate-800 p-3" />
        <!-- 地图可视化 -->
        <MapChart class="bg-opacity-50 bg-slate-800 p-3 mt-3 flex-1" />
      </div>
      <!-- right -->
      <div class="flex-1 bg-opacity-50 bg-slate-800 p-3 flex flex-col">
        <!-- 竖向柱状图 -->
        <VerticalBar class="h-1/3 box-border pb-2" />
        <!-- 环形图 -->
        <RingBar class="h-1/3 box-border pb-2" />
        <!-- 文档云图 -->
        <WordCloud class="h-1/3" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
