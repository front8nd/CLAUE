import React, { useEffect } from "react";
import * as echarts from "echarts";

export default function TotalIncomeCard() {
  useEffect(() => {
    var chartDom = document.getElementById("TotalIncomeCard");
    if (chartDom) {
      var myChart = echarts.init(chartDom);
      var option = {
        color: ["#fb923c"],
        title: {
          text: "Revenue",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#fb923c",
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
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Income",
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
                  color: "rgba(255,228,139,1)",
                },
                {
                  offset: 1,
                  color: "rgba(251,146,60,1)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [100, 232, 101, 264, 90, 340, 250],
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
        id="TotalIncomeCard"
        style={{ width: "100%", height: "200px" }}
      ></div>
    </div>
  );
}
