import { useEffect, useRef, useState } from "react";

type ItemType = { label: string; value: number };

type ToolTipType = Pick<
  React.CSSProperties,
  "backgroundColor" | "color" | "borderRadius"
>;

type ChartProps = {
  data: ItemType[];
  width?: number;
  height?: number;
  color?: string;
  tooltip?: ToolTipType;
};

export default function Chart({
  data,
  width = 400,
  height = 300,
  color = "#14229f",
  tooltip,
}: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const categories = data.map((item) => item.label);
        const seriesData = data.map((item) => item.value);

        const padding = 40;
        const xStep = (width - 2 * padding) / categories.length;
        const maxValue = Math.max(...seriesData);

        const drawChart = () => {
          ctx.clearRect(0, 0, width, height);

          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = color;

          seriesData.forEach((value, index) => {
            const x = padding + xStep * index;
            const y =
              value === 0
                ? height - padding
                : height -
                  padding -
                  (value / maxValue) * (height - 2 * padding);
            if (index === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          });

          ctx.stroke();
        };

        const showTooltip = (index: number) => {
          const x = padding + xStep * index;
          const y =
            height -
            padding -
            (seriesData[index] / maxValue) * (height - 2 * padding);

          ctx.fillStyle = tooltip?.backgroundColor ?? "#272727";
          ctx.fillRect(x + 10, y - 20, 100, 30);
          ctx.fillStyle = tooltip?.color ?? "#ffffff";
          ctx.fillText(
            `${categories[index]}: ${seriesData[index]}`,
            x + 15,
            y - 5
          );
        };

        drawChart();

        const handleMouseMove = (event: MouseEvent) => {
          const mouseX = event.offsetX;
          const closestIndex = Math.floor((mouseX - padding) / xStep);

          if (closestIndex >= 0 && closestIndex < seriesData.length) {
            setHoverIndex(closestIndex);
          } else {
            setHoverIndex(null);
          }
        };

        canvas.addEventListener("mousemove", handleMouseMove);

        if (hoverIndex !== null) {
          showTooltip(hoverIndex);
        }
      }
    }
  }, [data, hoverIndex, color, height, width, tooltip]);

  return <canvas ref={canvasRef} width={width} height={height}></canvas>;
}
