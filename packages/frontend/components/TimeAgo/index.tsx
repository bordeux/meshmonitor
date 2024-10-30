import * as React from "react";
import TimeAgoBase, { ReactTimeagoProps } from "react-timeago";
import { useTranslation } from "react-i18next";
import Locales from "../../locales";

const TimeAgo: React.FC<ReactTimeagoProps<any>> = (props) => {
  const { i18n } = useTranslation();
  const formatter =
    Locales[i18n.language as keyof typeof Locales]?.timeAgoFormatter;
  return <TimeAgoBase {...props} formatter={formatter} />;
};
export default TimeAgo;
