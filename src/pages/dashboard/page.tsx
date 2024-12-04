import {
  formatMonthlyData,
  formatYearlyData,
} from "../../components/Chart/index.utils";

import Chart from "../../components/Chart";
import { cn } from "../../lib/utils";
import dashboardQueryOptions from "../../queries/dashboardQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Dashboard() {
  const [graphMode, setGraphMode] = useState<"month" | "year">("year");

  const today = new Date();

  const { data: countData } = useQuery({
    ...dashboardQueryOptions.getCounts(),
  });

  const {
    data: grahpData,
    error,
    isLoading,
  } = useQuery({
    ...dashboardQueryOptions.getGraphData(),
  });

  if (error) return;
  if (isLoading) return;

  if (!countData) return;
  if (!grahpData) return;
  return (
    <main className="m-[50px] flex flex-col gap-[40px] max-w-[1200px]">
      <div className="flex gap-[30px]">
        <div
          className={cn(
            "w-full grid grid-cols-2 grid-rows-2",
            "border p-[20px] rounded-[8px]"
          )}
        >
          <DashboardTextItem
            type="total"
            label="가입자 수"
            value={countData?.totalUser}
          />
          <DashboardTextItem
            type="total"
            label="에세이 수"
            value={countData.totalEssays}
          />

          <DashboardTextItem
            type="today"
            label="구독자 수"
            value={countData.todaySubscribers}
          />
          <DashboardTextItem
            type="today"
            label="에세이 수"
            value={countData.todayEssays}
          />
        </div>
        <div className="flex-shrink-0 border p-[20px] rounded-[8px]">
          <DashboardTextItem
            type="linkedOut"
            label="에세이 수"
            value={countData.linkedOutEssays}
          />
          <DashboardTextItem
            type="public"
            label="에세이 수"
            value={countData.publishedEssays}
          />
        </div>
        <div className="flex-shrink-0 border p-[20px] rounded-[8px]">
          <DashboardTextItem
            label="처리되지 않은 레포트"
            value={countData.unprocessedReports}
            unit="건"
          />
          <DashboardTextItem
            label="처리되지 않은 리뷰"
            value={countData.unprocessedReviews}
            unit="건"
          />
        </div>
      </div>
      <div className="flex flex-col py-[20px] relative gap-[20px]">
        <div className="flex justify-between items-center">
          {graphMode === "month" ? (
            <h3 className="text-xl">
              {today.getFullYear()}년 {today.getMonth() + 1}월 통계
            </h3>
          ) : (
            <h3 className="text-xl">{today.getFullYear()}년 통계</h3>
          )}
          <div className="flex gap-[10px] p-[5px] border rounded-[20px]">
            <button
              onClick={() => {
                setGraphMode("month");
              }}
              className={cn(
                "py-[5px] px-[10px] rounded-[20px]",
                graphMode === "year" ? "" : "bg-lightGray"
              )}
            >
              Month
            </button>
            <button
              onClick={() => {
                setGraphMode("year");
              }}
              className={cn(
                "py-[5px] px-[15px] rounded-[20px]",
                graphMode === "year" ? "bg-lightGray" : ""
              )}
            >
              Year
            </button>
          </div>
        </div>
        {graphMode === "month" ? (
          <div className="grid grid-cols-3">
            <DashboardChartItem
              label={`에세이 작성 수`}
              data={grahpData.essays.daily}
            />
            <DashboardChartItem
              label={`유저 가입 수`}
              data={grahpData.users.daily}
            />
            <DashboardChartItem
              label={`구독자 수`}
              data={grahpData.payments.daily}
            />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-[20px]">
            <DashboardChartItem
              label={`에세이 작성 수`}
              data={grahpData.essays.monthly}
            />
            <DashboardChartItem
              label={`유저 가입 수`}
              data={grahpData.users.monthly}
            />
            <DashboardChartItem
              label={`구독자 수`}
              data={grahpData.payments.monthly}
            />
          </div>
        )}
      </div>
    </main>
  );
}

type DashboardTextItemProps = {
  type?: "today" | "total" | "linkedOut" | "public";
  label: string;
  value: number;
  unit?: string;
};

function DashboardTextItem({
  type,
  label,
  value,
  unit,
}: DashboardTextItemProps) {
  return (
    <div className="flex flex-col items-center">
      <div>
        {type && (
          <span
            className={cn(
              "bg-lightGray text-blue text-xs rounded-[8px] py-[2px] px-[7px] mr-[5px]",
              type === "today" ? "font-bold" : ""
            )}
          >
            {type.toUpperCase()}
          </span>
        )}
        {label}
      </div>
      <div>
        {value} <span>{unit}</span>
      </div>
    </div>
  );
}

type DashboardChartItemProps = {
  label: string;
  data: { [key: string]: number };
};

function DashboardChartItem({ label, data }: DashboardChartItemProps) {
  const hasAnnualData = Object.prototype.hasOwnProperty.call(data, "30");
  const formattedData = hasAnnualData
    ? formatMonthlyData(data)
    : formatYearlyData(data);

  return (
    <div className="flex flex-col">
      <Chart data={formattedData} />
      <label>{label}</label>
    </div>
  );
}
