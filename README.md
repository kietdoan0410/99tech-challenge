# Currency Swap Form

## Overview

This project is a React-based Currency Swap Form where users can swap assets from one currency to another. The form is designed to be intuitive, interactive, and visually appealing, utilizing third-party libraries for enhanced functionality. The project includes input validation, error messages, and simulated backend interactions for a seamless user experience.

## Features

- **Currency Swapping**: Users can select currencies and specify amounts to swap.
- **Token Images**: Displays token images using the [Switcheo token icons](https://github.com/Switcheo/token-icons/tree/main/tokens).
- **Real-time Exchange Rates**: Fetches token price information from [Switcheo's API](https://interview.switcheo.com/prices.json) to compute exchange rates.
- **Input Validation**: Validates user inputs and provides error messages.
- **Loading Indicator**: Simulates backend interactions with a loading indicator on form submission.

## Technologies Used

- **React**: For building the user interface.
- **Create-React-App**: For setting up the React application.
- **Axios**: For making API requests.
- **Ant Design**: For UI components and styling.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kietdoan0410/99tech.git
   ```
2. Navigate to the project directory:
   ```bash
   cd 99tech-challenge/problem2-form
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

### Running the Application

1. ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```
2. Open your browser and navigate to http://localhost:3000 to view the application.

## Usage

1. Select the currency you want to swap from and to using the dropdown menus or type to match the options from dropdown menus.
2. Enter the amount you want to swap.
3. The form will automatically fetch the exchange rate and calculate the equivalent amount in the target currency.
4. Click the "Swap" button to submit the form.
5. A loading indicator will appear, simulating a backend interaction.
6. Once the swap is complete, the result will be displayed.

## Customization

You can customize the form by modifying the components in the src/components directory and updating styles in the src/styles directory.

## Contributing

If you would like to contribute to this project, please fork the repository and create a pull request with your changes. We welcome all contributions!

## License

This project is currently has no license.
