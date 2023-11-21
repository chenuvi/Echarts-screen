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

let myChart = null;
const target = ref(null);

const renderChart = () => {
  const options = {
    // X轴展示数据
    xAxis: {
      type: "category",
      data: props.data.servers.map((item) => item.name),
      axisLabel: { color: "#9eb1c8" },
    },
    // Y轴展示数据
    yAxis: {
      show: false, //不显示X
      type: "value", //表示X轴作为数据展示
      max: function (value) {
        return parseInt(value.max * 1.2);
      },
    },
    // 图标绘制的位置 对应上下左右
    grid: {
      top: 16,
      right: 0,
      bottom: 26,
      left: -26,
      containLabel: true, //计算时包含标签
    },
    // 核心配置
    series: [
      {
        type: "bar",
        data: props.data.servers.map((item) => ({
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
          position: "top",
          textStyle: {
            color: "#fff",
          },
          formatter: "{c}%",
        },
      },
    ],
  };

  myChart.setOption(options);
};

onMounted(() => {
  myChart = echarts.init(target.value);
  renderChart();
});

watch(
  () => props.data,
  () => renderChart()
);
</script>

<template>
  <div>
    <div>【服务资源占用比】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style lang="less" scoped></style>
