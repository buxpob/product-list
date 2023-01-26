import { Product } from "./types/types";

const adaptProductsToClient = (lists: Product[], numberDocument: string) => lists
  .map((list) => ({
    ...list,
    document: numberDocument,
}))

export default adaptProductsToClient;
