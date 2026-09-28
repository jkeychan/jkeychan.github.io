import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  // eslint-plugin-react's "detect" calls context.getFilename(), removed in ESLint 10
  { settings: { react: { version: "19.2" } } },
];

export default eslintConfig;
