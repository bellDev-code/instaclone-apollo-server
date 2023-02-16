import client from "../../client";
import { protectedResolver } from "../../users/users.utils";

export default {
  Mutation: {
    editComment: protectedResolver(
      async (_, { id, payload }, { loggedInUser }) => {
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
            error: "해당 댓글이 존재하지 않습니다.",
          };
        } else if (comment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "해당 댓글에 대한 수정 권한이 없습니다.",
          };
        } else {
          await client.comment.update({
            data: {
              payload,
            },
          });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
