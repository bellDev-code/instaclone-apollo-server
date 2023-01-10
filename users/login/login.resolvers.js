import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
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
