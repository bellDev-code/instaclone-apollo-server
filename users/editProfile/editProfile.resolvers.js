import client from "../../client";
import bcrypt from "bcrypt";
import { createWriteStream } from "fs";
import { protectedResolver } from "../users.utils";

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  // 추후 aws 연결 시 사용하지 않는 코드 : node.js에서 파일 저장이 쉬운걸 보여주기 위해 사용
  const { filename, createReadStream } = await avatar;
  const readStream = createReadStream();
  const writeStream = createWriteStream(process.cwd() + "/uploads/" + filename);
  readStream.pipe(writeStream);

  // 1. prisma에 undefiend를 보내면 DB에 그 값들을 보내지 않는다.
  // 2. password hash : field에 별칭 선언 hashing 해준다.
  let uglyPassword = null;

  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10);
  }
  const updateUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      avatar,
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
};

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
};
