/**
 * @jest-environment jsdom
 */

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Select from "components/Select";

describe("Search input", () => {
  test("Snapshot", async () => {
    const { container } = render(
      <Select
        label="Hello label"
        name="Test name"
        value=""
        options={[
          ["one", "one"],
          ["two", "two"],
        ]}
        onChange={jest.fn()}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
