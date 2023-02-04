import client from "../client";

// computed fields
export default {
  Photo: {
    // example: (parent) => {
    // console.log(parent)
    // }
    user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    hashtags: ({ id }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
  },
};
