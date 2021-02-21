import { MeQuery, Product } from "../../src/generated/graphql";

export type ContextDefaultType = {
  user: MeQuery["me"];
  basket: Array<Product>;
};
