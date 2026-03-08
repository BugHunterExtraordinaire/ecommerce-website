export type SortObject = Record<string, 1 | -1>;
export type OperatorMapObj = Record<string, string>;
export type QueryObject = Record<string, number>;
export type FilterObject = Record<string, QueryObject | string>;
export type FormatFunction = (query: string | undefined) => QueryObject | FilterObject;