import { render, screen } from "@testing-library/react";
import { server } from "../mocks/server";
import { rest } from "msw";
import Character from "./Character";

describe("Character Profile", () => {
  test("renders correctly", () => {
    render(<Character id={1} />);
    const element = screen.getByText(/Character/i);
    expect(element).toBeInTheDocument();
  });

  test("renders character data correctly", async () => {
    render(<Character id={1} />);
    const element = await screen.findByText(/test/);
    expect(element).toBeInTheDocument();
  });

  test("renders error", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => res(ctx.status(500))
      )
    );
    render(<Character id={1} />);
    const element = await screen.findByText(/Error fetching user/i);
    expect(element).toBeInTheDocument();
  });
});
