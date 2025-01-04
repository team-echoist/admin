import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import fetchData from "../../api/fetchData";
import { useState } from "react";

type MethodType = "GET" | "POST" | "PUT" | "DELETE";

export default function ApiTestForm() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState<MethodType>("GET");
  const [body, setBody] = useState("{}");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (method !== "GET") {
      const confirmChange = window.confirm(
        "⚠️ 이 요청은 실제 DB에 영향을 줄 수 있습니다. 진행하시겠습니까?"
      );
      if (!confirmChange) {
        console.log("%c요청이 취소되었습니다.", "color: orange;");
        return;
      }
    }

    try {
      const parsedBody = body ? JSON.parse(body) : undefined;

      console.log(
        "%cAPI 요청 정보:\n",
        "background: #006980; color: white; padding: 4px; border-radius: 4px;",
        { url, method, parsedBody }
      );
      const res = await fetchData({
        url,
        method,
        body: parsedBody,
      });

      console.log(
        "%cAPI 요청 결과:\n",
        "background: green; color: white; padding: 4px; border-radius: 4px;",
        res
      );
    } catch (err) {
      console.log("에러 발생:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
      <div>
        <label className="block font-semibold mb-2">URL</label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="/api 이하의 엔드포인트를 전부 입력해주세요(예: /admin-support/releases?page=0&perPage=10)"
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-2">HTTP Method</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as MethodType)}
          className="w-full p-2 border rounded"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div>
        <label className="block font-semibold mb-2">Body (JSON)</label>
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border rounded"
          rows={5}
          placeholder='json 형식으로 입력해주세요 {"key": "value"}'
          disabled={method === "GET" || method === "DELETE"}
        />
      </div>
      <Button type="submit">API 보내기</Button>
    </form>
  );
}
