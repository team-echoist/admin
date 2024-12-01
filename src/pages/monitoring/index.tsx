import { Metric, onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";
import { useEffect, useState } from "react";

import ServerStatus from "./ServerStatus";
import { cn } from "../../lib/utils";

type WebVitals = {
  CLS: number | null;
  LCP: number | null;
  FCP: number | null;
  TTFB: number | null;
  INP: number | null;
};
export default function Monitoring() {
  const [vitals, setVitals] = useState<WebVitals>({
    CLS: null,
    LCP: null,
    FCP: null,
    TTFB: null,
    INP: null,
  });

  useEffect(() => {
    const handleVitals = (metric: Metric) => {
      setVitals((prev) => ({
        ...prev,
        [metric.name]: metric.value,
      }));
    };

    onCLS(handleVitals);
    onFCP(handleVitals);
    onINP(handleVitals);
    onLCP(handleVitals);
    onTTFB(handleVitals);
  }, []);

  return (
    <div className="mt-[40px] max-w-[1300px] flex flex-col gap-[20px]">
      <div className="flex gap-[10px] items-center">
        <h4 className="text-2xl">서버 상태</h4>
        <ServerStatus />
      </div>
      <h4 className="text-2xl">관리자페이지 WEB VITALS</h4>
      <ul className="grid grid-cols-5 gap-[20px]">
        {Object.entries(vitals).map(([key, value]) => (
          <WebVitalItem key={key} label={key} value={value} />
        ))}
      </ul>
    </div>
  );
}

type WebVitalItemProps = {
  label: string;
  value: number | null;
};

function WebVitalItem({ label, value }: WebVitalItemProps) {
  const { emoji, color } = getPerformanceStatus({ label, value });
  const description = getPerformanceDescription(label);

  return (
    <li className="flex flex-col border items-center p-[20px]">
      <div className="text-xl">{label}</div>
      <div>
        {description} {emoji}
      </div>
      <div className={cn(value !== null ? "font-bold" : "", color)}>
        {value !== null ? value.toFixed(2) : "로딩중"}
      </div>
    </li>
  );
}

const getPerformanceStatus = ({ label, value }: WebVitalItemProps) => {
  if (value === null) return { emoji: "⏳", color: "gray" };

  switch (label) {
    case "CLS":
      return value < 0.1 ? pass : value < 0.25 ? warn : nonPass;

    case "INP":
      return value < 200 ? pass : value < 500 ? warn : nonPass;

    case "LCP":
      return value < 2500 ? pass : value < 4000 ? warn : nonPass;

    case "FCP":
      return value < 1800 ? pass : value < 3000 ? warn : nonPass;

    case "TTFB":
      return value < 100 ? pass : value < 500 ? warn : nonPass;

    default:
      return nonPass;
  }
};

const pass = { emoji: "✅", color: "text-black" };
const warn = { emoji: "⚠️", color: "text-warningMessage" };
const nonPass = { emoji: "❌", color: "text-errorMessage" };

const getPerformanceDescription = (label: string) => {
  switch (label) {
    case "CLS":
      return "페이지 레이아웃 변경";

    case "INP":
      return "사용자 입력 지연";

    case "LCP":
      return "주요 콘텐츠 표시 시간";

    case "FCP":
      return "페이지 로드 시간";

    case "TTFB":
      return "서버 응답 시간";

    default:
      return "";
  }
};
