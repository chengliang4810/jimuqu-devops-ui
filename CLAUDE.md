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

## Component Development & Usage

### VbenForm - Advanced Form System
The project provides a powerful form system built on top of Ant Design Vue:

```typescript
import { useVbenForm } from '#/adapter/form';

const [BasicForm, formApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      fieldName: 'username',
      label: '用户名',
      rules: 'required',
    },
    {
      component: 'ApiSelect',
      componentProps: {
        api: getAllMenusApi,
        autoSelect: 'first',
      },
      fieldName: 'api',
      label: 'API选择器',
    },
  ],
  layout: 'horizontal',
  wrapperClass: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
});
```

**Available Components:**
- Input, InputPassword, InputNumber, Textarea
- Select, ApiSelect, TreeSelect, ApiTreeSelect
- DatePicker, RangePicker, TimePicker
- Checkbox, CheckboxGroup, Radio, RadioGroup
- Switch, Rate, Mentions
- Upload (with custom request handling)
- IconPicker

### Component Adapter Pattern
The adapter system allows seamless integration of different UI libraries:

```typescript
// apps/web-antd/src/adapter/component/index.ts
export type ComponentType =
  | 'ApiSelect'
  | 'ApiTreeSelect'
  | 'IconPicker'
  | 'Input'
  | 'Select'
  // ... other components
```

### Page Structure Pattern
Follow the established page structure:

```vue
<script setup lang="ts">
import { Page } from '@vben/common-ui';
// Component logic
</script>

<template>
  <Page title="页面标题" description="页面描述">
    <!-- Page content -->
  </Page>
</template>
```

### API Development
Use the request client for consistent API handling:

```typescript
import { requestClient } from '#/api/request';

export async function getUsers(params: Record<string, any>) {
  return requestClient.get('/users', { params });
}

export async function createUser(data: Record<string, any>) {
  return requestClient.post('/users', data);
}
```

### Route Configuration
Routes are modular and support advanced features:

```typescript
const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'lucide:layout-dashboard',
      title: '模块名称',
      authority: ['admin'], // 权限控制
      keepAlive: true, // 页面缓存
    },
    name: 'ModuleName',
    path: '/module',
    children: [
      {
        name: 'ChildPage',
        path: '/module/child',
        component: () => import('#/views/module/child.vue'),
        meta: {
          hideInMenu: true, // 隐藏菜单
          activePath: '/module', // 激活父级菜单
        },
      },
    ],
  },
];
```

## Development Guidelines

### Component Development Best Practices
- Use @vben/ui-kit components when available
- Follow the adapter pattern for new components
- Implement proper TypeScript typing
- Include accessibility features (ARIA labels, keyboard navigation)
- Use composition API with `<script setup>` syntax

### State Management Patterns
- Use Pinia stores for application state
- Leverage @vben/access for permission management
- Store user preferences with @vben/preferences
- Implement proper error handling and loading states

### Form Development Guidelines
- Use VbenForm for complex forms
- Implement proper validation with Zod rules
- Use API components for dynamic data
- Follow the established field naming conventions
- Implement form reset and validation states

### API Integration Patterns
- Use the centralized request client
- Implement proper error handling and user feedback
- Use mock data during development (see backup/playground-examples/)
- Follow RESTful API conventions
- Implement proper TypeScript interfaces for API responses

### Code Organization
- Keep components focused and single-purpose
- Use composables for reusable logic
- Separate API calls from UI logic
- Implement proper error boundaries
- Use proper TypeScript typing throughout

## Playground Examples Reference

The project includes extensive examples in `backup/playground-examples/` that demonstrate advanced usage patterns:

### Featured Examples
- **Form Examples**: Complex forms with validation, API integration, and custom components
- **Table Examples**: Data tables with search, pagination, and inline editing
- **Access Control**: Role-based permissions and route guards
- **UI Components**: Advanced component usage and customization
- **API Integration**: Real-world data fetching and state management

### Using Examples
1. Reference the backed-up examples when implementing new features
2. Copy patterns and adapt them for your specific use case
3. Follow the established coding patterns and conventions
4. Use the examples as learning resources for advanced features

## Demo Pages in Web-Antd

The main application now includes demo pages showcasing key features:

### Form Demo (`/demos/form/basic`)
- Basic form implementation with VbenForm
- Input validation and user feedback
- Multiple form field types and layouts

### Table Demo (`/demos/table/search`)
- Search form integration
- Data table with pagination
- Basic CRUD operations demonstration

These demos serve as starting points for implementing similar features in your application.

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