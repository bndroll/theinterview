declare module "bun" {
  interface Env {
    PORT: number;

    POSTGRES_HOST: string;
    POSTGRES_PORT: number;
    POSTGRES_USERNAME: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DATABASE: string;

    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_PASSWORD: string;
  }
}
