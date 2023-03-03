import { Parameters, Story } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../src/providers/ThemeProvider";

const withThemeContext = (StoryComponent: Story) => {
  return (
    <ThemeProvider>
      <StoryComponent />
    </ThemeProvider>
  );
};

export const parameters: Parameters = {
  // Math tất cả props "on..." (onClick, ...)
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
  },
};

export const decorators = [withThemeContext]
