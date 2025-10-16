# File Extension Icon CLI

Interactive CLI tool for browsing and exporting file and folder icons.

## Features

- 🎨 **Two icon themes**: Material Icon Theme & VSCode Icons
- 🔍 **Search or browse**: Find icons by name or browse the full list
- 📋 **Multiple outputs**: Display, copy to clipboard, or save to file
- 🎭 **Beautiful UI**: Powered by Clack prompts with colorful output
- ⚡ **Fast**: Quick icon generation and export

## Usage

### Interactive Mode

```bash
# Run the CLI interactively
file-icon

# Or use npx if not installed globally
npx @baybreezy/file-extension-icon
```

The CLI will guide you through:
1. **Theme selection**: Choose between Material or VSCode icons
2. **Type selection**: File or folder icons
3. **Icon selection**: Search by name or browse available icons
4. **Output options**: Display, copy, save to file, or all

### Command Line Flags

```bash
# Quick mode with all options
file-icon --theme material --type file --name "index.js" --copy

# Save to a specific file
file-icon -t vscode -y folder -n components -o my-icon.txt

# Available flags:
#   -t, --theme <theme>   Icon theme (material|vscode)
#   -y, --type <type>     Icon type (file|folder)
#   -n, --name <name>     File or folder name
#   -o, --output <file>   Output file path
#   -c, --copy            Copy to clipboard
#   -V, --version         Output version number
#   -h, --help            Display help
```

## Examples

### Search for a File Icon

```bash
$ file-icon

┌  File Extension Icon CLI
│
◆  Which icon theme do you want to use?
│  ● Material Icon Theme (Modern, colorful icons)
│  ○ VSCode Icons
└

◆  What type of icon do you need?
│  ● File Icon (For file extensions)
│  ○ Folder Icon
└

◆  How would you like to find your icon?
│  ● Search by name (Enter a file/folder name)
│  ○ Browse all icons
└

◆  Enter file name:
│  index.js
└

◇  Icon generated successfully!

Icon Details:
──────────────────────────────────────────────────
Theme: material
Type: file
Name: index.js
Size: 2.34 KB
──────────────────────────────────────────────────

◆  What would you like to do with the icon?
│  ○ Display in terminal
│  ○ Copy to clipboard
│  ○ Save to file
│  ● All of the above
└

✓ Copied to clipboard!
✓ Saved to index-js-icon.txt

└  Done! Happy coding! 🚀
```

### Quick Export with Flags

```bash
# Export TypeScript icon to file
file-icon -t material -y file -n "app.ts" -o typescript.txt

# Copy React component icon to clipboard
file-icon --theme vscode --type file --name "App.tsx" --copy

# Get a folder icon
file-icon -t material -y folder -n "components"
```

## Output Formats

The CLI always outputs base64-encoded SVG data URIs that can be used directly in HTML:

```html
<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz..." alt="icon" width="24" height="24" />
```

## Tips

1. **Clipboard support**: The CLI automatically copies to your system clipboard when you select that option
2. **File names**: When searching, you can use:
   - Full filenames: `package.json`, `Dockerfile`, `.gitignore`
   - Extensions: `ts`, `js`, `py`, `md`
   - Complex names: `app.component.ts`, `test.spec.js`
3. **Browse mode**: Shows the first 50 icons. For more, use search mode
4. **Batch export**: Run the CLI multiple times or use a script for batch operations

## Development

To run the CLI in development mode:

```bash
# Run directly with tsx
npm run build:cli

# Or build and test
npm run build
node dist/cli.mjs
```

## License

MIT © [Behon Baker](https://behonbaker.com)
