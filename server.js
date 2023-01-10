import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
require("dotenv").config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjczMzM2NjI5fQ.7ljBS09YLSOufA3QmbKL8mXXH8E_nTwinyhtnybAK3Q",
  },
});

const PORT = process.env.PORT;

server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}/`));
