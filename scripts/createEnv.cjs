const fs = require("fs");
const path = require("path");

const envFilePath = path.join(__dirname, "../.env.local");

const content = `VITE_BASE_API_URL=
VITE_SWAGGER_URL=
VITE_AOS_URL=
VITE_IOS_URL=
VITE_LANDING_URL=
VITE_ADMIN_URL=
VITE_DESKTOP_APP_URL=
`;

fs.writeFileSync(envFilePath, content, { encoding: "utf8" });
console.log("환경변수 파일 생성 완료");
