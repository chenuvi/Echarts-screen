<!--  -->
<script setup lang="ts">
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
    // X轴展示数据
    xAxis: {
      show: false, //不显示X
      type: "value", //表示X轴作为数据展示
      max: function (value) {
        return parseInt(value.max * 1.2);
      },
    },
    // Y轴展示数据
    yAxis: {
      type: "category",
      data: props.data.regions.map((item) => item.name),
      inverse: true,
      axisLine: { show: false }, //不展示线
      axisTick: { show: false }, //不展示刻度
      axisLabel: { color: "#9eb1c8" },
    },
    // 图标绘制的位置 对应上下左右
    grid: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      containLabel: true, //计算时包含标签
    },
    // 核心配置
    series: [
      {
        type: "bar",
        data: props.data.regions.map((item) => ({
          name: item.name,
          value: item.value,
        })),
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        itemStyle: {
          color: "#5D98CE",
          barBorderRadius: 5,
          shadowColor: "rgba(0,0,0,0.3)",
          shadowBlur: 5,
        },
        barWidth: 12,
        label: {
          show: true,
          position: "right",
          textStyle: {
            color: "#fff",
          },
        },
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
    <div>【大区数据信息】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style lang="less" scoped></style>
