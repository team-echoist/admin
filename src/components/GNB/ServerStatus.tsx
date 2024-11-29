import getServerStatus, { StatusType } from "../../api/sever/getServerStatus";
import { useEffect, useState } from "react";

import { cn } from "../../lib/utils";

export default function ServerStatus() {
  const [status, setStatus] = useState<StatusType>();

  console.log(status);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getServerStatus();
        setStatus(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  return (
    <div
      className={cn(
        "w-[20px] h-[20px] rounded-[20px]",
        status === "open"
          ? "bg-green-500"
          : status === "maintenance"
          ? "bg-yellow-300"
          : "bg-red-300"
      )}
    ></div>
  );
}
