import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { processHastags } from "../photos.utils";

export default {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { loggedInUser }) => {
        const oldPhoto = await client.photo.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          include: {
            hashtags: {
              select: {
                hashtag: true,
              },
            },
          },
        });

        if (!oldPhoto) {
          return {
            ok: false,
            error: "사진을 찾을 수 없습니다.",
          };
        }

        const photo = await client.photo.update({
          where: {
            id,
          },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              connectOrCreate: processHastags(caption),
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
