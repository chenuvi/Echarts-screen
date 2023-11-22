<!-- 关系图 -->
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
    xAxis: {
      show: false,
      type: "value",
    },
    yAxis: {
      show: false,
      type: "value",
    },
    series: [
      {
        type: "graph",
        layout: "none",
        coordinateSystem: "cartesian2d",
        symbolSize: 26,
        z: 3,
        edgeLabel: {
          normal: {
            show: true,
            color: "#fff",
            textStyle: {
              fontSize: 14,
            },
            formatter: (params) => params.data.speed,
          },
        },
        label: {
          normal: {
            show: true,
            position: "bottom",
            color: "#5e5e5e",
          },
        },
        edgeSymbol: ["none", "arrow"],
        edgeSymbolSize: 8,
        data: props.data.relations.map((item) => {
          if (item.id !== 0) {
            return {
              name: item.name,
              category: 0,
              active: true,
              speed: `${item.speed}kb/s`,
              value: item.value,
            };
          } else {
            return {
              name: item.name,
              value: item.value,
              symbolSize: 100,
              itemStyle: {
                normal: {
                  color: {
                    colorStops: [
                      { offset: 0, color: "#157eff" },
                      { offset: 1, color: "#35c2ff" },
                    ],
                  },
                },
              },
              label: {
                fontSize: "14",
              },
            };
          }
        }),
        // 极点
        links: props.data.relations.map((item, index) => ({
          source: item.source,
          target: item.target,
          speed: `${item.speed}kb/s`,
          lineStyle: {
            normal: {
              color: "#12b5d0",
              curveness: 0.2,
            },
          },
          label: {
            show: true,
            position: "middle",
            offset: [10, 0],
          },
        })),
      },
      {
        type: "lines",
        coordinateSystem: "cartesian2d",
        z: 1,
        effect: {
          show: true,
          amooth: false,
          trailLength: 0,
          symbol: "arrow",
          color: "rgba(55,155,255,0.6)",
          symbolSize: 12,
        },
        lineStyle: {
          normal: {
            curveness: 0.2,
          },
        },
        data: [
          [{ coord: [0, 300] }, { coord: [50, 200] }],
          [{ coord: [0, 100] }, { coord: [50, 200] }],
          [{ coord: [50, 200] }, { coord: [100, 100] }],
          [{ coord: [50, 200] }, { coord: [100, 300] }],
        ],
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
    <div class="pt-2">【数据传递关系】</div>
    <div ref="target" class="w-full h-full"></div>
  </div>
</template>

<style lang="less" scoped></style>
