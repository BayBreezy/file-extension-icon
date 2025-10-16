import { materialFileIcons } from "../data/material/file-icons";
import {
  materialFileExtensionsToIcons,
  materialFileNamesToIcons,
} from "../data/material/file-names";
import { materialFolderIcons, materialFolderIconsOpen } from "../data/material/folder-icons";
import { materialFolderNamesToIcons } from "../data/material/folder-names";
import { createDataUri } from "../utils/base64";
import { findIconInCollection, getIconFromMap } from "../utils/icon-map";

/**
 * Gets the Material Icon for a given file name
 * @param fileName - The file name (with or without extension)
 * @returns A base64-encoded SVG data URI
 *
 * @example
 * ```ts
 * const icon = getMaterialFileIcon('index.js');
 * // Returns: "data:image/svg+xml;base64,..."
 * ```
 */
export function getMaterialFileIcon(fileName: string): string {
  const lowerFileName = fileName.toLowerCase();
  const parts = lowerFileName.split(".");
  let iconName = "";

  // Try to match from most specific to least specific
  // e.g., for "test.spec.ts", try "test.spec.ts", then "spec.ts", then "ts"
  while (parts.length > 0) {
    const currentName = parts.join(".");

    // Check file names first (e.g., "package.json")
    const nameIcon = getIconFromMap(
      materialFileNamesToIcons,
      currentName as keyof typeof materialFileNamesToIcons
    );
    if (nameIcon) {
      iconName = nameIcon;
      break;
    }

    // Then check extensions (e.g., "json")
    const extIcon = getIconFromMap(
      materialFileExtensionsToIcons,
      currentName as keyof typeof materialFileExtensionsToIcons
    );
    if (extIcon) {
      iconName = extIcon;
      break;
    }

    parts.shift(); // Remove first part and try again
  }

  // Default to generic file icon if no match found
  if (!iconName) {
    iconName = "file";
  }

  // Find the icon in the collection
  const icon = findIconInCollection(materialFileIcons, iconName);

  return createDataUri(icon);
}

/**
 * Gets the Material Icon for a given folder name
 * @param folderName - The folder name
 * @param open - Whether to get the open folder icon (default: false)
 * @returns A base64-encoded SVG data URI
 *
 * @example
 * ```ts
 * const closedIcon = getMaterialFolderIcon('components');
 * const openIcon = getMaterialFolderIcon('components', true);
 * ```
 */
export function getMaterialFolderIcon(folderName: string, open = false): string {
  const lowerFolderName = folderName.toLowerCase();

  // Check if there's a specific icon for this folder name
  let iconName = getIconFromMap(
    materialFolderNamesToIcons,
    lowerFolderName as keyof typeof materialFolderNamesToIcons
  );

  // Default to generic folder icon if no match found
  if (!iconName) {
    iconName = "folder";
  }

  // Get the appropriate folder icon (open or closed)
  const iconMap = open ? materialFolderIconsOpen : materialFolderIcons;
  const icon =
    getIconFromMap(iconMap, iconName as keyof typeof iconMap) ||
    getIconFromMap(iconMap, "folder" as keyof typeof iconMap) ||
    "";

  return createDataUri(icon);
}
