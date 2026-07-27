declare global {
  interface D1Database {}

  interface Fetcher {
    fetch(request: Request, init?: RequestInit): Promise<Response>;
  }
}

declare module "cloudflare:workers" {
  export const env: {
    DB?: D1Database;
  };
}

export {};
