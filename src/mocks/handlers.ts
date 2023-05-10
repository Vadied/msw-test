import { rest } from "msw";

const mockResponse = [{ name: "test 1" }, { name: " test n" }];

export const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockResponse))
  ),

  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ name: "test get one" }))
  ),

  rest.post("https://add_user.it", (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ name: "test post" }))
  ),
];
