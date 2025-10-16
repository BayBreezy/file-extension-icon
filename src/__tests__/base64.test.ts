import { describe, expect, it } from "vitest";

import { convertToBase64, createDataUri } from "../utils/base64";

describe("Base64 utilities", () => {
  describe("convertToBase64", () => {
    it("should convert string to base64", () => {
      const input = "Hello, World!";
      const result = convertToBase64(input);
      expect(result).toBe("SGVsbG8sIFdvcmxkIQ==");
    });

    it("should handle empty strings", () => {
      const result = convertToBase64("");
      expect(result).toBe("");
    });

    it("should handle special characters", () => {
      const input = "<svg>test</svg>";
      const result = convertToBase64(input);
      expect(result).toBeTruthy();
      expect(typeof result).toBe("string");
    });

    it("should produce consistent output", () => {
      const input = "test";
      const result1 = convertToBase64(input);
      const result2 = convertToBase64(input);
      expect(result1).toBe(result2);
    });
  });

  describe("createDataUri", () => {
    it("should create valid data URI", () => {
      const svg = "<svg></svg>";
      const result = createDataUri(svg);
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it("should encode SVG content properly", () => {
      const svg = '<svg><circle r="10"/></svg>';
      const result = createDataUri(svg);
      expect(result).toContain("data:image/svg+xml;base64,");
      expect(result.length).toBeGreaterThan("data:image/svg+xml;base64,".length);
    });
  });
});
