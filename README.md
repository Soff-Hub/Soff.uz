## MARTFURY TEMPLATE - REACT VERSION v2.2.0 (Using Strapi CMS)

# Soff.uz - Digital Marketplace Platform

**Soff.uz** is a comprehensive digital marketplace platform built with Next.js
and React, designed to connect buyers and sellers in various digital categories
including templates, 3D models, scientific resources, video tutorials, and
freelance services.

## 🚀 Project Overview

### Platform Features

-   **E-commerce Marketplace**: Buy and sell digital products and services
-   **Multi-category Support**: Templates, 3D models, interior designs,
    scientific resources, video lessons, websites
-   **Seller Profiles**: Comprehensive seller dashboard and portfolio management
-   **Search & Discovery**: Advanced search functionality with filtering
    capabilities
-   **Authentication System**: OAuth integration and secure user management
-   **Affiliate Program**: Built-in affiliate marketing system
-   **Chat System**: Real-time communication between buyers and sellers
-   **Order Management**: Complete order processing and tracking system
-   **AI Integration**: Soffia AI assistant for enhanced user experience

### Technology Stack

-   **Frontend**: React 17.0.2, Next.js 12.1.0
-   **Styling**: SCSS, Ant Design 5.21.1
-   **State Management**: React Query 4.36.1, Context API
-   **Authentication**: OAuth integration
-   **Build Tools**: Webpack (migrating to Turbopack)

### Architecture

-   **Routing**: Pages Router (migrating to App Router)
-   **Components**: Modular component architecture with shared utilities
-   **API Layer**: RESTful API integration with repository pattern
-   **Responsive Design**: Mobile-first responsive design approach

---

### Version 2.2.1

-   New: Update Nextjs v12

### Version 2.2.0

-   New: Custom hooks
-   New: Latest React & Nextjs (v11.0.x)
-   Updated: Master Layout
-   Remove: un-use stores
-   Remove: unused components
-   Remove: unused layouts
-   Optimize time build & loading

### Installation

```bash
npm install
```

or Yarn

```bash
yarn install
```

### Development

```bash
yarn dev
```

### Project Structure

```
├── app/                    # App Router setup (Next.js 13+ preparation)
├── components/            # Reusable UI components
├── pages/                 # Pages Router (current routing system)
├── features/              # Feature-based modules
├── entities/              # Business logic entities
├── shared/                # Shared utilities and components
├── widgets/               # Complex UI widgets
├── repositories/          # API layer and data management
├── store/                 # State management
└── scss/                  # Styling and themes
```

### Key Features Implementation

#### Search & Discovery

-   Advanced search with multiple filters
-   Category-based browsing
-   AI-powered recommendations

#### Seller Dashboard

-   Portfolio management
-   Order tracking
-   Analytics and reporting

#### Payment & Orders

-   Secure payment processing
-   Order management system
-   Digital product delivery

#### Communication

-   Real-time chat system
-   Notification system
-   Review and rating system

### Development Guidelines

1. **Component Architecture**: Follow the established modular component
   structure
2. **State Management**: Use React Query for server state, Context API for
   client state
3. **Styling**: Follow SCSS BEM methodology for consistent styling
4. **API Integration**: Use the repository pattern for API calls
5. **Responsive Design**: Ensure all components work across device sizes

### Contributing

When contributing to this project:

1. Follow the existing code structure and naming conventions
2. Test changes thoroughly across different user flows
3. Ensure responsive design compatibility
4. Update documentation for new features

---

## 📚 Additional Documentation

For detailed information about the ongoing Next.js migration process, including
migration strategy, benefits, challenges, and implementation timeline, please
refer to:

**[Next.js Migration Notes](./next-js-migration-notes.md)**

This document contains comprehensive analysis of migrating from Next.js 12 to
Next.js 15, including:

-   Current architecture analysis
-   Migration strategy options
-   Performance benefits and challenges
-   Specific considerations for Soff.uz platform
-   Recommended migration timeline
-   Critical success factors and risk mitigation
