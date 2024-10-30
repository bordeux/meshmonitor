import { Suspense as SuspenseReact, SuspenseProps } from "react";
import SuspenseLoader from "../SuspenseLoader";

const Suspense: React.FC<SuspenseProps> = (props) => {
  return <SuspenseReact fallback={<SuspenseLoader />} {...props} />;
};

export default Suspense;
