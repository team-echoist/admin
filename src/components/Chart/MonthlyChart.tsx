import Chart from ".";

const MonthlyChart = ({ data }: { data: { [key: string]: number } }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const formattedData = Object.keys(data).map((day) => {
    const dayPadded = day.padStart(2, "0");
    return {
      label: `${year}-${month.toString().padStart(2, "0")}-${dayPadded}`,
      value: data[day],
    };
  });

  return <Chart data={formattedData} />;
};

export default MonthlyChart;
