import { DefaultController } from "../types/express/controller";
import { default as Product } from "../models/product";
import { 
  formatSort, 
  formatSelect, 
  filterNumbers,
} from "../utils/product";
import {
  FilterObject,
  SortObject,
  QueryObject
} from '../types/utils/product';
import { NotFoundError } from "../errors";
import { StatusCodes } from "http-status-codes";

const getAllProducts: DefaultController = async (req, res) => {
  const {
    sort,
    select,
    numericFilters,
    name,
    category,
    limit,
    page
  } = req.query;

  const findObject: FilterObject = filterNumbers(numericFilters as string) as FilterObject;
  const sortObject: SortObject = formatSort(sort as string) as SortObject;
  const selectObject: QueryObject = formatSelect(select as string) as QueryObject;

  let limitNum: number = 10;
  let pageNum: number = 0;
  
  if (name) {
    findObject.name = name as string;
  }
  
  if (category) {
    findObject.category = category as string;
  }

  if (limit) {
    limitNum = Number(limit);
  }

  if (page) {
    pageNum = (Number(page) - 1) * limitNum;
  }

  const products = await Product.find(findObject)
                                .sort(sortObject)
                                .select(selectObject)
                                .limit(limitNum)
                                .skip(pageNum);
  if (!products) throw new NotFoundError("No products where found");

  res.status(StatusCodes.OK).json({
    products,
    nbHits: products.length
  });
}

const getProduct: DefaultController = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);
  if (!product) throw new NotFoundError(`No product was found with id: ${productId}`);

  res.status(StatusCodes.OK).json(product);
}

export {
  getAllProducts,
  getProduct
}