import { describe, expect, it } from "vitest";
import type { IconCollection, IconMap } from "../types/icons";

import { findIconInCollection, getIconFromMap } from "../utils/icon-map";

describe("Icon Map Utilities", () => {
  describe("getIconFromMap", () => {
    it("should return icon name when key exists", () => {
      const map = {
        js: "javascript",
        ts: "typescript",
        "package.json": "npm",
      };
      expect(getIconFromMap(map, "js")).toBe("javascript");
      expect(getIconFromMap(map, "ts")).toBe("typescript");
      expect(getIconFromMap(map, "package.json")).toBe("npm");
    });

    it("should return undefined when key does not exist", () => {
      const map = {
        js: "javascript",
        ts: "typescript",
      };

      expect(getIconFromMap(map, "xyz")).toBeUndefined();
      expect(getIconFromMap(map, "unknown.txt")).toBeUndefined();
    });

    it("should handle empty maps", () => {
      const map = {};
      expect(getIconFromMap(map, "any")).toBeUndefined();
    });

    it("should be case-sensitive", () => {
      const map = {
        js: "javascript",
        JS: "javascript-uppercase",
      };

      expect(getIconFromMap(map, "js")).toBe("javascript");
      expect(getIconFromMap(map, "JS")).toBe("javascript-uppercase");
    });
  });

  describe("findIconInCollection", () => {
    it("should find icon in first map", () => {
      const map1: IconMap = { file: "<svg>file</svg>", js: "<svg>js</svg>" };
      const map2: IconMap = { ts: "<svg>ts</svg>" };
      const collection: IconCollection = [map1, map2];

      expect(findIconInCollection(collection, "file")).toBe("<svg>file</svg>");
      expect(findIconInCollection(collection, "js")).toBe("<svg>js</svg>");
    });

    it("should find icon in second map if not in first", () => {
      const map1: IconMap = { file: "<svg>file</svg>", js: "<svg>js</svg>" };
      const map2: IconMap = { ts: "<svg>ts</svg>", py: "<svg>py</svg>" };
      const collection: IconCollection = [map1, map2];

      expect(findIconInCollection(collection, "ts")).toBe("<svg>ts</svg>");
      expect(findIconInCollection(collection, "py")).toBe("<svg>py</svg>");
    });

    it("should return fallback SVG when icon not found", () => {
      const map1: IconMap = { file: "<svg>file</svg>" };
      const map2: IconMap = { ts: "<svg>ts</svg>" };
      const collection: IconCollection = [map1, map2];

      const result = findIconInCollection(collection, "unknown");
      expect(result).toContain("svg");
      expect(result).toContain("xmlns");
    });

    it("should handle empty collection", () => {
      const collection: IconCollection = [];
      const result = findIconInCollection(collection, "any");
      expect(result).toContain("svg");
    });

    it("should return first match when icon exists in multiple maps", () => {
      const map1: IconMap = { file: "<svg>file-v1</svg>" };
      const map2: IconMap = { file: "<svg>file-v2</svg>" };
      const collection: IconCollection = [map1, map2];

      expect(findIconInCollection(collection, "file")).toBe("<svg>file-v1</svg>");
    });
  });
});
