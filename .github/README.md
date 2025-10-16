# GitHub Configuration Guide

This folder contains all the GitHub-specific configurations for the `file-extension-icon` package.

## 📂 Structure

```
.github/
├── workflows/           # GitHub Actions workflows
│   ├── ci.yml          # Main CI/CD pipeline
│   ├── release.yml     # Release and publish workflow
│   └── stale.yml       # Stale issues/PRs management
├── ISSUE_TEMPLATE/     # Issue templates
│   ├── bug_report.yml  # Bug report template
│   ├── feature_request.yml
│   └── config.yml      # Issue template config
├── dependabot.yml      # Dependabot configuration
├── CONTRIBUTING.md     # Contribution guidelines
├── PULL_REQUEST_TEMPLATE.md
├── SECURITY.md         # Security policy
└── README.md          # This file
```

## 🔄 Workflows

### CI/CD Pipeline (`ci.yml`)

Runs on every push and pull request to main branches.

**Jobs:**

1. **Type Check** - Validates TypeScript types
2. **Test** - Runs tests on Node 18, 20, and 22
3. **Build** - Compiles the package
4. **Size Check** - Ensures package stays under 10MB
5. **Publish** - Publishes to npm (only on version tags)

**Triggers:**

- Push to `main`, `master`, or `develop` branches
- Pull requests to those branches
- Manual workflow dispatch

### Release Workflow (`release.yml`)

Automatically publishes to npm and creates GitHub releases.

**Triggered by:** Pushing a version tag (e.g., `v2.0.0`)

**Steps:**

```bash
# Tag a new version
git tag v2.0.0
git push origin v2.0.0

# Workflow automatically:
# 1. Runs tests
# 2. Builds package
# 3. Publishes to npm
# 4. Creates GitHub release with notes
```

### Stale Management (`stale.yml`)

Automatically manages inactive issues and PRs.

**Configuration:**

- Issues: Stale after 60 days, closed after 7 more days
- PRs: Stale after 90 days, closed after 14 more days
- Exemptions: `pinned`, `security`, `help wanted` labels

## 🤖 Dependabot

Configured to automatically create PRs for:

- npm dependencies (weekly on Mondays)
- GitHub Actions updates (weekly on Mondays)

**Features:**

- Groups minor/patch updates to reduce PR spam
- Auto-labels with `dependencies` or `github-actions`
- Conventional commit messages
- Ignores major version bumps by default

**To enable auto-merge:**

1. Enable auto-merge in repository settings
2. Set up branch protection rules
3. Dependabot will auto-merge minor/patch updates

## 🐛 Issue Templates

### Bug Report

Structured form for reporting bugs with:

- Bug description
- Reproduction steps
- Expected vs actual behavior
- Code samples
- Environment details

### Feature Request

Structured form for suggesting features with:

- Problem statement
- Proposed solution
- Alternative approaches
- Example usage
- Priority level

### Config

Disables blank issues and provides helpful links:

- Discussions
- Documentation
- Existing issues search

## 🔐 Security

The `SECURITY.md` file defines:

- Supported versions
- How to report vulnerabilities privately
- Response timeline expectations
- Disclosure policy

## 📝 Pull Request Template

Standardized PR template ensuring contributors provide:

- Description of changes
- Type of change
- Test results
- Breaking changes (if any)
- Checklist of requirements

## 🤝 Contributing Guide

Comprehensive guide covering:

- Development setup
- Coding standards
- Commit message conventions
- PR process
- Testing guidelines
- Documentation requirements

## 🚀 Setting Up for Your Repository

### Required Secrets

Add these secrets in GitHub repository settings:

1. **`NPM_TOKEN`** (Required for publishing)
   - Go to npmjs.com → Account → Access Tokens
   - Create automation token
   - Add to GitHub: Settings → Secrets → Actions → New repository secret

2. **`CODECOV_TOKEN`** (Optional, for code coverage)
   - Go to codecov.io
   - Add your repository
   - Copy the token
   - Add to GitHub secrets

### Repository Settings

1. **Enable GitHub Actions:**
   - Settings → Actions → General
   - Allow all actions and reusable workflows

2. **Branch Protection (Recommended):**
   - Settings → Branches → Add rule
   - Branch name: `main` or `master`
   - Require pull request reviews
   - Require status checks (CI) to pass
   - Require branches to be up to date

3. **Enable Discussions (Optional):**
   - Settings → General → Features
   - Check "Discussions"

4. **Auto-merge (Optional):**
   - Settings → General
   - Check "Allow auto-merge"

### First-Time Setup Checklist

- [ ] Add `NPM_TOKEN` secret
- [ ] Update repository name in workflow files (if different)
- [ ] Update maintainer name in dependabot.yml
- [ ] Enable GitHub Actions
- [ ] Set up branch protection rules
- [ ] Enable Discussions (optional)
- [ ] Test CI workflow with a PR
- [ ] Test release workflow with a test tag

## 📦 Publishing Flow

### Automatic Publishing

1. **Update version in package.json:**

   ```bash
   npm version patch # or minor, major
   ```

2. **Push the tag:**

   ```bash
   git push origin v2.0.1
   ```

3. **Workflow automatically:**
   - Runs all tests
   - Builds the package
   - Publishes to npm with provenance
   - Creates GitHub release

### Manual Publishing (Not Recommended)

If you need to publish manually:

```bash
npm run build
npm publish --access public
```

## 🧪 Testing Workflows Locally

### Using `act` (GitHub Actions locally)

```bash
# Install act
brew install act  # macOS
# or download from https://github.com/nektos/act

# Run CI workflow
act pull_request

# Run release workflow
act -s NPM_TOKEN=your_token push
```

### Dry Run

Test without actually publishing:

```bash
# Build and pack (creates .tgz file)
npm run build
npm pack

# Inspect contents
tar -tzf file-extension-icon-2.0.0.tgz
```

## 🔧 Customization

### Changing CI Node Versions

Edit `.github/workflows/ci.yml`:

```yaml
strategy:
  matrix:
    node-version: [18, 20, 22] # Add or remove versions
```

### Adjusting Dependabot Schedule

Edit `.github/dependabot.yml`:

```yaml
schedule:
  interval: "weekly" # or "daily", "monthly"
  day: "monday" # day of week
```

### Modifying Stale Behavior

Edit `.github/workflows/stale.yml`:

```yaml
days-before-issue-stale: 60 # Adjust timing
exempt-issue-labels: "pinned,security" # Add more labels
```

## 📊 Monitoring

### Workflow Status

View workflow runs:

- Repository → Actions tab
- Check green/red status
- View logs for failures

### Dependabot PRs

Review automated PRs:

- Pull requests tab
- Filter by `dependencies` label
- Review changes before merging

### Releases

Track releases:

- Releases tab on GitHub
- npm package page
- Download statistics

## 🆘 Troubleshooting

### CI Failing

1. **Check workflow logs** in Actions tab
2. **Run tests locally:** `npm test`
3. **Check type errors:** `npm run typecheck`
4. **Verify build:** `npm run build`

### Publishing Failed

1. **Check NPM_TOKEN** is valid and has publish permissions
2. **Verify package version** is not already published
3. **Check npm registry status**
4. **Review workflow logs** for detailed error

### Dependabot Not Working

1. **Verify dependabot.yml** syntax
2. **Check repository settings** allow Dependabot
3. **Review security alerts** tab
4. **Wait for scheduled run** (weekly on Mondays)

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Questions?** Open a discussion or issue on GitHub!
