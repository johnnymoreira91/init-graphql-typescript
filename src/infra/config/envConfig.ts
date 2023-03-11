export type Environment = "local" | "dev" | "prd";

export const environment: Environment =
  (process.env.ENVIRONMENT as Environment) || 'local';

export const serviceName = 'br-contabil-service';
