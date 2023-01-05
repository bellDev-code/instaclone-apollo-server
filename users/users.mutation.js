import client from "../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      // check if username or email are already on DB
      const exsitingUser = await client.user.findFrist({
        where: {
          OR: [{ username }, { email }],
        },
      });
      console.log(exsitingUser);
      // hash password
      // save and return the user
    },
  },
};
