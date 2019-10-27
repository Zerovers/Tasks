const graphql = require('graphql');

const {
  GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList,
} = graphql;

const movies = [
  {
    id: '1', name: 'test1', genre: 'genre1', directorId: 1,
  },
  {
    id: '5', name: 'test5', genre: 'genre5', directorId: 1,
  },
  {
    id: '2', name: 'test2', genre: 'genre2', directorId: 2,
  },
  {
    id: '3', name: 'test3', genre: 'genre3', directorId: 3,
  },
  {
    id: '4', name: 'test4', genre: 'genre4', directorId: 4,
  },
];

const directors = [
  { id: '1', name: 'newTest1', age: 55 },
  { id: '2', name: 'newTest2', age: 42 },
  { id: '3', name: 'newTest3', age: 32 },
  { id: '4', name: 'newTest4', age: 22 },
];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return directors.find(director => director.id === parent.id);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies.filter(movie => movie.directorId === parent.id);
      },
    },
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return movies.find(movie => movie.id === args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return directors.find(director => director.id === args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies;
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: Query,
});
