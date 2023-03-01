import express from "express";
import { ApolloServer } from "apollo-server-express";
import logger from "morgan";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import { graphqlUploadExpress } from "graphql-upload";
import http from "http";
require("dotenv").config();

const PORT = process.env.PORT;
const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  context: async ({ req }) => {
    if (req) {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    }
  },
});

const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
app.use(graphqlUploadExpress());
apollo.applyMiddleware({ app });

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`);
});
