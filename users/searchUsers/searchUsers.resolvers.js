import client from "../../client";

// pagination 구현, 에러처리 구현
export default {
  Query: {
    searchUsers: async (_, { keywords }) =>
      client.user.findMany({
        where: {
          username: {
            startsWith: keywords.toLowerCase(),
          },
        },
      }),
  },
};
