import jwt from "jsonwebtoken";
import { PubSub } from "apollo-server";
const pubsub = new PubSub();

const middleware = (context) => {
  let token;
  if (context.req && context.req.headers.authorization) {
    token = context.req.headers.authorization.split("Bearer ")[1];
  } else if (context.connection && context.connection.context.Authorization) {
    token = context.connection.context.Authorization.split("Bearer ")[1];
  }

  if (token) {
    jwt.verify(token, "somesupersecretkey", (err, decodedToken) => {
      context.user = decodedToken;
    });
  }

  context.pubsub = pubsub;

  return context;
};

export default middleware;
