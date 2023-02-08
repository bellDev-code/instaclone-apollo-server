import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleLike: protectedResolver(async (_, { id }, { loggedInUer }) => {
      const ok = await client.photo.findUnique({
        where: {
          id,
        },
      });

      if (!ok) {
        return {
          ok: false,
          error: "사진을 찾을 수 없습니다.",
        };
      }
    }),
  },
};
