import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { username, page }) => {
      const aFollowers = await client.user
        .findUnique({
          where: { username },
        })
        .followers();
      console.log(aFollowers[0]);

      const bFolloweres = await client.user.findMany({
        where: {
          following: {
            some: {
              username,
            },
          },
        },
      });
      console.log(bFolloweres[0]);
    },
  },
};
