import React, { useEffect } from "react";
import * as echarts from "echarts";

export default function YearlyIncomeGraph() {
  useEffect(() => {
    var chartDom = document.getElementById("YearlyIncomeGraph");
    if (chartDom) {
      var myChart = echarts.init(chartDom);
      var option = {
        color: ["#30ff5c"],
        title: {
          text: "Yearly Revenue",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#30ff5c",
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
                  color: "rgba(168,255,34,1)",
                },
                {
                  offset: 1,
                  color: "rgba(48,255,92,1)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [
              4000, 3040, 4020, 3060, 4080, 4100, 4020, 3360, 3920, 4120, 4100,
              3220,
            ],
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
        id="YearlyIncomeGraph"
        style={{ width: "100%", height: "400px" }}
      ></div>
    </div>
  );
}
