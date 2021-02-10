const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { author: Author, resolvers: authResolvers } = require("./schema/author");
const { books: Book, resolvers: bookResolvers } = require("./schema/book");
var _= require('lodash/fp/object');

const Query = `
type Query { _empty: String }
type Mutation { _empty: String }
`;

// The resolvers
// const resolvers = {
//   ...bookResolvers,
//   ...authResolvers,
// };
// const allRules = Object.assign({}, bookResolvers, authResolvers);
const resolvers = _.merge(bookResolvers, authResolvers);
// console.log(resolvers, allRules, _.merge(bookResolvers, authResolvers));

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs: [Query, Author, Book],
  resolvers,
});

const authUser = (req) => {
  return { user: 1234, role: "admin" };
};
// Initialize the app
const app = express();

// The GraphQL endpoint
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
//option 2
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress((req) => {
    const reqUser = authUser(req);
    return {
      schema,
      context: { auth: reqUser },
      customFormatErrorFn: (err) => {
        if (err.originalError && err.originalError.error_message) {
          err.message = "myMesage";
        }
        err.message = "you will be okay";
        return err;
      },
    };
  })
);
//option 3
// var reqUser;
// app.use((req, res, next)=> {
//   reqUser = authUser(req);
//   next();
// })

// app.use('/graphql', bodyParser.json(), graphqlExpress({
//     schema,
//     context: {auth: reqUser}
//   }));

// GraphiQL, a visual editor for queries
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Start the server
app.listen(3000, () => {
  console.log("Go to http://localhost:3000/graphiql to run queries!");
});
