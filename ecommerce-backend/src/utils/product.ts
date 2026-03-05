type QueryObject = Record<string, 1 | -1>;
type FormatFunction = (sort: string) => QueryObject;

export const formatSort: FormatFunction = (sort) => {
  const sortObj: QueryObject = {};
  if (sort) {
    const entries = sort.split(',');
    for (const entry of entries) {
      if (entry.startsWith('-')) {
        sortObj[entry.slice(1)] = -1;
      } else {
        sortObj[entry] = 1;
      }
    }
  }
  return sortObj;
}

export const formatSelect: FormatFunction = (select) => {
  const selectObj: QueryObject = {};

  return selectObj;
}