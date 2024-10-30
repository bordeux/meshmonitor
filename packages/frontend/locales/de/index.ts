import NSCommon from "./common.json";
import NSLocalization from "./localization.json";
import NSNodes from "./nodes.json";
import NSTimeline from "./timeline.json";
import NSMessage from "./message.json";
import NSUtils from "./utils.json";

import { de as dateLocale } from "date-fns/locale/de";
import Flag3x2 from "country-flag-icons/react/3x2/DE";
import Flag1x1 from "country-flag-icons/react/1x1/DE";
// @ts-ignore
import timeAgoLocale from "react-timeago/lib/language-strings/de";
// @ts-ignore
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { frFR as dataGridLocale } from "@mui/x-data-grid/locales";

const resource = <const>{
  namespaces: {
    common: NSCommon,
    localization: NSLocalization,
    nodes: NSNodes,
    timeline: NSTimeline,
    message: NSMessage,
    utils: NSUtils,
  },
  dateLocale,
  dataGridLocale,
  timeAgoFormatter: buildFormatter(timeAgoLocale),
  flags: {
    "3x2": Flag3x2,
    "1x1": Flag1x1,
  },
};
export default resource;
