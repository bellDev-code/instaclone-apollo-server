import { gql } from "apollo-server";

export default gql`
  type Mutation {
    sendMessage(payload: String!, userId: Int, roomId: Int): MutationResponse!
  }
`;
