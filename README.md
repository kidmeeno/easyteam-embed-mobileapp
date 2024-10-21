# EasyTeam Time Tracking Embed

### React Native Expo Application

## Table of Contents

- [Project Description](#project-description)
- [EasyTeam Time Tracking Integration](#easyteam-time-tracking-integration)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [EasyTeam API Integration](#easyteam-api-integration)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Project Description

This project is a React Native Expo mobile application that integrates **EasyTeam**, a time tracking and employee management solution, enabling mobile apps to embed EasyTeam's time tracking functionality seamlessly.

The app allows employees and administrators to interact with EasyTeam's time tracking features directly within their existing mobile environments.

## EasyTeam Time Tracking Integration

**EasyTeam embed** is a library used for embedding EasyTeam time tracking into other mobile applications. The integration enables users to:

- Track time seamlessly via EasyTeam within the app.
- Manage employee work hours, shifts, and timesheets.
- Support role-based features for both employees and administrators.

This project leverages the EasyTeam API for full interaction and time tracking management, ensuring smooth integration with the platform.

## Features

- [x] **EasyTeam Time Tracking**: Seamlessly integrated time tracking for employees.
- [x] **Timesheet Management**: Role-based view for employees and admins.
- [x] **Shift Management**: Admins can create, update, and manage employee shifts.
- [x] **Authentication**: JWT-based user authentication.
- [x] **Role-based Navigation**: Separate views for admins and employees based on user roles.
  
## Tech Stack

- **React Native**: Cross-platform mobile development framework.
- **Expo**: A framework and platform for universal React applications.
- **Axios**: For handling API requests to EasyTeam.
- **React Navigation**: For managing navigation between screens.
- **AsyncStorage**: For locally storing authentication tokens.
- **EasyTeam API**: For embedding time tracking and managing shifts.

## Getting Started

These instructions will help you set up the project on your local machine for development and testing.

### Prerequisites

Ensure you have the following tools installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Git](https://git-scm.com/)
- **EasyTeam API Access**: Obtain access to the EasyTeam API for integration purposes.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kidmeeno/easyteam-embed-mobileapp.git
   cd easyteam-embed-mobileapp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up Expo:**

   If you don't have Expo CLI installed globally, you can install it via:

   ```bash
   npm install -g expo-cli
   ```

### Running the Project

To start the project locally:

```bash
npm start
```

You can scan the QR code using the Expo Go app on your Android/iOS device, or run it on a simulator/emulator.

- **Android:** Press `a` in the terminal to run the app in an Android emulator.

## EasyTeam API Integration

The app interacts with the **EasyTeam API** for time tracking, employee management, and shift handling. Here's a typical workflow:

1. **Authentication:**
   The app uses JWT for user authentication. A token is required for making API requests to the EasyTeam backend.
   Running easy team with unprotected network can cause issues with authentication. So i advice switching networks when you experience difficulty in getting authenticated into easy team provider

2. **Fetching Employee Data:**
   Once authenticated, the app fetches employee time tracking data (e.g., clock-ins, clock-outs, timesheets) from EasyTeam.
   Usually this will be done with the serverside part of this application.

3. **Shift Management:**
   Admins can create and manage shifts via the EasyTeam API.

Example of how the EasyTeam time tracking is managed in the app using Axios for API requests:

```javascript
import React, { useRef, useState } from "react";
import { Timesheet } from "@easyteam/ui";

const TimesheetScreen = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const ref = useRef(null);
  return (
    <Timesheet
      ref={ref}
      onDateRangeChange={(newStartDate, newEndDate) => {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
      }}
      startDate={startDate}
      endDate={endDate}
      onEvent={(event) => console.log(event)}
    />
  );
};

export default TimesheetScreen;
```

### Sample Routes:

Routes in this app is managed using @react-navigation/native, @react-navigation/native-stack, @react-navigation/bottom-tabs

## Folder Structure
Will focus on files and folders that are important for running this app properly.

```bash
.
├── App.js                     # Root component of the app
├── assets/                    # Image and asset folder
├── components/                # Reusable components (e.g., Buttons, Modals)
├── context/                   # Context API for global state management
├── navigation/                # React Navigation configuration
├── Screens/                   # All the screen components (ClockScreen, TimesheetScreen, etc.)
├── config/                    # All the base url use in the app is in here
└── navigation/                # All the navigation and routing are handled in this folder
```

## Environment Variables

Create an `.npmrc` file in the root directory to store the npm key used in installing the easyteam SDK package.

```bash
BASE_URL=http://10.0.3.2:8000/api # use this if youre using Genymotion emulator
BASE_URL=http://10.0.2.2:8000/api # use this if youre using Android emulator
BASE_URL=http://10.0.2.2:8000/api # use this if youre using Android emulator
```
If you're runnning this React Native app using **Expo Go** on your Android phone and want to access the development server
### Steps for Using Expo Go on Android with a Local Development Server:

1. **Find Your Computer’s Local IP Address**:
   You need to find your computer’s local IP address so that your Android phone can communicate with your development machine.

   - On **Mac**:
     - Open Terminal and type `ifconfig | grep inet`.
     - Find the IP address that corresponds to your local network (usually looks something like `192.168.x.x`).

   - On **Windows**:
     - Open Command Prompt and type `ipconfig`.
     - Look for the "IPv4 Address" under the active network.

   **Ensure Both Devices Are on the Same Network**:
   Your computer and your Android device (running Expo Go) must be connected to the same Wi-Fi network. This allows your phone to communicate with the development server.

   **Disable Any Firewalls**:
   Sometimes, firewalls can block the connection between your phone and your development server. You might need to temporarily disable firewalls or allow traffic through port `8000` (or whatever port your server is using).

   **Run Expo and Scan the QR Code**:
   Once everything is set up:
   
   - Run `npm start`.
   - In Expo's development tools, ensure the "Connection" option is set to **LAN**.
   - Open the Expo Go app on your Android device and scan the QR code generated in the terminal or Expo GUI.


### Example Code Snippet Using Local IP Address:

Here’s an example of how you would set up the API base url with your local IP address:

```javascript
const BASE_URL = 'http://192.168.x.x:8000'; // Replace with your local IP
```

## Testing

You can write unit and integration tests using [Jest](https://jestjs.io/) or [React Native Testing Library](https://callstack.github.io/react-native-testing-library/).

To run tests:

```bash
npm test
```

Ensure you cover the critical parts of the app, including API interactions with EasyTeam and role-based navigation.

## Troubleshooting

- **Expo app not loading?**
  - Ensure your Expo CLI is up-to-date.
  - Make sure your development machine and mobile device are on the same Wi-Fi network.

- **Network request errors?**
  - Verify that the EasyTeam API base URL and routes are correct.
  - Ensure the JWT token is valid and not expired.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, follow these steps:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/my-new-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/my-new-feature`)
5. Create a new Pull Request

Please ensure your code follows the project's coding standards and includes relevant tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Acknowledgments

- **EasyTeam** for providing the time tracking service integration.
- **React Native** and **Expo** communities for the fantastic open-source tools.