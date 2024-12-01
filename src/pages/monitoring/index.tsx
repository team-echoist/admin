import { Metric, onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";
import { useEffect, useState } from "react";

type WebVitals = {
  CLS: number | null;
  FID: number | null;
  LCP: number | null;
  FCP: number | null;
  TTFB: number | null;
};
export default function Monitoring() {
  const [vitals, setVitals] = useState<WebVitals>({
    CLS: null,
    FID: null,
    LCP: null,
    FCP: null,
    TTFB: null,
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
    <div>
      <h4>관리자페이지 WEB VITALS</h4>
      <ul>
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
  return (
    <li>
      {label}: {value !== null ? value.toFixed(2) : "로딩중"}
    </li>
  );
}
