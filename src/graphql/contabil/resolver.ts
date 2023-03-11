import { IResolvers } from 'graphql-tools';
const users = [ {
  id: 1, name: 'johnny'
}]

const resolvers: IResolvers = {
  Query: {
    getUsers: () => {
      return users
    }
  }
}

export {
  resolvers as contabilResolver
}