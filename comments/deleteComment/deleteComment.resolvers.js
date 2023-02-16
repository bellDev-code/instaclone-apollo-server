import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteComment: protectedResolver(async (_, { id }, { loggedInUser }) => {
      const comment = await client.comment.findUnique({
        where: {
          id,
        },
        select: {
          userId: true,
        },
      });
      if (!comment) {
        return {
          ok: false,
          error: "해당 댓글이 없습니다.",
        };
      } else if (comment.userId !== loggedInUser.id) {
        return {
          ok: false,
          error: "해당 댓글에 대한 삭제 권한이 없습니다.",
        };
      } else {
        await client.comment.delete({
          where: {
            id,
          },
        });
      }
      return {
        ok: true,
      };
    }),
  },
};
