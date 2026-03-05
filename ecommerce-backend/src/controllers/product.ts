import { DefaultController } from "../types/express/controller";
import { default as Product } from "../models/product";
import { 
  formatSort, 
  formatSelect, 
  filterNumbers,
  FilterObject,
  QueryObject
} from "../utils/product";
import { NotFoundError } from "../errors";
import { StatusCodes } from "http-status-codes";

type SortObject = Record<string, 1 | -1>;

const getAllProducts: DefaultController = async (req, res) => {
  const {
    sort,
    select,
    numericFilters,
    name,
    category,
    limit,
    page
  } = req.body;

  const findObject: FilterObject = filterNumbers(numericFilters) as FilterObject;
  const sortObject: SortObject = formatSort(sort) as SortObject;
  const selectObject: QueryObject = formatSelect(select) as QueryObject;

  let limitNum: number = 10;
  let pageNum: number = 0;
  
  if (name) {
    findObject.name = name;
  }
  
  if (category) {
    findObject.category = category;
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