import getServerStatus, { StatusType } from "../../api/sever/getServerStatus";
import { useEffect, useState } from "react";

export default function ServerStatus() {
  const [status, setStatus] = useState<StatusType>();

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
    <div className="flex items-center gap-[5px]">
      <div className="text-xl">
        {status === "open" ? "✅" : status === "maintenance" ? "⚠️" : "❌"}
      </div>
      <div>
        {status === "open"
          ? "서버가 정상적으로 운영 중입니다."
          : status === "maintenance"
          ? "서버는 현재 유지보수 모드로 개발 환경에서 작동 중입니다."
          : "서버에 문제가 발생했습니다. 문제가 해결될 때까지 기다려주세요."}
      </div>
    </div>
  );
}
