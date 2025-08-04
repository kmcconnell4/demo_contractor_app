# CDE Prototype - Copilot Instructions

## Project Overview
This is a mobile-first React prototype application for a Construction Data Exchange (CDE) system. The app is designed to help construction professionals manage jobs, installations, inspections, and communication workflows.

## Technical Stack

### Core Framework & Build Tools
- **React 18.3.1** with TypeScript for component-based UI development
- **Vite 5.4.1** as the build tool and development server
- **React Router DOM 6.26.2** for client-side routing
- **SWC** for fast TypeScript/JSX compilation via @vitejs/plugin-react-swc

### UI Library & Styling
- **shadcn/ui** components built on Radix UI primitives
- **Tailwind CSS 3.4.11** for utility-first styling with custom design system
- **Lucide React** for consistent iconography
- **Vaul** for mobile-optimized drawer components
- **Next Themes** for dark/light mode support

### State Management & Data Fetching
- **React Hook Form 7.53.0** with **Zod 3.23.8** for form validation
- **TanStack Query 5.56.2** for server state management and caching
- **Local Storage** for authentication and onboarding state

### Development Tools
- **ESLint** with TypeScript rules for code quality
- **Lovable Tagger** for development component tracking (dev mode only)

## Architecture Patterns

### Mobile-First Design
- All components should be optimized for mobile viewports
- Use responsive design principles with Tailwind breakpoints
- Implement touch-friendly interactions and gestures

### Component Structure
```
src/
├── components/          # Reusable components
│   ├── pages/          # Page-level components
│   ├── navigation/     # Navigation components
│   └── ui/            # shadcn/ui components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── pages/             # Route-level pages
```

### File Naming Conventions
- Use PascalCase for React components (`.tsx` files)
- Use camelCase for utilities and hooks (`.ts` files)
- Use kebab-case for UI components following shadcn/ui patterns

## Development Guidelines

### Component Development
1. **Use shadcn/ui components** as building blocks
2. **Implement proper TypeScript types** for all props and state
3. **Follow React best practices**: use hooks appropriately, implement proper error boundaries
4. **Mobile-first responsive design**: start with mobile layouts, then enhance for larger screens

### State Management
1. **Use React Hook Form** for all form implementations with Zod validation schemas
2. **Implement TanStack Query** for API calls and server state caching
3. **Use localStorage** for persistent client-side state (auth, preferences)
4. **Avoid prop drilling**: use React Context or state management when needed

### Routing & Navigation
1. **Use React Router DOM** for all routing needs
2. **Implement bottom navigation** for main app sections
3. **Handle authentication routes** with proper redirects
4. **Support deep linking** for specific job/installation details

### Styling Guidelines
1. **Use Tailwind CSS classes** for all styling
2. **Follow the custom design system** defined in tailwind.config.ts
3. **Implement dark mode support** using next-themes
4. **Use CSS custom properties** for theme variables
5. **Ensure proper contrast ratios** and accessibility

### Form Handling
```typescript
// Example form implementation pattern
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  // Define validation schema
});

const MyForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {}
  });
  
  // Implementation
};
```

### API Integration
```typescript
// Example TanStack Query usage
import { useQuery, useMutation } from "@tanstack/react-query";

const useJobData = (jobId: string) => {
  return useQuery({
    queryKey: ['job', jobId],
    queryFn: () => fetchJobData(jobId),
  });
};
```

## Key Features & Pages

### Authentication Flow
- **Onboarding**: First-time user experience
- **Login**: User authentication
- **Persistent sessions**: Using localStorage

### Main Application Features
- **Home**: Dashboard with job overview
- **Search**: Find jobs, installations, products
- **Create**: Add new jobs or installations
- **Messages**: Communication hub
- **Settings**: User preferences and configuration

### Detailed Views
- **Job Details**: Comprehensive job information
- **Installation Details**: Installation-specific data
- **Product Details**: Product specifications
- **Schedule Inspection**: Inspection workflow

### Navigation
- **Bottom Navigation**: Primary app navigation
- **Voice Commands**: Voice-controlled interactions
- **Responsive**: Adapts to different screen sizes

## Code Quality Standards

### TypeScript
- Use strict TypeScript configuration
- Define proper interfaces for all data structures
- Avoid `any` types - use proper typing
- Implement proper error handling with typed errors

### Performance
- Implement lazy loading for large components
- Use React.memo for expensive re-renders
- Optimize bundle size with proper imports
- Implement proper loading states

### Accessibility
- Use semantic HTML elements
- Implement proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers
- Maintain proper color contrast ratios

### Testing Considerations
- Write components that are easily testable
- Use data-testid attributes for test selectors
- Implement proper error boundaries
- Mock external dependencies properly

## Package Management
- Use npm for dependency management
- Keep dependencies up to date
- Avoid adding unnecessary packages
- Use exact versions for critical dependencies

## Build & Deployment
- Development server runs on port 8080
- Build optimized bundles with Vite
- Support both development and production builds
- Exclude Capacitor from build process (as per requirements)

## File Organization Best Practices
1. Group related components together
2. Keep UI components in dedicated `ui/` folder
3. Separate business logic into custom hooks
4. Use barrel exports for cleaner imports
5. Maintain consistent file structure across features

## Common Patterns to Follow
1. **Compound Components**: For complex UI components
2. **Custom Hooks**: For reusable stateful logic
3. **Provider Pattern**: For shared context
4. **Error Boundaries**: For graceful error handling
5. **Suspense**: For loading states and code splitting

## What NOT to Include
- **Capacitor**: Explicitly excluded from development (as per requirements)
- Native mobile app functionality
- Server-side rendering (SSR)
- Complex state management libraries (Redux, Zustand) - use React state and TanStack Query

When developing features, always consider the mobile-first approach, ensure proper TypeScript typing, follow the established component patterns, and maintain consistency with the existing codebase structure and styling approach.
