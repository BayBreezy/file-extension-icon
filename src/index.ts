// Main exports
export { getMaterialFileIcon, getMaterialFolderIcon } from "./api/material";
export { getVSIFileIcon, getVSIFolderIcon } from "./api/vsi";

// Type exports
export type * from "./types/icons";

// Utility exports
export { getIconFromMap, findIconInCollection } from "./utils/icon-map";
export { createDataUri, convertToBase64 } from "./utils/base64";
