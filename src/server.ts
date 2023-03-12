import { ApolloServer } from "apollo-server"
import { GraphQLError } from "graphql";
import { logger } from "./shared/logger/logger";
import { ContextFunction, PluginDefinition } from 'apollo-server-core';
import { contabilResolver } from "./graphql/contabil/resolver";
import contabilTypeDefs from "./graphql/contabil/typeDefs";
import cluster from 'cluster'
import os from 'os'


const numCPUs = os.cpus().length

const plugins: PluginDefinition[] = [];
const resolvers = [contabilResolver]
const typeDefs =  [contabilTypeDefs]

const startServer = async () => {
  try {
      if (cluster.isMaster) {    
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
        }
    
        cluster.on('exit', (worker, code, signal) => {
          console.log(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
          console.log('Starting a new worker');
          cluster.fork();
        });
      } else {
           const server = new ApolloServer({
          typeDefs,
          resolvers,
          logger,
          plugins,
          formatError: (error: GraphQLError) => {
            logger.error(error.message)
            return error;
          },
        });
    
        const { url } = await server.listen({ port: 4000 });
        logger.info(`🚀 Server ready at ${url}`);
      }
    
  } catch (error) {
    logger.error((error as Error).message)
  }
}

startServer()