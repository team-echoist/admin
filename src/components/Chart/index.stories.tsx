import { formatMonthlyData, formatYearlyData } from "./index.utils";

import Chart from ".";
import type { Meta } from "@storybook/react";

const meta: Meta = {
  title: "components/chart",
};

export default meta;

export const Monthly = {
  render: () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const monthlyChartData: { [key: string]: number } = {};

    for (let i = 1; i <= lastDayOfMonth; i++) {
      monthlyChartData[i] = Math.floor(Math.random() * 50);
    }

    const formattedData = formatMonthlyData(monthlyChartData);

    return <Chart data={formattedData} />;
  },
};

export const Year = {
  render: () => {
    const yearChartData: { [key: string]: number } = {};

    for (let i = 1; i <= 12; i++) {
      yearChartData[i] = Math.floor(Math.random() * 50);
    }

    const formattedData = formatYearlyData(yearChartData);

    return <Chart data={formattedData} />;
  },
};
