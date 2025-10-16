import { vsiFileIcons } from "../data/vsi/file-icons";
import { vsiFileExtensionsToIcons, vsiFileNamesToIcons } from "../data/vsi/file-names";
import { vsiFolderIcons, vsiFolderIconsOpen } from "../data/vsi/folder-icons";
import { vsiFolderNamesToIcons } from "../data/vsi/folder-names";
import { createDataUri } from "../utils/base64";
import { findIconInCollection, getIconFromMap } from "../utils/icon-map";

/**
 * Gets the VSCode Icon for a given file name
 * @param fileName - The file name (with or without extension)
 * @returns A base64-encoded SVG data URI
 *
 * @example
 * ```ts
 * const icon = getVSIFileIcon('index.ts');
 * // Returns: "data:image/svg+xml;base64,..."
 * ```
 */
export function getVSIFileIcon(fileName: string): string {
  const lowerFileName = fileName.toLowerCase();
  const parts = lowerFileName.split(".");
  let iconName = "";

  // Try to match from most specific to least specific
  while (parts.length > 0) {
    const currentName = parts.join(".");

    // Check file names first
    const nameIcon = getIconFromMap(
      vsiFileNamesToIcons,
      currentName as keyof typeof vsiFileNamesToIcons
    );
    if (nameIcon) {
      iconName = nameIcon;
      break;
    }

    // Then check extensions
    const extIcon = getIconFromMap(
      vsiFileExtensionsToIcons,
      currentName as keyof typeof vsiFileExtensionsToIcons
    );
    if (extIcon) {
      iconName = extIcon;
      break;
    }

    parts.shift();
  }

  // Default to generic file icon
  if (!iconName) {
    iconName = "file";
  }

  // Find the icon in the collection
  const icon = findIconInCollection(vsiFileIcons, iconName);

  return createDataUri(icon);
}

/**
 * Gets the VSCode Icon for a given folder name
 * @param folderName - The folder name
 * @param open - Whether to get the open folder icon (default: false)
 * @returns A base64-encoded SVG data URI
 *
 * @example
 * ```ts
 * const closedIcon = getVSIFolderIcon('src');
 * const openIcon = getVSIFolderIcon('src', true);
 * ```
 */
export function getVSIFolderIcon(folderName: string, open = false): string {
  const lowerFolderName = folderName.toLowerCase();

  // Check if there's a specific icon for this folder name
  let iconName = getIconFromMap(
    vsiFolderNamesToIcons,
    lowerFolderName as keyof typeof vsiFolderNamesToIcons
  );

  // Default to generic folder icon
  if (!iconName) {
    iconName = "folder";
  }

  // Get the appropriate folder icon (open or closed)
  const iconMap = open ? vsiFolderIconsOpen : vsiFolderIcons;
  const icon =
    getIconFromMap(iconMap, iconName as keyof typeof iconMap) ||
    getIconFromMap(iconMap, "folder" as keyof typeof iconMap) ||
    "";

  return createDataUri(icon);
}
