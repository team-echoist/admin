import type { Meta } from "@storybook/react";
import MonthlyChart from "./MonthlyChart";
import YearChart from "./YearChart";

const meta: Meta = {
  title: "components/Chart",
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

    return <MonthlyChart data={monthlyChartData} />;
  },
};

export const Year = {
  render: () => {
    const yearChartData: { [key: string]: number } = {};

    for (let i = 1; i <= 12; i++) {
      yearChartData[i] = Math.floor(Math.random() * 50);
    }

    return <YearChart data={yearChartData} />;
  },
};
