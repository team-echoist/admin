export const formatMonthlyData = (data: { [key: string]: number }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  return Object.keys(data).map((day) => {
    const dayPadded = day.padStart(2, "0");
    return {
      label: `${year}-${month.toString().padStart(2, "0")}-${dayPadded}`,
      value: data[day],
    };
  });
};

export const formatYearlyData = (data: { [key: string]: number }) => {
  const today = new Date();
  const year = today.getFullYear();

  return Object.keys(data).map((month) => {
    return {
      label: `${year}-${month}`,
      value: data[month],
    };
  });
};
