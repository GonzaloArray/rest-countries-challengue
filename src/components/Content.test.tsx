import { render, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest/dist/index.js";
import { Content } from "./Content";
import { DarkModeProvider } from "../context/DarkModeProvider";
import { BrowserRouter } from "react-router-dom";

describe("FlagsFilter", () => {
  test("Filter flags when reading to input", () => {
    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <DarkModeProvider>
          <Content />
        </DarkModeProvider>
      </BrowserRouter>
    );

    const input = getByPlaceholderText("Search for a country...");

    fireEvent.change(input, { target: { value: "Argentina" } });

    const argentinaFlag = getByText("Argentina");

    expect(argentinaFlag).toBeDefined();
  });
});
