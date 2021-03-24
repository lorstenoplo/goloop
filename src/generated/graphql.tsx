import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  products: Array<Product>;
  product?: Maybe<Product>;
  me?: Maybe<User>;
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryMeArgs = {
  token: Scalars['String'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  title: Scalars['String'];
  price: Scalars['Float'];
  rating: Scalars['Float'];
  imageURL: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: Product;
  deleteProduct?: Maybe<Product>;
  report?: Maybe<Scalars['Boolean']>;
  register: UserResponse;
  login: UserResponse;
  delete?: Maybe<User>;
};


export type MutationCreateProductArgs = {
  imageURL: Scalars['String'];
  rating: Scalars['Int'];
  price: Scalars['Int'];
  title: Scalars['String'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationReportArgs = {
  username: Scalars['String'];
  problem: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  emailOrUsername: Scalars['String'];
};


export type MutationDeleteArgs = {
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'username' | 'createdAt' | 'password'>
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & Pick<UserResponse, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'username' | 'email' | 'id' | 'createdAt' | 'password'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type ReportMutationVariables = Exact<{
  username: Scalars['String'];
  problem: Scalars['String'];
}>;


export type ReportMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'report'>
);

export type MeQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'email' | 'id' | 'createdAt' | 'password'>
  )> }
);

export type ProductQueryVariables = Exact<{
  productId: Scalars['ID'];
}>;


export type ProductQuery = (
  { __typename?: 'Query' }
  & { product?: Maybe<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'title' | 'price' | 'rating' | 'imageURL'>
  )> }
);

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = (
  { __typename?: 'Query' }
  & { products: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'id' | 'title' | 'price' | 'rating' | 'imageURL'>
  )> }
);


export const LoginDocument = gql`
    mutation Login($emailOrUsername: String!, $password: String!) {
  login(emailOrUsername: $emailOrUsername, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      email
      username
      createdAt
      password
    }
    token
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(options: {username: $username, password: $password, email: $email}) {
    user {
      username
      email
      id
      createdAt
      password
    }
    errors {
      field
      message
    }
    token
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const ReportDocument = gql`
    mutation Report($username: String!, $problem: String!) {
  report(username: $username, problem: $problem)
}
    `;

export function useReportMutation() {
  return Urql.useMutation<ReportMutation, ReportMutationVariables>(ReportDocument);
};
export const MeDocument = gql`
    query Me($token: String!) {
  me(token: $token) {
    username
    email
    id
    createdAt
    password
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const ProductDocument = gql`
    query Product($productId: ID!) {
  product(id: $productId) {
    id
    title
    price
    rating
    imageURL
  }
}
    `;

export function useProductQuery(options: Omit<Urql.UseQueryArgs<ProductQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductQuery>({ query: ProductDocument, ...options });
};
export const ProductsDocument = gql`
    query Products {
  products {
    id
    title
    price
    rating
    imageURL
  }
}
    `;

export function useProductsQuery(options: Omit<Urql.UseQueryArgs<ProductsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProductsQuery>({ query: ProductsDocument, ...options });
};