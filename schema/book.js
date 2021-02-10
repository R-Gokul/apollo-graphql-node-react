const books = [
    {
      title: "Harry Potter and the Sorcerer's stone",
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
  ];

module.exports.books = `
  type Book {
    title: String
    author: Author
  }
  extend type Query { books: [Book] }
  extend type Mutation { addBook(title:String!, author: String): Book}
`;

module.exports.resolvers = {
  Query: {
    books: (obj, args, context, info) => {
      console.log(context.auth);
      return books;
    },
  },
  Mutation:{
      addBook:(obj, args, context)=>{
        console.log("args", args);
        console.log("obj", obj);
        const { title, author} = args
        books.push({title, author:author||'unknown'})
        return books[books.length-1];
      }
    }
};
