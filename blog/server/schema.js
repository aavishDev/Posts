const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLBoolean,
} = require("graphql");
const moment = require("moment");

const momentRandomDate = (end = moment(), start) => {
  const endTime = +moment(end);
  const randomNumber = (to, from = 0) =>
    Math.floor(Math.random() * (to - from) + from);

  if (start) {
    const startTime = +moment(start);
    if (startTime > endTime) {
      throw new Error("End date is before start date!");
    }
    return moment(randomNumber(endTime, startTime));
  }
  return moment(randomNumber(endTime));
};

const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    userId: {
      type: GraphQLInt,
    },
    title: {
      type: GraphQLString,
    },
    body: {
      type: GraphQLString,
    },
    read: {
      type: GraphQLBoolean,
    },
    createdAt: {
      type: GraphQLString,
    },
  }),
});

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    name: {
      type: GraphQLString,
    },
    catchPhrase: {
      type: GraphQLString,
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    username: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    company: {
      type: CompanyType,
    },
  }),
});

const rootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then((res) => {
            return res.data.map((posts) => ({
              ...posts,
              createdAt: momentRandomDate().format("YYYY-MM-DD"),
              read: false
            }));
          });
      },
    },
    post: {
      type: PostType,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve(parentValue, args) {
        return axios
          .get(`https://jsonplaceholder.typicode.com/posts/${args.id}`)
          .then((res) => res.data);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get("https://jsonplaceholder.typicode.com/users")
          .then((res) => res.data);
      },
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve(parentValue, args) {
        return axios
          .get(`https://jsonplaceholder.typicode.com/users/${args.id}`)
          .then((res) => res.data);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    deletePost: {
      type: GraphQLBoolean,
      args: {
        id: {
          type: GraphQLInt,
        },
      },
      resolve(parentValue, args) {
        return Math.random() < 0.5;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: mutation,
});
