import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    editProfile: async (
      _,
      { firstName, lastName, username, email, password: newPassword, token }
    ) => {
      // 1. prisma에 undefiend를 보내면 DB에 그 값들을 보내지 않는다.
      // 2. password hash : field에 별칭 선언 hashing 해준다.
      let uglyPassword = null;

      if (newPassword) {
        uglyPassword = await bcrypt.hash(newPassword, 10);
      }
      // 3. 유저 update를 token을 활용
      // { id: 1, iat: 1673336629 }
      const { id } = await jwt.verify(token, process.env.SECRET_KEY);

      const updateUser = await client.user.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          username,
          email,
          // ES6 문법 : uglyPassword가 ture면 {}를 return
          ...(uglyPassword && { password: uglyPassword }),
        },
      });
      if (updateUser) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "프로필을 업데이트 할 수 없습니다.",
        };
      }
    },
  },
};
