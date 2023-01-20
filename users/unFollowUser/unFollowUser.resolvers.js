import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    unFollowUser: protectedResolver(
      async (_, { username }, { loggedInUser }) => {
        const ok = await client.user.findUnique({
          where: { username },
        });

        if (!ok) {
          return {
            ok: false,
            error: "해당 username은 존재하지 않아 언팔로우를 할 수 없습니다.",
          };
        }
        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: {
              disconnect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
