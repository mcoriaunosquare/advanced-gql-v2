const { ApolloServer } = require('apollo-server');
const graphql = require('graphql-tag');

const typeDefs = graphql`
  type User {
    id: ID!
    username: String!
    createdAt: Int!
  }

  type Settings {
    user: User!
    theme: String!
  }

  input NewSettingsInput {
    user: ID!
    theme: String!
  }

  type Query {
    me: User!
    settings(user: ID!): Settings!
  }

  type Mutations {
    settings(input: NewSettingsInput!): Settings!
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        id: 1,
        username: 'mcoria',
        createdAt: 1234343
      };
    },
    settings(_, { user }) {
      return {
        user,
        theme: 'Light'
      };
    }
  },

  Mutations: {
    settings(_, { input }) {
      return input;
    }
  },

  Settings: {
    user() {
      return {
        id: 1,
        username: 'mcoria',
        createdAt: 1234343
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => console.log(`server running at ${url}`));
