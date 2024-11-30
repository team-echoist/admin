import Chart from "react-apexcharts";

const MonthlyChart = ({ data }: { data: { [key: string]: number } }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const formattedData = Object.keys(data).map((day) => {
    const dayPadded = day.padStart(2, "0");
    return {
      day: `${year}-${month.toString().padStart(2, "0")}-${dayPadded}`,
      value: data[day],
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
            format: "dd MMM",
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

export default MonthlyChart;
