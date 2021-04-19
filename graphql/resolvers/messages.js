import Message from "../../models/Message.js";
import Group from "../../models/Group.js";
import { withFilter } from "apollo-server";

export default {
  Query: {
    getMessages: async (_, { group }, { user }) => {
      if (!user) {
        throw new Error("UnAuthorized");
      }

      try {
        const messages = await Message.find({ group });

        return messages;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    getOneGroup: async (_, { id }) => {
      try {
        console.log(id);
        const group = await Group.findById(id);

        return group;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    getGroups: async () => {
      try {
        const groups = await Group.find();

        return groups;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Mutation: {
    createMessage: async (_, { content, group }, { user, pubsub }) => {
      if (!user) {
        throw new Error("UnAuthorized");
      }
      console.log(content, group, "hehe", { user });

      try {
        const { userId, fullName: userName } = user;
        const message = new Message({
          content,
          group,
          sender: {
            userId,
            userName,
          },
        });

        const result = await message.save();
        pubsub.publish("NEW_MESSAGE", { newMessage: message });
        console.log(result, "result");
        return result;
        //   return { ...result._doc, password: null, _id: result.id };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    createGroup: async (_, { name, image }) => {
      try {
        const group = new Group({
          name,
          image,
        });

        const result = await group.save();
        console.log(result, "result");
        return result;
        //   return { ...result._doc, password: null, _id: result.id };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },

  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (_, __, { user, pubsub }) => {
          if (!user) throw new Error("Unauthorised");
          return pubsub.asyncIterator(["NEW_MESSAGE"]);
        },
        () => true
      ),
    },
  },
};

// subscribe: () => {
//   return pubsub.asyncIterator(["NEW_MESSAGE"]);
// },
