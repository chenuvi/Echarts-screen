<!--  -->
<script setup>
import * as echarts from "echarts";
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

const renderChart = () => {
  const options = {
    // 时间线
    timeline: {
      data: props.data.voltageLevel,
      axisType: "category",
      autoPlay: true,
      playInterval: 3000,
      left: "10%",
      right: "10%",
      bottom: "0%",
      width: "80%",
      label: {
        normal: {
          textStyle: {
            color: "#ddd",
          },
        },
        emphasis: {
          textStyle: {
            color: "#fff",
          },
        },
      },
      symbolSize: 10,
      lineStyle: {
        color: "#555",
      },
      checkpointStyle: {
        borderColor: "#888",
        borderWidth: 2,
      },
      controlStyle: {
        showNextBtn: true,
        showPrevBtn: true,
        normal: {
          color: "#666",
          borderColor: "#666",
        },
        emphasis: {
          color: "#aaa",
          borderColor: "#aaa",
        },
      },
    },
  };

  // 3.通过实例.setOptions(options)
  myChart.setOption(options);
};

watch(
  () => props.data,
  () => renderChart()
);
</script>

<template>
  <div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style lang="less" scoped></style>
