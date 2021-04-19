const typeDefs = `
  type Query {
    getUser(token: String!): UserData!
    login(email: String!, password: String!): User!
    getMessages(group: String!): [Message]!
    getGroups: [Group]!
    getOneGroup(id: String): Group!
  }

  type UserData {
    _id: ID!
    fullName: String!
    email: String!
  }
  type Group {
    _id: ID
    image: String
    name: String
  }

  type Message {
      _id: ID!
   content: String!
   group: String!
   createdAt:String!
   sender: Sender
  }

 type Sender {
    
        userId: String!
        userName: String!
    
 } 



  type User {
    token: String!
  }


  type Mutation {
    createUser(email: String!, password: String!, fullName: String!): User
    createMessage(content: String!,group: String!): Message
    createGroup(name: String!,image: String!): Group
  }

  type Subscription{
    newMessage: Message!
  }

`;
export default typeDefs;
