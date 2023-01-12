import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

// 1. Protecting Resolver
// export const protectResolver = (user) => {
//   if (!user) {
//     throw new Error("로그인이 필요합니다.");
//   }
// };

// 2. Protecting Resolver : function-oriented Programming
export const protectResolver = (ourResolver) => (root, args, context, info) => {
  if (!context.loggedInUser) {
    return {
      ok: false,
      error: "이 작업을 수행하려면 로그인 해주세요.",
    };
  }
  return ourResolver(root, args, context, info);
};
