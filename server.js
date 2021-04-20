import { ApolloServer } from "apollo-server";
import connectDB from "./config/db.js";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/schema/index.js";
import contextMiddleware from "./middleware/contextMiddleware.js";
import dotenv from "dotenv";

dotenv.config();

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
});

const PORT = process.env.PORT || 5000;

connectDB();
server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
