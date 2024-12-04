import Chart from ".";

const YearChart = ({ data }: { data: { [key: string]: number } }) => {
  const today = new Date();
  const year = today.getFullYear();

  const formattedData = Object.keys(data).map((month) => {
    return {
      label: `${year}-${month}`,
      value: data[month],
    };
  });

  return <Chart data={formattedData} />;
};

export default YearChart;
