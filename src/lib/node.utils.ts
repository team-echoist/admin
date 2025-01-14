import React from "react";

export function hasValidChildren(children: React.ReactNode): boolean {
  return React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) ||
      typeof child === "string" ||
      typeof child === "number"
  );
}
