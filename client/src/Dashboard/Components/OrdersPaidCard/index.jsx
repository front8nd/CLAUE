import React, { useEffect } from "react";
import * as echarts from "echarts";

export default function OrdersPaidCard() {
  useEffect(() => {
    var chartDom = document.getElementById("OrdersPaidCard");
    if (chartDom) {
      var myChart = echarts.init(chartDom);
      var option = {
        color: ["#cbd5e1"],
        title: {
          text: "Orders",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#cbd5e1",
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
            name: "Total Orders",
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
                  color: "rgba(203,213,225,1)",
                },
                {
                  offset: 1,
                  color: "rgba(139,153,255,1)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: [140, 232, 101, 264, 90, 340, 250],
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
      <div id="OrdersPaidCard" style={{ width: "auto", height: "200px" }}></div>
    </div>
  );
}
