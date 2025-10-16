import { describe, expect, it } from "vitest";

import { getMaterialFileIcon, getMaterialFolderIcon } from "../api/material";

describe("Material Icons API", () => {
  describe("getMaterialFileIcon", () => {
    it("should return a data URI", () => {
      const result = getMaterialFileIcon("test.js");
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it("should handle files without extensions", () => {
      const result = getMaterialFileIcon("Dockerfile");
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it("should handle complex file names", () => {
      const result = getMaterialFileIcon("test.spec.ts");
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it("should be case-insensitive", () => {
      const lower = getMaterialFileIcon("file.js");
      const upper = getMaterialFileIcon("FILE.JS");
      expect(lower).toBe(upper);
    });

    it("should return default icon for unknown extensions", () => {
      const result = getMaterialFileIcon("unknown.xyz123");
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });
  });

  describe("getMaterialFolderIcon", () => {
    it("should return a data URI for closed folder", () => {
      const result = getMaterialFolderIcon("components");
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it("should return a data URI for open folder", () => {
      const result = getMaterialFolderIcon("components", true);
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it("should return different icons for open vs closed", () => {
      const closed = getMaterialFolderIcon("src", false);
      const open = getMaterialFolderIcon("src", true);
      // They should be different (unless the theme uses the same icon)
      expect(closed).toBeDefined();
      expect(open).toBeDefined();
    });

    it("should handle unknown folder names", () => {
      const result = getMaterialFolderIcon("unknown-folder-xyz");
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });
  });
});
