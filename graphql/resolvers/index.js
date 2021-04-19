import auth from "./auth.js";
import messages from "./messages.js";

export default {
  Query: {
    ...auth.Query,
    ...messages.Query,
  },
  Mutation: {
    ...auth.Mutation,
    ...messages.Mutation,
  },
  Subscription: {
    ...messages.Subscription,
  },
};
