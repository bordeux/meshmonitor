import { generatePath as generatePathBase } from "react-router-dom";

type PathWithParams<Path extends string> =
  Path extends `${infer _Start}:${infer Param}/${infer Rest}`
    ? Param | PathWithParams<Rest>
    : Path extends `${infer _Start}:${infer Param}`
      ? Param
      : never;

type ExtractParams<Path extends string> = {
  [K in PathWithParams<Path>]: string;
};

// The helper function to generate URL
export function generatePath<Path extends string>(
  path: Path,
  params: ExtractParams<Path> | undefined = undefined,
): string {
  return generatePathBase(path, params as any);
}
