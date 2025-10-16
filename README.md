# @baybreezy/file-extension-icon

![Demo Cover Image](/cover.jpeg)

> Modern, TypeScript-first package for file and folder extension-specific Material and VSCode icons

A complete rewrite of [`file-extension-icon-js`](https://github.com/minhazmiraz/file-extension-icon-JS) using modern TypeScript, ESM-first approach, and the UnJS ecosystem for optimal performance and developer experience.

[![npm version](https://img.shields.io/npm/v/@baybreezy/file-extension-icon)](https://www.npmjs.com/package/@baybreezy/file-extension-icon)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@baybreezy/file-extension-icon)](https://bundlephobia.com/package/@baybreezy/file-extension-icon)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 **Two icon themes**: Material Icon Theme & VSCode Icons
- 🔷 **TypeScript**: Full type safety with comprehensive type definitions
- 📦 **Zero dependencies**: No runtime dependencies
- 🌳 **Tree-shakeable**: Only bundle what you use
- 🔄 **Dual format**: ESM and CommonJS support
- 🚀 **Modern build**: Built with Unbuild for optimal output
- ✅ **Well-tested**: Comprehensive test coverage
- 📝 **Well-documented**: Full JSDoc comments and examples
- 🖥️ **CLI included**: Interactive terminal tool for browsing and exporting icons

## 📦 Installation

```bash
# @antfu/ni
npx ni @baybreezy/file-extension-icon
```

## 🚀 Usage

### Basic Usage

```ts
import {
  getMaterialFileIcon,
  getMaterialFolderIcon,
  getVSIFileIcon,
  getVSIFolderIcon,
} from "@baybreezy/file-extension-icon";

// Get Material Design file icon
const jsIcon = getMaterialFileIcon("index.js");
// Returns: "data:image/svg+xml;base64,..."

// Get Material Design folder icon (closed)
const folderIcon = getMaterialFolderIcon("components");

// Get Material Design folder icon (open)
const openFolderIcon = getMaterialFolderIcon("components", true);

// Get VSCode file icon
const tsIcon = getVSIFileIcon("app.ts");

// Get VSCode folder icon
const vsiFolderIcon = getVSIFolderIcon("src", true);
```

### Framework Examples

#### React / Vue / Svelte

```tsx
import { getMaterialFileIcon } from "@baybreezy/file-extension-icon";

function FileIcon({ fileName }: { fileName: string }) {
  const icon = getMaterialFileIcon(fileName);
  
  return <img src={icon} alt={fileName} width={24} height={24} />;
}
```

#### HTML

```html
<script type="module">
  import { getMaterialFileIcon } from '@baybreezy/file-extension-icon';
  
  const icon = getMaterialFileIcon('index.html');
  document.getElementById('icon').src = icon;
</script>

<img id="icon" alt="html" width="24" height="24" />
```

### Advanced Usage

```ts
import { 
  getMaterialFileIcon,
  getIconFromMap,
  findIconInCollection,
  createDataUri,
  convertToBase64
} from "@baybreezy/file-extension-icon";

// The package intelligently matches file names
getMaterialFileIcon("app.component.ts");  // Matches Angular component
getMaterialFileIcon("test.spec.ts");      // Matches test file
getMaterialFileIcon("package.json");      // Matches package.json
getMaterialFileIcon("Dockerfile");        // Matches Docker

// Works with any file extension
getMaterialFileIcon("script.py");
getMaterialFileIcon("style.scss");
getMaterialFileIcon("README.md");
```

## 📚 API Reference

### Material Icons

#### `getMaterialFileIcon(fileName: string): string`

Returns a base64-encoded SVG data URI for the given file name using the Material Icon theme.

**Parameters:**
- `fileName` (string): The file name with or without path (e.g., `"index.js"`, `"src/app.ts"`)

**Returns:** Base64-encoded data URI string

**Example:**
```typescript
const icon = getMaterialFileIcon("index.js");
// => "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0..."
```

#### `getMaterialFolderIcon(folderName: string, open?: boolean): string`

Returns a base64-encoded SVG data URI for the given folder name using the Material Icon theme.

**Parameters:**
- `folderName` (string): The folder name
- `open` (boolean, optional): Whether to return the open folder icon. Default: `false`

**Returns:** Base64-encoded data URI string

**Example:**
```typescript
const closedIcon = getMaterialFolderIcon("components");
const openIcon = getMaterialFolderIcon("components", true);
```

### VSCode Icons

#### `getVSIFileIcon(fileName: string): string`

Returns a base64-encoded SVG data URI for the given file name using the VSCode Icon theme.

**Parameters:**
- `fileName` (string): The file name with or without path

**Returns:** Base64-encoded data URI string

#### `getVSIFolderIcon(folderName: string, open?: boolean): string`

Returns a base64-encoded SVG data URI for the given folder name using the VSCode Icon theme.

**Parameters:**
- `folderName` (string): The folder name
- `open` (boolean, optional): Whether to return the open folder icon. Default: `false`

**Returns:** Base64-encoded data URI string

### Utility Functions

The package also exports utility functions for advanced use cases:

```typescript
import { 
  getIconFromMap,
  findIconInCollection,
  createDataUri,
  convertToBase64
} from "@baybreezy/file-extension-icon";
```

## 🖥️ CLI Tool

This package includes an interactive CLI tool for browsing and exporting icons!

```bash
# Run interactively
npx file-icon

# Or with flags for quick export
npx file-icon -t material -y file -n "index.js" --copy
```

### CLI Features

- 🎨 Browse Material and VSCode icon themes
- 🔍 Search by file/folder name or browse all icons
- 📋 Copy to clipboard, save to file, or display in terminal
- ⚡ Fast and beautiful UI powered by Clack

[📖 Full CLI Documentation](./cli/README.md)

## 📊 Bundle Size

This package contains comprehensive icon data for both Material and VSCode icon themes.

- **Package size (compressed)**: ~2.6 MB
- **Unpacked size**: ~8.6 MB
- **Includes**: Thousands of file and folder icons

> **Note**: Modern bundlers with tree-shaking can significantly reduce the final bundle size by including only the icons you use. Ensure your bundler is configured for tree-shaking to optimize bundle size.

### Optimization Tips

1. **Import only what you need:**
   ```typescript
   // ✅ Good - Tree-shakeable
   import { getMaterialFileIcon } from '@baybreezy/file-extension-icon';
   
   // ❌ Avoid - Imports everything
   import * as Icons from '@baybreezy/file-extension-icon';
   ```

2. **Use modern bundlers** with tree-shaking support (Vite, Rollup, esbuild, webpack 5+)

3. **Consider code splitting** if you support multiple icon themes

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in UI mode
npm run test:ui

# Type check
npm run typecheck

# Lint code
npm run lint
```

## 🧪 Testing

This package includes comprehensive test coverage:

```bash
# Run tests in watch mode
npm test

# Generate coverage report
npm run test:coverage

# Open test UI
npm run test:ui
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT © [Behon Baker](https://behonbaker.com)

## 🙏 Credits & Acknowledgments

This package is a complete TypeScript rewrite of [`file-extension-icon-js`](https://github.com/minhazmiraz/file-extension-icon-JS) by [MD. Minhazul Islam](https://github.com/minhazmiraz).

### Original Package
- **Original Author**: [MD. Minhazul Islam](https://github.com/minhazmiraz)
- **Original Package**: [file-extension-icon-js](https://github.com/minhazmiraz/file-extension-icon-JS)
- **License**: MIT

### Icon Sources
- [Material Icon Theme](https://github.com/PKief/vscode-material-icon-theme) by Philipp Kief
- [VSCode Icons](https://github.com/vscode-icons/vscode-icons) by VSCode Icons Team

### Inspiration
- [vscode-icons-js](https://github.com/dderevjanik/vscode-icons-js) by Dominik Dereǰanik
- [file-icons-js](https://github.com/websemantics/file-icons-js) by Web Semantics

## 🔗 Links

- [GitHub Repository](https://github.com/BayBreezy/file-extension-icon)
- [npm Package](https://www.npmjs.com/package/@baybreezy/file-extension-icon)
- [Issue Tracker](https://github.com/BayBreezy/file-extension-icon/issues)
- [Author Website](https://behonbaker.com)

---

<p align="center">Made with ❤️ by <a href="https://behonbaker.com">Behon Baker</a></p>
