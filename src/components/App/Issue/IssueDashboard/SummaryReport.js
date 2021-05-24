import React, { useEffect } from "react";
import { get as getAPI } from "utils/api";

const SummaryReport = (url) => {

  const getSummaryReportInfo = async () => {
    
    const summaryReportInfo = await getAPI( null,'',url);    
    
    if (summaryReportInfo.data) {
        
      let div = document.createElement("div");
      let parser = new DOMParser();
      let htmlDoc = parser.parseFromString(summaryReportInfo.data, "text/html");

      let getCellOrJpCell = (parentClass) => {
        let parent = htmlDoc.getElementById(parentClass);
        if (!parent) return "";

        let closestCell = parent.closest(".cell");
        if (closestCell) return closestCell.outerHTML;

        let closestJPCell = parent.closest(".jp-Cell");
        if (closestJPCell) return closestJPCell.outerHTML;
      };

      let bar = getCellOrJpCell("bar_issue");
      let summary = getCellOrJpCell("summary_issue");

      summary += bar;

      summary +=
        `<style>
          .boxWrapper {
            display: flex;
            justify-content: space-around;
            width: 100%;
            flex-direction: column;
          }
          .boxInnerWrapper {
            display: flex;
          }
          .box {
            box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.08);
            border-radius: 8px;
            height: 140px;
            width: 48%;
            margin: 10px;
          }
          .boxColor1 {
            background: #EBD7F9 !important;
          }
          .boxColor2 {
            background: #C5EEE4 !important;
          }
          .boxColor3 {
            background: #EEE5C5 !important;
          }
          .boxColor4 {
            background: #C5EEE4 !important;
          }
          .info {
            font-family: Poppins;
            font-weight: bold;
            font-size: 48px;
            line-height: 72px;
            letter-spacing: -0.06em;
            padding: 20px 20px;
          }
          .infoLabel {
            font-family: Poppins;
            font-weight: 500;
            font-size: 14px;
            line-height: 21px;
            padding: 20px 20px;
            margin: -40px 0;
          }
          div#view-summary-report img, div#view-summary-report #summary_issue {width:100%;} div#view-summary-report > div {display: flex;justify-content: center;} div#view-summary-report
        </style>`;
      div.innerHTML = summary;

      while (div.firstChild) {
        document.getElementById("view-summary-report").appendChild(div.firstChild);
      }
    }
  };

  useEffect(() => {
    getSummaryReportInfo();
  }, []);

  return <div id="view-summary-report"></div>;
};

export default SummaryReport;
