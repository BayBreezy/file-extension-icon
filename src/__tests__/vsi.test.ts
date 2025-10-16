import { describe, expect, it } from "vitest";

import { getVSIFileIcon, getVSIFolderIcon } from "../api/vsi";

describe("VSI Icons API", () => {
  describe("getVSIFileIcon", () => {
    it("should return a data URI", () => {
      const result = getVSIFileIcon("test.ts");
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it("should handle files without extensions", () => {
      const result = getVSIFileIcon("Makefile");
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it("should handle complex file names", () => {
      const result = getVSIFileIcon("jest.config.js");
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it("should be case-insensitive", () => {
      const lower = getVSIFileIcon("file.ts");
      const upper = getVSIFileIcon("FILE.TS");
      expect(lower).toBe(upper);
    });

    it("should return default icon for unknown extensions", () => {
      const result = getVSIFileIcon("unknown.xyz123");
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });
  });

  describe("getVSIFolderIcon", () => {
    it("should return a data URI for closed folder", () => {
      const result = getVSIFolderIcon("node_modules");
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it("should return a data URI for open folder", () => {
      const result = getVSIFolderIcon("node_modules", true);
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it("should return different icons for open vs closed", () => {
      const closed = getVSIFolderIcon("dist", false);
      const open = getVSIFolderIcon("dist", true);
      expect(closed).toBeDefined();
      expect(open).toBeDefined();
    });

    it("should handle unknown folder names", () => {
      const result = getVSIFolderIcon("unknown-folder-xyz");
      expect(result).toMatch(/^data:image\/svg\+xml;base64,/);
    });
  });
});
