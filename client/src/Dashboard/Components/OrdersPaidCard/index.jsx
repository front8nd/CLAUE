import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";

export default function OrdersPaidCard() {
  const stripeData = useSelector((state) => state.Products.stripeData);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (stripeData.length !== 0) {
      const filteredData = stripeData.filter(
        (item) => item.customer_details !== null
      );
      filteredData.sort((a, b) => a.created - b.created);

      setData({
        date: filteredData.map((e) => formateDate(e.created)),
        items: filteredData.map((e) => e.lineItems.length),
      });
      setLoading(false);
    } else {
      setData([]);
      setLoading(false);
    }
  }, [stripeData]);
  console.log("x", data);
  const formateDate = (date) => {
    const orderDate = new Date(date * 1000);
    const formattedDate = orderDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };
  if (loading) return <Loading />;
  console.log(stripeData);
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
            data: data.date || [],
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
            data: data.items || [],
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
  }, [data]);

  return (
    <div>
      <div id="OrdersPaidCard" style={{ width: "auto", height: "200px" }}></div>
    </div>
  );
}
