import { mergeResolvers } from "graphql-tools";
import { contabilResolver} from './contabil/resolver'

export default mergeResolvers({
    contabilResolver
})