# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue Vben Admin monorepo project that has been restructured to use `web-antd` as the single main application. The project is a modern admin template built with Vue 3, TypeScript, Vite, and Ant Design Vue.

## Project Structure

- **apps/web-antd/**: Main application using Ant Design Vue (only active app)
- **apps/web-ele/**: Removed (Element Plus variant)
- **apps/web-naive/**: Removed (Naive UI variant)
- **apps/backend-mock/**: Removed (Mock backend server)
- **packages/@core/**: Core packages providing base functionality
  - **base/**: Base utilities, icons, shared functions, typings
  - **ui-kit/**: Reusable UI components (form-ui, layout-ui, menu-ui, popup-ui, tabs-ui)
  - **composables/**: Vue composables
  - **preferences/**: App preferences and settings
- **playground/**: Demo application with extensive examples (backup available at backup/playground-examples/)
- **internal/**: Internal tooling and configurations
- **docs/**: Documentation source files

## Development Commands

### Setup
```bash
pnpm install
```

### Development
```bash
# Start main application (web-antd)
pnpm dev:antd

# Start all applications (currently only web-antd)
pnpm dev

# Start playground for examples and testing
pnpm dev:play
```

### Building
```bash
# Build main application
pnpm build:antd

# Build all applications
pnpm build

# Build with analysis
pnpm build:analyze
```

### Testing & Quality
```bash
# Run type checking
pnpm check:type

# Run linting
pnpm lint

# Format code
pnpm format

# Run unit tests
pnpm test:unit

# Run all checks (circular deps, dependencies, types, spelling)
pnpm check
```

### Package Management
```bash
# Clean and reinstall all dependencies
pnpm reinstall

# Update dependencies
pnpm update:deps
```

## Architecture Overview

### Monorepo Structure
The project uses pnpm workspaces and Turborepo for efficient monorepo management. Each package has its own package.json and can be built/tested independently.

### Core Architecture
- **Modular Design**: Core functionality is split into focused packages (@core/base, @core/ui-kit, etc.)
- **Component Library**: Custom UI components built on top of Ant Design Vue
- **State Management**: Pinia stores with persistence via @vben/stores
- **Routing**: Vue Router with dynamic route generation and permission guards
- **Internationalization**: Vue I18n with support for multiple languages
- **Theming**: Extensive theming system with CSS variables and Tailwind CSS

### Application Bootstrapping
The main application bootstraps through `apps/web-antd/src/bootstrap.ts`:
1. Initializes component adapters
2. Sets up form components (@vben/form-ui)
3. Configures Vue app with plugins
4. Sets up internationalization
5. Initializes Pinia stores
6. Configures routing and guards
7. Registers directives (access control, loading)

### Key Integrations
- **@vben/access**: Role-based access control with directives
- **@vben/common-ui**: Shared UI components and utilities
- **@vben/request**: HTTP client with interceptors and error handling
- **@vben/preferences**: Application settings and theme management
- **@vben/styles**: Global styles and theme configurations

## Important Files & Configurations

### Application Configuration
- `apps/web-antd/vite.config.mts`: Vite configuration with API proxy settings
- `apps/web-antd/src/preferences.ts`: App-specific preferences and defaults
- `apps/web-antd/src/router/routes/`: Route definitions and module organization

### Build & Development
- `internal/vite-config/`: Shared Vite configurations for all applications
- `turbo.json`: Turborepo task definitions and caching
- `pnpm-workspace.yaml`: Workspace configuration with catalog dependencies

### Code Quality
- `eslint.config.mjs`: ESLint configuration using @vben/eslint-config
- `.prettierrc.mjs`: Prettier configuration
- `lefthook.yml`: Git hooks configuration for pre-commit checks

## Development Notes

### Mock API Development
The project previously included a Nitro-based mock server. For development:
- Mock APIs can be added directly to the request layer in `apps/web-antd/src/api/`
- The `apps/web-antd/src/api/core/auth.ts` already includes mock login functionality
- API calls proxy to `http://localhost:5320/api` when mock server is running

### Component Development
- Use @vben/ui-kit components when possible (form-ui, layout-ui, etc.)
- Follow existing component patterns in `packages/@core/ui-kit/`
- Leverage the adapter pattern in `apps/web-antd/src/adapter/`

### State Management
- Use Pinia stores from @vben/stores
- Access control is handled through @vben/access
- Preferences are managed through @vben/preferences

### Routing & Permissions
- Routes are defined in `apps/web-antd/src/router/routes/modules/`
- Permission-based routing is configured in `apps/web-antd/src/router/access.ts`
- Dynamic route generation is supported for menu-based navigation

## Git Configuration

### Remote Repositories
- **origin**: https://github.com/chengliang4810/jimuqu-devops-ui.git (main project)
- **vben**: https://github.com/vbenjs/vue-vben-admin.git (upstream)

### Commit Convention
Follows Angular commit convention:
```
<type>(<scope>): <subject>

feat: add new feature
fix: bug fix
docs: documentation
style: formatting
refactor: refactoring
perf: performance
test: testing
chore: maintenance
```

## Environment Requirements

- Node.js >= 20.10.0
- pnpm >= 9.12.0
- Modern browsers (Chrome 80+, Firefox, Safari, Edge)