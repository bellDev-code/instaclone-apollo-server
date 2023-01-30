import client from "../../client";

// pagination 구현, 에러처리 구현
export default {
  Query: {
    searchUsers: async (_, { keywords, lastId }) => {
      if (keywords.length < 2) {
        return {
          ok: false,
          error: "두 글자 이상으로 검색해주세요.",
        };
      }
      const users = await client.user.findMany({
        where: {
          username: {
            startsWith: keywords.toLowerCase(),
          },
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && { cursor: { id: lastId } }),
      });
      return {
        ok: true,
        users,
      };
    },
  },
};
