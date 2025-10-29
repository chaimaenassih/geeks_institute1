import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      _id?: string;
      id?: string;
      email: string;
      role: "admin" | "member";
    };
  }
}
