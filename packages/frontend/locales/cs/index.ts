import NSCommon from "./common.json";
import NSLocalization from "./localization.json";
import NSNodes from "./nodes.json";
import NSTimeline from "./timeline.json";
import NSMessage from "./message.json";
import NSUtils from "./utils.json";
import NSMap from "./map.json";

import { cs as dateLocale } from "date-fns/locale/cs";
import Flag3x2 from "country-flag-icons/react/3x2/CZ";
import Flag1x1 from "country-flag-icons/react/1x1/CZ";
// @ts-ignore
import timeAgoLocale from "react-timeago/lib/language-strings/cs";
// @ts-ignore
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import { csCZ as dataGridLocale } from "@mui/x-data-grid/locales";

const resource = <const>{
  namespaces: {
    common: NSCommon,
    localization: NSLocalization,
    nodes: NSNodes,
    timeline: NSTimeline,
    message: NSMessage,
    utils: NSUtils,
    map: NSMap,
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
