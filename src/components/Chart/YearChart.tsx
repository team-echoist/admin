import Chart from "react-apexcharts";

const YearChart = ({ data }: { data: { [key: string]: number } }) => {
  const today = new Date();
  const year = today.getFullYear();

  const formattedData = Object.keys(data).map((month) => {
    return {
      day: `${year}-${month}`,
      value: data[month],
    };
  });

  const categories = formattedData.map((item) => item.day);
  const seriesData = formattedData.map((item) => item.value);

  return (
    <Chart
      options={{
        chart: {
          id: "basic-bar",
          toolbar: { show: false },
        },
        xaxis: {
          categories: categories,
          labels: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        tooltip: {
          enabled: true,
          x: {
            format: "yy MMM",
          },
        },
      }}
      series={[
        {
          name: "카운트",
          data: seriesData,
        },
      ]}
      type="line"
      width="400"
    />
  );
};

export default YearChart;
