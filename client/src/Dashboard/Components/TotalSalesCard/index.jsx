import React, { useEffect } from "react";
import * as echarts from "echarts";

export default function TotalSalesCard() {
  useEffect(() => {
    var chartDom = document.getElementById("TotalSalesCard");
    if (chartDom) {
      var myChart = echarts.init(chartDom);
      var option = {
        color: ["#22c55e"],
        title: {
          text: "Sales",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#22c55e",
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
                  color: "rgba(139,255,189,1)",
                },
                {
                  offset: 1,
                  color: "rgba(34,197,94,1)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [10, 20, 30, 40, 50, 60, 70],
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
      <div id="TotalSalesCard" style={{ width: "100%", height: "200px" }}></div>
    </div>
  );
}
