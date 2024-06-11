import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import { useSelector } from "react-redux";
import Loading from "../../../components/Loading";

export default function TotalSalesCard() {
  const stripeData = useSelector((state) => state.Products.stripeData);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (stripeData.length !== 0) {
      let filteredData = stripeData.filter(
        (item) => item.customer_details !== null
      );

      filteredData.sort((a, b) => a.created - b.created);

      // Combine both data updates into a single setData call
      setData({
        date: filteredData.map((e) => formateDate(e.created)),
        amount: filteredData.map((e) => e.amount_total),
      });
      setLoading(false);
    } else {
      setData([]);
      setLoading(false);
    }
  }, [stripeData]); // Add stripeData as a dependency
  if (loading) return <Loading />;
  console.log("sales", stripeData);

  const formateDate = (date) => {
    const orderDate = new Date(date * 1000);
    const formattedDate = orderDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

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
            data: data.date || [], // Ensure data.date is an array
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
            data: data.amount || [], // Ensure data.amount is an array
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
  }, [data]); // Add data as a dependency

  return (
    <div>
      <div id="TotalSalesCard" style={{ width: "100%", height: "200px" }}></div>
    </div>
  );
}
