import express from "express";
import { ApolloServer } from "apollo-server-express";
import logger from "morgan";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
require("dotenv").config();

const PORT = process.env.PORT;
const apollo = new ApolloServer({
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
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });
app.listen({ port: PORT }, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
