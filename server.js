import { ApolloServer } from "apollo-server";
import connectDB from "./config/db.js";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/schema/index.js";
import contextMiddleware from "./middleware/contextMiddleware.js";
// const connectDB = require("./config/db");

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
});

connectDB();
server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
