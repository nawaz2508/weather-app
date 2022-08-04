import React from "react";
import Chart from "react-apexcharts";
import "../App.css";

function Graph2() {
  var obj = {
    series: [
      {
        data: [0, 40, 0],
      },
    ],
    options: {
      colors: ["#FEE266"],
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      chart: {
        zoom: {
          enabled: false,
        },
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["5am", "2pm", "6pm"],
      },
      yaxis: {
        show: false,
      },
    },
  };
  return (
    <div className="graph">
      <Chart
        options={obj.options}
        series={obj.series}
        type="area"
        width="100%"
        height={190}
      />
    </div>
  );
}
export default Graph2;
