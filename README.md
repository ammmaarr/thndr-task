# Stock Tracker Application

This is a Stock Tracker application built with React, TypeScript, and Tailwind CSS. The application allows users to search for stocks, view their details, and it does so while handling errors gracefully.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for stocks using a search term.
- Display stock details in a modal.
- Handle loading states and errors.
- Responsive design using Tailwind CSS.
- Seamless animations using Motion for React.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **React Query**: For data fetching and state management.
- **Jest**: For testing the application.
- **Motion For React**: The new and improved library by Framer.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ammmaarr/thndr-task.git
   cd thndr-task
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Running the Application

To start the development server, run:

```bash
npm run dev
```

This will start the application on `http://localhost:3000`. You can open this URL in your browser to view the application.

## Running Tests

To run the tests, use the following command:

```bash
npm run test
```

This will execute the test suite using Jest and display the results in the terminal.

## Folder Structure

```
src/
├── app/
│   ├── components/        # React components and their unit tests
│   ├── interfaces.ts      # TypeScript interfaces
│   ├── useStocks.ts       # Custom hook for fetching stocks
│   └── globals.css        # Global styles
├── pages/                 # Next.js pages
├── jest.config.ts         # Jest configuration
└── tailwind.config.ts     # Tailwind CSS configuration
```

## Deployed Version

The deployed version of this project can be accessed at: https://thndr-task-ammar.vercel.app/

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
