import { ApolloServer } from "apollo-server"
import { GraphQLError } from "graphql";
import { logger } from "./shared/logger/logger";
import { ContextFunction, PluginDefinition } from 'apollo-server-core';
import { contabilResolver } from "./graphql/contabil/resolver";
import contabilTypeDefs from "./graphql/contabil/typeDefs";
import cluster from 'cluster'
// import resolver from './graphql/resolvers'
// import typedef from './graphql/typeDefs'

const plugins: PluginDefinition[] = [];
const resolvers = [contabilResolver]
const typeDefs =  [contabilTypeDefs]

const startServer = async () => {
  try {
      if (cluster.isMaster) {
        const numWorkers = require('os').cpus().length;
    
        for (let i = 0; i < numWorkers; i++) {
          cluster.fork();
        }
    
        cluster.on('exit', (worker, code, signal) => {
          console.log(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
          console.log('Starting a new worker');
          cluster.fork();
        });
      } else {
        // Configuração do servidor Apollo aqui
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