/**
 * Converts a string to base64 encoding
 * Works in both Node.js and browser environments
 */
export function convertToBase64(input: string): string {
  // Node.js environment - use dynamic access to avoid type issues
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g = globalThis as any;

  if (g.Buffer !== undefined) {
    return g.Buffer.from(input).toString("base64");
  }

  // Browser environment
  if (g.btoa !== undefined) {
    return g.btoa(input);
  }

  throw new Error("No base64 encoding method available");
}

/**
 * Creates a data URI from SVG content
 */
export function createDataUri(svgContent: string): string {
  return `data:image/svg+xml;base64,${convertToBase64(svgContent)}`;
}
