import { mergeTypeDefs } from 'graphql-tools'
import contabilSchema from './contabil/typeDefs'

export default mergeTypeDefs([
  contabilSchema
]);