import bcrypt from "bcryptjs";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";

export default {
  Query: {
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User does not exist!");
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
          throw new Error("Password is incorrect!");
        } else {
          const token = jwt.sign(
            { userId: user.id, email: user.email, fullName: user.fullName },
            "somesupersecretkey",
            {
              expiresIn: "36000000000",
            }
          );
          return { token };
        }
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    getUser: async (_, { token }) => {
      console.log(token, "token");
      try {
        const decoded = jwt.verify(token, "somesupersecretkey");

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
          throw new Error("User does not exist!");
        }
        console.log(user);
        return user;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
  Mutation: {
    createUser: async (_, { email, password, fullName }) => {
      console.log(email, password, fullName, "hhee");
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("User exists already.");
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
          email,
          password: hashedPassword,
          fullName,
        });

        const result = await user.save();
        const token = jwt.sign(
          {
            userId: result._id,
            email: result.email,
            fullName: result.fullName,
          },
          "somesupersecretkey",
          {
            expiresIn: "360000000000",
          }
        );
        return { token };
        //   return { ...result._doc, password: null, _id: result.id };
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  },
};
