import React, { useEffect } from "react";
import * as echarts from "echarts";

export default function YearlySalesGraph() {
  useEffect(() => {
    var chartDom = document.getElementById("YearlySalesGraph");
    if (chartDom) {
      var myChart = echarts.init(chartDom);
      var option = {
        color: ["#007aff"],
        title: {
          text: "Yearly Sales",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#007aff",
            },
          },
        },

        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Sales",
            type: "line",
            stack: "Total",
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0, 0, 255, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(238, 130, 238, 1)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [10, 40, 20, 60, 80, 40, 120, 60, 20, 40, 100, 120],
          },
        ],
      };

      if (option && typeof option === "object") {
        myChart.setOption(option);
      }

      window.addEventListener("resize", myChart.resize);

      // Clean up on unmount
      return () => {
        window.removeEventListener("resize", myChart.resize);
        myChart.dispose();
      };
    }
  }, []);

  return (
    <div>
      <div
        id="YearlySalesGraph"
        style={{ width: "100%", height: "400px" }}
      ></div>
    </div>
  );
}
