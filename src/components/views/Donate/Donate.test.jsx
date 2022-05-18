import { render, screen } from "@testing-library/react";
import Donate from "./Donate";

describe("renderizado en Donate", () => {
  it("renderiza un h1", () => {
    render(<Donate />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Colabora con el proyecto",
      })
    ).toBeInTheDocument();
  });

  it("renderiza un a", () => {
    render(<Donate />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://mpago.la/1x1sKAg"
    );
  });

  it("renderiza un a con target _blank", () => {
    render(<Donate />);

    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });
});
