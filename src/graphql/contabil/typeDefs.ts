import { gql } from "apollo-server-core";

export default gql `
  type User {
    id: Int
    name: String
  }

  type Query {
    getUsers: [User]
  }
`