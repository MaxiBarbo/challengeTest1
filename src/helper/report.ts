const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "src/reports",
  reportPath: "./src/reports",
  reportName: "Escenarios Cucumber",
  pageTitle: "Pigmeo Report Test",
  metadata: {
    browser: {
      name: "chrome",
      version: "119.0.6045.124 (Build oficial) (64 bits)",
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
      { label: "Project", value: "Pigmeo e-wallet" },
      { label: "Type", value: "Smoke Test" },
      { label: "Version", value: "1.2.3" },
      { label: "Sprint", value: "N°1" },
      { label: "Execution Start Time", value: "Nov 14th 2023" },
      { label: "Execution End Time", value: "Nov 14th 2023" },
    ],
  },
});