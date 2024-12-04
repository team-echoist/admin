import { formatMonthlyData, formatYearlyData } from "./index.utils";

describe("Chart utils 테스트", () => {
  describe("formatMonthlyData: ", () => {
    it("특정 달의 일별 데이터를 label, value 형식으로 포맷팅한다.", () => {
      const data = {
        "01": 10,
        "02": 20,
        "03": 30,
      };

      const today = new Date();
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");

      const expectedResult = [
        { label: `${year}-${month}-01`, value: 10 },
        { label: `${year}-${month}-02`, value: 20 },
        { label: `${year}-${month}-03`, value: 30 },
      ];

      const result = formatMonthlyData(data);

      expect(result).toEqual(expectedResult);
    });
  });

  describe("formatYearlyData", () => {
    it("특정 년도의 월별 데이터를 label, value 형식으로 포맷팅한다.", () => {
      const data = {
        "01": 100,
        "02": 200,
        "03": 300,
      };

      const today = new Date();
      const year = today.getFullYear();

      const expectedResult = [
        { label: `${year}-01`, value: 100 },
        { label: `${year}-02`, value: 200 },
        { label: `${year}-03`, value: 300 },
      ];

      const result = formatYearlyData(data);

      expect(result).toEqual(expectedResult);
    });
  });
});
