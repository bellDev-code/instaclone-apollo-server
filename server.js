import express from "express";
import { ApolloServer } from "apollo-server-express";
import logger from "morgan";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
require("dotenv").config();

// 지금 setup의 한계 url을 변경할 수 없다.
const PORT = process.env.PORT;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
    };
  },
});

const app = express();
app.use(logger("tiny"));
server.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
