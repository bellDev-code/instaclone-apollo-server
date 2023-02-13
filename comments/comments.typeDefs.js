import { gql } from "apollo-server";

export default gql`
  type Comment {
    id: Int!
    payload: String!
    user: User!
    photo: Photo!
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;
