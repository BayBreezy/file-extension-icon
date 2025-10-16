# Contributing to @baybreezy/file-extension-icon

First off, thank you for considering contributing to `@baybreezy/file-extension-icon`! 🎉

This document provides guidelines and instructions for contributing to this project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inclusive environment. By participating, you are expected to uphold this code.

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what's best for the community

## Getting Started

### Prerequisites

- Node.js 18 or higher
- Git
- A GitHub account

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

   ```bash
   git clone https://github.com/BayBreezy/file-extension-icon.git
   cd file-extension-icon
   ```

3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/BayBreezy/file-extension-icon.git
   ```

## Development Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run type check:**

   ```bash
   npm run typecheck
   ```

3. **Run tests in watch mode:**

   ```bash
   npm test
   ```

4. **Build the package:**

   ```bash
   npm run build
   ```

5. **Run tests with coverage:**
   ```bash
   npm run test:coverage
   ```

## How to Contribute

### Reporting Bugs

1. **Check existing issues** - Search the issue tracker to see if the bug has already been reported
2. **Use the bug report template** - Fill out all required fields
3. **Provide a minimal reproduction** - Include code samples that demonstrate the issue
4. **Include environment details** - Node version, OS, package version, etc.

### Suggesting Features

1. **Check existing feature requests** - Someone may have already suggested it
2. **Use the feature request template** - Explain the problem and proposed solution
3. **Provide use cases** - Help us understand why this feature would be valuable
4. **Consider backward compatibility** - Explain how it fits with the existing API

### Improving Documentation

Documentation improvements are always welcome! This includes:

- Fixing typos or unclear wording
- Adding examples
- Improving code comments
- Writing guides or tutorials
- Translating documentation

## Coding Standards

### TypeScript

- Use TypeScript for all source code
- Maintain strict type safety (no `any` unless absolutely necessary)
- Add JSDoc comments for public APIs
- Use meaningful variable and function names

### Code Style

```typescript
// ✅ Good
export function getMaterialFileIcon(fileName: string): string {
  const lowerFileName = fileName.toLowerCase();
  // ... implementation
}

// ❌ Bad
export function GetIcon(f: string): string {
  let fn = f.toLowerCase();
  // ... implementation
}
```

### Project Structure

```
cli/
├── index.ts      # CLI entry point
src/
├── api/          # Public API functions
├── data/         # Icon data
├── types/        # TypeScript type definitions
├── utils/        # Helper functions
└── __tests__/    # Unit tests
```

### Key Principles

1. **Zero runtime dependencies** - Keep the package lean
2. **Type safety first** - Leverage TypeScript fully
3. **Backward compatibility** - Don't break existing APIs without major version bump
4. **Performance matters** - Optimize hot paths
5. **Tree-shakeable** - Keep exports modular

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes

### Examples

```bash
feat(api): add support for custom icon themes

fix(material): correct icon mapping for .jsx files

docs(readme): add examples for folder icons

test(utils): increase coverage for base64 encoding

chore(deps): update typescript to 5.9.3
```

## Pull Request Process

### Before Submitting

1. **Create a feature branch:**

   ```bash
   git checkout -b feature/my-new-feature
   # or
   git checkout -b fix/issue-123
   ```

2. **Make your changes:**
   - Write clean, well-documented code
   - Add or update tests
   - Update documentation if needed

3. **Ensure all checks pass:**

   ```bash
   npm run typecheck  # Type checking
   npm test          # Run tests
   npm run build     # Build package
   ```

4. **Commit your changes:**

   ```bash
   git add .
   git commit -m "feat: add awesome feature"
   ```

5. **Keep your branch updated:**

   ```bash
   git fetch upstream
   git rebase upstream/master
   ```

6. **Push to your fork:**
   ```bash
   git push origin feature/my-new-feature
   ```

### Submitting the PR

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template with:
   - Clear description of changes
   - Link to related issues
   - Screenshots if applicable
   - Breaking changes (if any)

### PR Requirements

Your PR must:

- ✅ Pass all CI checks (type check, tests, build)
- ✅ Include tests for new features
- ✅ Update documentation if needed
- ✅ Follow the coding standards
- ✅ Have a clear description
- ✅ Be based on the latest `master` branch

### Review Process

1. **Automated checks** - CI pipeline runs automatically
2. **Code review** - Maintainers will review your code
3. **Feedback** - Address any requested changes
4. **Approval** - Once approved, your PR will be merged
5. **Release** - Changes will be included in the next release

## Testing

### Writing Tests

- Place tests in `src/__tests__/`
- Use descriptive test names
- Test both success and error cases
- Aim for high coverage (>80%)

### Test Structure

```typescript
import { describe, expect, it } from "vitest";

import { yourFunction } from "../your-module";

describe("yourFunction", () => {
  it("should handle valid input", () => {
    const result = yourFunction("input");
    expect(result).toBe("expected");
  });

  it("should handle edge cases", () => {
    expect(yourFunction("")).toBe("default");
    expect(yourFunction(null)).toThrow();
  });
});
```

### Running Tests

```bash
# Watch mode (recommended during development)
npm test

# Run once
npm test -- --run

# With coverage
npm run test:coverage
```

## Documentation

### Code Documentation

- Add JSDoc comments for all public APIs
- Include `@param`, `@returns`, and `@example` tags where applicable
- Keep comments concise but informative

````typescript
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
  // ...
}
````

### README Updates

Update the README if you:

- Add new features
- Change the public API
- Add new examples
- Update installation steps

## Development Tips

### Useful Commands

```bash
# Development mode with watch
npm run dev

# Type checking only
npm run typecheck

# Build and check output
npm run build && ls -lh dist/

# Run specific test file
npm test src/__tests__/material.test.ts

# Clean and rebuild
npm run clean
```

### Debugging

```bash
# Enable debug logs (if added)
DEBUG=file-extension-icon:* npm test

# Check TypeScript compilation output
npx tsc --noEmit --listFiles
```

### Performance Testing

```bash
# Check bundle size
npm run build
npm pack
ls -lh *.tgz

# Profile type checking
npx tsc --noEmit --extendedDiagnostics
```

## Questions?

If you have questions:

1. Check the [documentation](../README.md)
2. Search [existing issues](https://github.com/BayBreezy/file-extension-icon/issues)
3. Ask in [Discussions](https://github.com/BayBreezy/file-extension-icon/discussions)
4. Reach out to maintainers

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing!** 🙏

Every contribution, no matter how small, helps make this project better for everyone.
