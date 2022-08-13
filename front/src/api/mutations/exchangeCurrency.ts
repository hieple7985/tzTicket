import { gql } from "@apollo/client";

export const EXCHANGE_CURRENCY = gql`
  mutation MyMutation($currency: float8!) {
    exchangeCurrency(currency: $currency) {
      currency
    }
  }
`