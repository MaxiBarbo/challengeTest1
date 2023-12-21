const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "src/reports",
  reportPath: "./src/reports",
  reportName: "Test task for a Senior Automation QA Engineer role",
  pageTitle: "Test Task report",
  metadata: {
    browser: {
      name: "chrome",
      version: "Chromium",
    },
    device: "HP Pavilion Gaming Laptop 16",
    platform: {
      name: "Windows",
      version: "11 Pro",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Test Task" },
      { label: "Type", value: "E2E scenario Gherkin" },
      { label: "Version", value: "1.0" },
      { label: "CI / CD pipeline", value: "GitHub Actions" },
      { label: "Repository", value: "https://github.com/MaxiBarbo/challengeTest1.git" },
      { label: "Execution Start Time", value: "Nov 19th 2023" },
      { label: "Execution End Time", value: "Nov 19th 2023" },
      { label: "Web", value: "https://www.saucedemo.com/" },
    ],
  },
});