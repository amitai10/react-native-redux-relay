import {
GraphQLSchema,
GraphQLObjectType,
GraphQLList,
GraphQLInt,
GraphQLString

} from 'graphql';

let data = [
  {
    _id: 123,
    title: '567',
    url: '6666666'
  },
  {
    _id: 1233,
    title: '567',
    url: 'rtrtrt'
  }
]

let linkType = new GraphQLObjectType({
  name: 'Link',
  fields: () => ({
    _id: { type: GraphQLInt },
    title: { type: GraphQLString},
    url: { type: GraphQLString}
  })
})

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      data: {
        type: new GraphQLList(linkType),
        resolve: () => data
      },
    })
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      incrementCounter: {
        type: GraphQLInt,
        resolve: () => ++counter
      },
    })
  })
});

export default schema;