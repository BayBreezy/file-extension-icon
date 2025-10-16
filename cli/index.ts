#!/usr/bin/env node
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { cancel, intro, isCancel, outro, select, spinner, text } from "@clack/prompts";
import { program } from "commander";
import pc from "picocolors";

import {
  materialFileExtensionsToIcons,
  materialFileNamesToIcons,
} from "../src/data/material/file-names.js";
import { materialFolderNamesToIcons } from "../src/data/material/folder-names.js";
import { vsiFileExtensionsToIcons, vsiFileNamesToIcons } from "../src/data/vsi/file-names.js";
import { vsiFolderNamesToIcons } from "../src/data/vsi/folder-names.js";
import {
  getMaterialFileIcon,
  getMaterialFolderIcon,
  getVSIFileIcon,
  getVSIFolderIcon,
} from "../src/index.js";

// Dynamic import for clipboard to avoid bundling issues
async function copyToClipboard(text: string): Promise<void> {
  try {
    const clipboardy = await import("clipboardy");
    await clipboardy.default.write(text);
  } catch (error) {
    throw new Error("Clipboard not available: " + (error as Error).message);
  }
}

interface CliOptions {
  theme?: "material" | "vscode";
  type?: "file" | "folder";
  name?: string;
  output?: string;
  copy?: boolean;
}

program
  .name("file-icon")
  .description("Get file and folder icons in your terminal")
  .version("0.0.1")
  .option("-t, --theme <theme>", "Icon theme (material|vscode)")
  .option("-y, --type <type>", "Icon type (file|folder)")
  .option("-n, --name <name>", "File or folder name")
  .option("-o, --output <file>", "Output file path")
  .option("-c, --copy", "Copy to clipboard")
  .action(async (options: CliOptions) => {
    await runCLI(options);
  });

