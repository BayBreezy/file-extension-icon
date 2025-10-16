import type { IconCollection, IconMap } from "../types/icons";

/**
 * Safely retrieves an icon name from an icon map with full type safety
 * @param map - The icon map to search
 * @param key - The key to look up
 * @returns The icon name if found, undefined otherwise
 *
 * @example
 * ```ts
 * // With type inference
 * const icon = getIconFromMap(materialFileExtensionsToIcons, 'js'); // TypeScript knows valid keys!
 * ```
 */
export function getIconFromMap<T extends IconMap>(map: T, key: keyof T): T[keyof T] | undefined {
  if (key in map) {
    return map[key as keyof T];
  }
  return undefined;
}

/**
 * Finds an icon in a collection of icon maps
 * @param collection - Array of icon maps to search
 * @param iconName - The icon name to find
 * @returns The SVG string if found, fallback SVG otherwise
 */
export function findIconInCollection(collection: IconCollection, iconName: string): string {
  for (const iconMap of collection) {
    const icon = getIconFromMap(iconMap, iconName);
    if (icon) {
      return icon;
    }
  }
  // Return empty SVG as fallback
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/></svg>';
}
