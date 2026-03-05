import { BadRequestError } from "../errors";

type QueryObject = Record<string, 1 | -1>;
type FormatFunction = (query: string) => QueryObject;

export const formatSort: FormatFunction = (sort) => {
  const sortObj: QueryObject = {};
  
  if (sort) {
    const entries = sort.split(',');
    
    entries.forEach(entry => {
      
      if (entry.startsWith('-')) {
        sortObj[entry.slice(1)] = -1;
      } else {
        sortObj[entry] = 1;
      }

    });
  }

  return sortObj;
}

export const formatSelect: FormatFunction = (select) => {
  const selectObj: QueryObject = {};
  
  if (select) {
    const entries = select.split(',');
    
    if (entries.every(entry => entry.startsWith('-')) || entries.every(entry => !entry.startsWith('-'))) {
      entries.forEach(entry => {
        entry.startsWith('-') ? selectObj[entry.slice(1)] = -1 : selectObj[entry] = 1;
      });
    } else {
      const excludeEntries = entries.filter(entry => {
        if (entry.startsWith('-')) {
          return entry;
        }
      });
      
      if (excludeEntries.length > 1 || excludeEntries[0] !== "-_id") throw new BadRequestError("Exclude and include parameters may only join exclude _id only");
      
      entries.forEach(entry => {
        entry.startsWith('-') ? selectObj[entry.slice(1)] = -1 : selectObj[entry] = 1;
      });
    }

  }
  
  return selectObj;
}