async function runCLI(options: CliOptions) {
  console.clear();

  intro(pc.bgCyan(pc.black(" File Extension Icon CLI ")));

  try {
    // Step 1: Select theme
    let theme = options.theme;
    if (!theme) {
      const themeChoice = await select({
        message: "Which icon theme do you want to use?",
        options: [
          { value: "material", label: "Material Icon Theme", hint: "Modern, colorful icons" },
          { value: "vscode", label: "VSCode Icons", hint: "Classic VSCode style" },
        ],
      });

      if (isCancel(themeChoice)) {
        cancel("Operation cancelled");
        return process.exit(0);
      }

      theme = themeChoice as "material" | "vscode";
    }

    // Step 2: Select type
    let type = options.type;
    if (!type) {
      const typeChoice = await select({
        message: "What type of icon do you need?",
        options: [
          { value: "file", label: "File Icon", hint: "For file extensions" },
          { value: "folder", label: "Folder Icon", hint: "For folder names" },
        ],
      });

      if (isCancel(typeChoice)) {
        cancel("Operation cancelled");
        return process.exit(0);
      }

      type = typeChoice as "file" | "folder";
    }

    // Step 3: Get available icons
    const availableIcons = getAvailableIcons(theme, type);

    // Step 4: Select icon or enter name
    let iconName = options.name;
    if (!iconName) {
      const searchOrSelect = await select({
        message: "How would you like to find your icon?",
        options: [
          { value: "search", label: "Search by name", hint: "Enter a file/folder name" },
          { value: "browse", label: "Browse all icons", hint: "Select from a list" },
        ],
      });

      if (isCancel(searchOrSelect)) {
        cancel("Operation cancelled");
        return process.exit(0);
      }

      if (searchOrSelect === "search") {
        const searchInput = await text({
          message: `Enter ${type} name:`,
          placeholder: type === "file" ? "index.js" : "components",
          validate(value) {
            if (!value) return "Name is required";
          },
        });

        if (isCancel(searchInput)) {
          cancel("Operation cancelled");
          return process.exit(0);
        }

        iconName = searchInput;
      } else {
        // Browse mode - show paginated list
        const iconOptions = availableIcons.slice(0, 50).map((name) => ({
          value: name,
          label: name,
        }));

        if (availableIcons.length > 50) {
          iconOptions.push({
            value: "__more__",
            label: pc.dim(`... and ${availableIcons.length - 50} more (use search instead)`),
          });
        }

        const selected = await select({
          message: `Select a ${type} icon:`,
          options: iconOptions,
        });

        if (isCancel(selected)) {
          cancel("Operation cancelled");
          return process.exit(0);
        }

        if (selected === "__more__") {
          cancel("Too many options. Please use search mode instead.");
          return process.exit(0);
        }

        iconName = selected as string;
      }
    }

    // Step 5: Get the icon data
    const s = spinner();
    s.start("Generating icon...");

    const iconData = await generateIcon(theme, type, iconName);

    s.stop(pc.green("✓ Icon generated successfully!"));

    // Step 6: Display the icon info
    console.log("");
    console.log(pc.cyan("Icon Details:"));
    console.log(pc.dim("─".repeat(50)));
    console.log(`${pc.bold("Theme:")} ${theme}`);
    console.log(`${pc.bold("Type:")} ${type}`);
    console.log(`${pc.bold("Name:")} ${iconName}`);
    console.log(`${pc.bold("Size:")} ${(iconData.length / 1024).toFixed(2)} KB`);
    console.log(pc.dim("─".repeat(50)));
    console.log("");

    // Step 7: Output options
    const outputs: string[] = [];

    // Check for non-interactive flags
    if (options.copy) {
      outputs.push("clipboard");
    }
    if (options.output) {
      outputs.push("file");
    }

    // If no flags, ask interactively
    if (outputs.length === 0) {
      const outputChoice = await select({
        message: "What would you like to do with the icon?",
        options: [
          { value: "display", label: "Display in terminal", hint: "Show the base64 data" },
          { value: "clipboard", label: "Copy to clipboard", hint: "Ready to paste" },
          { value: "file", label: "Save to file", hint: "Export as .txt file" },
          { value: "all", label: "All of the above", hint: "Do everything!" },
        ],
      });

      if (isCancel(outputChoice)) {
        cancel("Operation cancelled");
        return process.exit(0);
      }

      if (outputChoice === "all") {
        outputs.push("display", "clipboard", "file");
      } else {
        outputs.push(outputChoice as string);
      }
    }

    // Execute outputs
    for (const output of outputs) {
      if (output === "display") {
        console.log(pc.cyan("\nIcon Data (Base64):"));
        console.log(pc.dim("─".repeat(50)));
        console.log(pc.gray(iconData.substring(0, 100) + "..."));
        console.log(pc.dim(`(${iconData.length} characters total)`));
        console.log(pc.dim("─".repeat(50)));
      }

      if (output === "clipboard") {
        const s = spinner();
        s.start("Copying to clipboard...");
        try {
          await copyToClipboard(iconData);
          s.stop(pc.green("✓ Copied to clipboard!"));
        } catch (error) {
          s.stop(pc.red("✗ Failed to copy to clipboard"));
          console.error(pc.red((error as Error).message));
        }
      }

      if (output === "file") {
        let filePath = options.output;

        if (!filePath) {
          const fileInput = await text({
            message: "Enter output file path:",
            placeholder: `${iconName}-icon.txt`,
            initialValue: `${iconName.replace(/[^a-z0-9]/gi, "-")}-icon.txt`,
          });

          if (isCancel(fileInput)) {
            cancel("File save cancelled");
            continue;
          }

          filePath = fileInput;
        }

        const s = spinner();
        s.start("Saving to file...");
        try {
          const fullPath = join(process.cwd(), filePath);
          await writeFile(fullPath, iconData, "utf-8");
          s.stop(pc.green(`✓ Saved to ${pc.bold(filePath)}`));
        } catch (error) {
          s.stop(pc.red("✗ Failed to save file"));
          console.error(pc.red((error as Error).message));
        }
      }
    }

    console.log("");
    outro(pc.green("Done! Happy coding! 🚀"));
  } catch (error) {
    console.error(pc.red("\n✗ Error:"), (error as Error).message);
    process.exit(1);
  }
}

function getAvailableIcons(theme: string, type: string): string[] {
  if (theme === "material") {
    if (type === "file") {
      const extensions = Object.keys(materialFileExtensionsToIcons);
      const names = Object.keys(materialFileNamesToIcons);
      return [...new Set([...extensions, ...names])].sort();
    } else {
      return Object.keys(materialFolderNamesToIcons).sort();
    }
  } else {
    // vscode
    if (type === "file") {
      const extensions = Object.keys(vsiFileExtensionsToIcons);
      const names = Object.keys(vsiFileNamesToIcons);
      return [...new Set([...extensions, ...names])].sort();
    } else {
      return Object.keys(vsiFolderNamesToIcons).sort();
    }
  }
}

async function generateIcon(theme: string, type: string, name: string): Promise<string> {
  if (theme === "material") {
    if (type === "file") {
      return getMaterialFileIcon(name);
    } else {
      return getMaterialFolderIcon(name);
    }
  } else {
    // vscode
    if (type === "file") {
      return getVSIFileIcon(name);
    } else {
      return getVSIFolderIcon(name);
    }
  }
}

program.parse();
