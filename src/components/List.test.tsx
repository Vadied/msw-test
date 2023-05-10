import { rest } from "msw";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { server } from "../mocks/server";
import List from "./List";

describe("user List", () => {
  test("renders correctly", () => {
    render(<List />);
    const element = screen.getByText(/users/i);
    expect(element).toBeInTheDocument();
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("renders users correctly", async () => {
    render(<List />);
    const users = await screen.findAllByRole("listitem");
    expect(users).toHaveLength(2);
  });

  test("renders error", async () => {
    server.use(
      rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) =>
        res(ctx.status(500))
      )
    );
    render(<List />);
    const element = await screen.findByText(/Error fetching users/i);
    expect(element).toBeInTheDocument();
  });

  test("renders post correctly", async () => {
    render(<List />);
    const users = await screen.findAllByRole("listitem");
    expect(users).toHaveLength(2);
    const button = screen.getByRole("button");
    user.click(button);
    const postResponse = await screen.findByText(/test post/i);
    expect(postResponse).toBeInTheDocument();
    const newUsers = await screen.findAllByRole("listitem");
    expect(newUsers).toHaveLength(3);
  });

  test("renders post with error", async () => {
    server.use(
      rest.post("https://add_user.it", (req, res, ctx) => res(ctx.status(500)))
    );
    render(<List />);
    const users = await screen.findAllByRole("listitem");
    expect(users).toHaveLength(2);
    const button = screen.getByRole("button");
    user.click(button);
    const element = await screen.findByText(/Error saving new users/i);
    expect(element).toBeInTheDocument();
    const newUsers = await screen.findAllByRole("listitem");
    expect(newUsers).toHaveLength(2);
  });
});
