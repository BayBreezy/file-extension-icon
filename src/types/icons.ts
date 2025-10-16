import {
  materialFileExtensionsToIcons,
  materialFileNamesToIcons,
} from "../data/material/file-names";
import { materialFolderNamesToIcons } from "../data/material/folder-names";
import { vsiFileExtensionsToIcons, vsiFileNamesToIcons } from "../data/vsi/file-names";
import { vsiFolderNamesToIcons } from "../data/vsi/folder-names";

/**
 * Represents a mapping from icon names to their SVG content
 */
export type IconMap = Record<string, string>;

/**
 * Represents a collection of icon maps (for split icon files)
 */
export type IconCollection = IconMap[];

/**
 * Options for getting folder icons
 */
export interface FolderIconOptions {
  /** Whether to get the open folder icon */
  open?: boolean;
}

/**
 * The Material File Extension Keys
 */
export type MaterialFileExtensionKeys = keyof typeof materialFileExtensionsToIcons;

/**
 * The Material File Name Keys
 */
export type MaterialFileNameKeys = keyof typeof materialFileNamesToIcons;

/**
 * The Material Folder Name Keys
 */
export type MaterialFolderNameKeys = keyof typeof materialFolderNamesToIcons;

/**
 * The VSCode File Extension Keys
 */
export type VSIFileExtensionKeys = keyof typeof vsiFileExtensionsToIcons;

/**
 * The VSCode File Name Keys
 */
export type VSIFileNameKeys = keyof typeof vsiFileNamesToIcons;

/**
 * The VSCode Folder Name Keys
 */
export type VSIFolderNameKeys = keyof typeof vsiFolderNamesToIcons;
