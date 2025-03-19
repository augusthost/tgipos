# TGI POS

TGI POS is a point-of-sale application built using Vite, React, Typescript, React Query and TailwindCSS. This project offers a fast and responsive offline sales system designed for businesses that require robust local transaction processing alongside modern frontend technologies.

[Demo App](https://tgipos.netlify.app)

> **Note** : Performance may be very slow when using this online mode. TGI POS is specifically designed for offline use.

<img src="./public/pos-image.png" width="100%">

---

## Features

**Orders**  
Manage customer orders efficiently, including order creation, tracking, and payment processing.

**Waiters**  
Track waiter assignments, manage shifts, and monitor service performance to ensure smooth operations.

**Tables**  
Organize table management with real-time availability status, reservations, and table status updates.

**Order Items**  
Handle detailed information for each item in an order, including price, quantity, and customization options.

**Menus**  
Easily update and manage your restaurant's menu, including dish details, pricing, and availability.

**Categories**  
Organize menu items into categories for a streamlined ordering process and easier navigation.

**Reports**  
Generate insightful reports on sales, performance, and inventory to help with data-driven decision making.

**Settings**  
Customize system configurations, including user preferences, restaurant details, and integration setups.

---

## Road Map

- [x] **Integrate with backend headless CMS** Integrate with Cockpit headless CMS to handle data management and synchronization.
- [x] **POSTMAN API Doc:** Create API documentation using Postman.
- [x] **Add Authentication:** Implement multi-user login system with role-based access.
- [ ] **Add Reports:** Generate sales, inventory, and performance reports.
- [ ] **Add Refund:** Implement refund functionality to handle returns.
- [ ] **Add Printers and Printing Settings:** Enable support for various printers and customize printing configurations.

---

## Tech Stacks

- **Electron:** Create cross-platform desktop applications with web technologies.
- **Vite:** A modern build tool that significantly improves the development experience.
- **React:** A popular library for building user interfaces.
- **React Query:** A powerful data-fetching and state management library that simplifies fetching, caching, synchronizing, and updating server state in React applications.
- **TailwindCSS:** Utility-first CSS framework for rapid styling.

---

Below is the revised Markdown with improved clarity and grammar:

---

## Installation Guide

### Backend

> Note: For the backend API server, ensure you have PHP 8.3+ and SQLite installed on your machine before proceeding.

1. **Download Cockpit CMS:**

   Download the Cockpit API Server from [here](https://drive.google.com/file/d/1t0DMH2vpKxpW0kKCBQkuAv3cCIxRfxF0/view?usp=sharing).

2. **Change Directory:**

   ```bash
   cd cockpit
   ```

3. **Run Cockpit CMS:**

   ```bash
   php -S localhost:3030
   ```

This command starts the Cockpit CMS server.

> If you want to modify CMS data, the default credential is `username:admin|password:admin`.

---

### Frontend

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/augusthost/tgipos.git
   cd tgipos
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up the Environment:**

   > Create a `.env` file in the root folder and add the following variables:

   ```bash
   VITE_API_URL=http://localhost:3030
   VITE_PLACEHOLDER_IMAGE=placeholder.webp
   VITE_DEMO_SERVER=false
   VITE_ASSET_URL=http://localhost:3030/storage/uploads
   ```

4. **Run the Application:**

   ```bash
   npm run dev
   ```

This command starts the Vite development server and launches the POS app.

---

## Contribution Guide

We truly appreciate your interest in contributing to TGI POS! To ensure smooth collaboration, please follow these guidelines:

1. Branching and Pull Requests:
   - All pull requests must be made to the develop branch.
   - Create a new branch from develop for every feature or bugfix you work on.
   - Once complete, open a pull request targeting the develop branch.
2. Commit Messages:
   - Follow the commit message guidelines as described in the Conventional Changelog/commitlint guide.
   - Your commit messages should be clear, descriptive, and follow the proper format (e.g., type(scope): description).
3. Code Quality and Linting:
   - Ensure that your code passes all ESLint checks before submitting a pull request.
   - PRs that do not pass ESLint will not be merged until all issues are resolved.
   - Run linting locally with the command:
   ```bash
      npm run lint
   ```
   and fix any issues that arise.
4. General Guidelines:
   - Feel free to open an issue to discuss larger changes or new feature ideas before starting work.
   - Follow the existing code style and project structure.
   - Make sure to update documentation as needed when adding new features or modifying existing ones.

We welcome your contributions and are excited to build a reliable, offline-capable point-of-sale system together!

---

## Contributors

We welcome contributions! Feel free to check our [contributing guidelines](CONTRIBUTING.md) and submit issues or pull requests. Special thanks to all contributors who have already supported this project.

- [Ronald Aug](https://github.com/ronaldaug)

---

## Star Us on GitHub

If you like TGI Offline POS and want to support our work, please give us a star on GitHub! Your support means a lot and helps us increase the reach of this project.

[![GitHub stars](https://img.shields.io/github/stars/augusthost/tgipos?style=social)](https://github.com/augusthost/tgipos/stargazers)

---

## Donate Us on [Buy Me a Coffee](http://buymeacoffee.com/ronaldaug)

If you find TGI Offline POS helpful, consider supporting the project by buying us a coffee. Your generosity helps us continue to improve and develop new features!

---

## Inspiration

The idea for TGI Offline POS was born out of the need for a reliable, offline-capable point-of-sale system that doesn't rely on constant internet connectivity. We wanted to combine the best of modern web technologies with the stability of a desktop application to create a comprehensive solution for retail and service businesses.

---

## Acknowledgements

- Thanks to the developers and maintainers of [Cockpit CMS](https://getcockpit.com/), [Vite](https://vitejs.dev/), [Typescript](https://www.typescriptlang.org/), [React](https://reactjs.org/), [React Query](https://tanstack.com/query/latest), and [TailwindCSS](https://tailwindcss.com/) for their amazing work.
- Special thanks to the open-source community for continuous support and contributions.

---

Feel free to open issues, suggest new features, or contribute code. Let's build a powerful offline POS system together!
