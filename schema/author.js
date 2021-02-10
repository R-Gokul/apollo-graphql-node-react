const authors = [
    {
      id: 1,
      firstName: 'J.K',
      lastName: "Michael"
    },
    {
        id: 2,
        firstName: 'Jo',
        lastName: "Honey"
    },
  ];
module.exports.author= `
  type Author {
    id: Int!
    firstName: String
    lastName: String
    books: [Book]
  }
  extend type Query { authors: [Author] }
  extend type Mutation { addAuth(id: ID!, firstName: String, lastName:String): Book}
`;


module.exports.resolvers = {
    Query: {
        authors: (obj, args, context, info) => {
        console.log(context.auth);
        return authors;
      },
    }
  };