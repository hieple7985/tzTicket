import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://laboon-nts-v1.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret": "SyczFjnTTVIwBG1nA1WUX47S40LYPzaLEdo4ZilPPja5dgJ64HVgPq87lQJijg6u",
    "x-hasura-role": "admin"
  }
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});
