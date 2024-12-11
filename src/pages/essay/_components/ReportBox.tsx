import ItemContainer from "../../../components/Detail/ItemContainer";
import { ReportType } from "../../../api/essays";

type ReportBoxProps = ReportType;

export default function ReportBox({
  createdDate,
  id,
  essayTitle,
  reason,
}: ReportBoxProps) {
  return (
    <article className="flex flex-col gap-[20px]">
      <h3 className="text-2xl">레포트 세부사항</h3>
      <div className="flex flex-col gap-[20px] relative max-w-[1200px]">
        <div className="grid grid-cols-2">
          <ItemContainer label="레포트 작성 날짜">
            <div>{createdDate}</div>
          </ItemContainer>
        </div>
        <div className="grid grid-cols-2">
          <ItemContainer label="에세이 ID">
            <div>{id}</div>
          </ItemContainer>
          <ItemContainer label="에세이 제목">
            <div>{essayTitle}</div>
          </ItemContainer>
        </div>
        <ItemContainer label="신고 사유">
          <div>{reason}</div>
        </ItemContainer>
      </div>
    </article>
  );
}
