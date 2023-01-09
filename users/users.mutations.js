import client from "../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        // check if username or email are already on DB.
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existingUser) {
          throw new Error("username 또는 email이 존재합니다.");
        }
        // hash password
        const uglyPassword = await bcrypt.hash(password, 10);
        // save and return user
        return client.user.create({
          data: {
            username,
            email,
            firstName,
            lastName,
            password: uglyPassword,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    login: async (_, { username, password }) => {
      // find user with args.username
      const user = await client.user.findFirst({
        where: { username },
      });

      if (!user) {
        return {
          ok: false,
          error: "유저를 찾지 못하였습니다.",
        };
      }
      // check password with args.password
      const succesPassword = await bcrypt.compare(password, user.password);

      if (!succesPassword) {
        return {
          ok: false,
          error: "잘못된 패스워드입니다.",
        };
      }
      // issue a token and send it to the user
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
