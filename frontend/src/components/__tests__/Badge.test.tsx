/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Badge from "components/Badge";

describe("Search input", () => {
  test("Snapshot", async () => {
    const { container, rerender } = render(<Badge status="ACTIVE" />);

    expect(container).toMatchSnapshot();

    rerender(<Badge status="CANCELLED" />);
    expect(container).toMatchSnapshot();

    rerender(<Badge status="DROPPED_OUT" />);
    expect(container).toMatchSnapshot();

    rerender(<Badge status="PENDING" />);
    expect(container).toMatchSnapshot();
  });
});
