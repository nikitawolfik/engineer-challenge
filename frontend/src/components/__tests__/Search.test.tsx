/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "components/Search";

describe("Search input", () => {
  test("Snapshot", async () => {
    const { container } = render(
      <Search
        label="Hello label"
        name="Test name"
        value=""
        onChange={jest.fn()}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
