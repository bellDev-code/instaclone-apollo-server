import { gql } from "apollo-server";

export default gql`
  type searchUsersResult {
    ok: Boolean!
    error: String
    users: [User]
  }
  type Query {
    searchUsers(keywords: String!, lastId: Int): searchUsersResult
  }
`;
