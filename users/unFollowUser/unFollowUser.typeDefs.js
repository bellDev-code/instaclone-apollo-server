import { gql } from "apollo-server";

export default gql`
  type Mutation {
    unFollowUser(username: String!): MutationResponse!
  }
`;
