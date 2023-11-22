<!-- 词云图 -->
<script setup>
import * as echarts from "echarts";
import "echarts-wordcloud";
import { ref, onMounted, watch } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// 1.初始化
let myChart = null;
const target = ref(null);

onMounted(() => {
  myChart = echarts.init(target.value);

  renderChart();
});

const randomRGB = () => {
  function fn() {
    return Math.floor(Math.random() * 255);
  }
  return `rgb(${fn()},${fn()},${fn()})`;
};

const renderChart = () => {
  const options = {
    series: [
      {
        type: "wordCloud",
        sizeRange: [8, 46],
        rotationRange: [0, 0],
        gridSize: 0,
        layoutAnimation: true,
        textStyle: {
          color: randomRGB,
        },
        emphasis: {
          textStyle: {
            fontWeight: "bold",
            color: "#ffffff",
          },
        },
        data: props.data.datas,
      },
    ],
  };
  // 3.通过实例.setOptions(option)
  myChart.setOption(options);
};

watch(
  () => props.data,
  () => renderChart()
);
</script>

<template>
  <div>
    <div class="pt-2">【关键词】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style lang="less" scoped></style>
