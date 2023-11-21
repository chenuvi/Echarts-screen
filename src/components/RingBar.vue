<!-- 环形图 -->
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

const getSeriesData = () => {
  const series = [];
  props.data.abnormals.forEach((item, index) => {
    // 上层
    series.push({
      name: item.name,
      type: "pie",
      clockWise: false,
      hoverAnimation: false,
      radius: [73 - index * 15 + "%", 68 - index * 15 + "%"],
      center: ["55%", "55%"],
      label: {
        show: false,
      },
      data: [
        {
          value: item.value,
          name: item.name,
        },
        {
          value: 1000,
          itemStyle: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
        },
      ],
    });

    // 底层
    series.push({
      name: item.name,
      type: "pie",
      silent: true,
      z: 1,
      clockWise: false,
      hoverAnimation: false,
      radius: [73 - index * 15 + "%", 68 - index * 15 + "%"],
      center: ["55%", "55%"],
      label: {
        show: false,
      },
      data: [
        {
          value: 7.5,
          itemStyle: {
            color: "rgb(3,31,62)",
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
        },
        {
          value: 2.5,
          itemStyle: {
            color: "rgba(0,0,0,0)",
            borderWidth: 0,
          },
          tooltip: {
            show: false,
          },
          hoverAnimation: false,
        },
      ],
    });
  });

  return series;
};

onMounted(() => {
  myChart = echarts.init(target.value);

  renderChart();
});

const renderChart = () => {
  const options = {
    // 图例配置
    legend: {
      show: true,
      icon: "circle",
      top: "14%",
      left: "60%",
      data: props.data.abnormals.map((item) => item.name),
      width: -5,
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 6,
      textStyle: {
        fontSize: 12,
        lineHeight: 5,
        color: "rgba(255,255,255,.8)",
      },
    },
    // 提示层
    tooltip: {
      show: true,
      trigger: "item",
      formatter: "{b}:{c}({d}%)",
    },
    // Y
    yAxis: [
      {
        type: "category",
        inverse: true,
        axisLine: {
          show: false,
        },
      },
    ],
    // X
    xAxis: [
      {
        show: false,
      },
    ],
    // 核心
    series: getSeriesData(),
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
    <div>【大区异常处理】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style lang="less" scoped></style>
