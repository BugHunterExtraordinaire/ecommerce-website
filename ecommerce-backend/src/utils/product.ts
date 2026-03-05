import { BadRequestError } from "../errors";
import { 
  FormatFunction,
  QueryObject,
  FilterObject,
  OperatorMapObj
 } from "../types/utils/product";

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

export const filterNumbers: FormatFunction = (numericFilters) => {
  const filterObj: FilterObject = {};

  if (numericFilters) {
    const operatorMap: OperatorMapObj = {
      "<": "$lt",
      "<=": "$lte",
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
    };
    
    const entries = numericFilters.split(',');

    const regExp = /\b(<|<=|>|>=|=)\b/;

    const formattedEntries = entries.map(entry => entry.replace(regExp, match => `-${operatorMap[match]}-`));
    formattedEntries.forEach(entry => {
      const [field, operator, number] = entry.split('-');
      filterObj[field][operator] = Number(number);
    });
  }

  return filterObj;
}