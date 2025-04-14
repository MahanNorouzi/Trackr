````markdown
# Trackr

Trackr is a job tracking application designed to help users efficiently manage and track their job applications. The app allows users to store, view, and update job applications with key details like company name, position, and application status. Built using React, this app aims to streamline the job application process and make it easier for users to stay organized throughout their job search.

**Important Note**: This app is still in development and is using **local storage** to store job application data. **Do not use this app for actual job tracking at this time**, as data is stored locally and not securely. It is intended for testing purposes only.

## Features

- **Track Job Applications**: Store and view job applications with details such as job title, company, and status.
- **User Authentication**: Log in with your Firebase credentials.
- **Responsive Design**: Fully responsive and user-friendly interface that works well on both mobile and desktop devices.
- **Secure Data**: User data is securely stored using Firebase, ensuring a seamless experience.

## Note on Authentication

- Currently, the application does **not have a sign-up feature**. To log in, each user must set up their own Firebase project and add their Firebase credentials.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Firebase (Authentication & Firestore)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**: [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MahanNorouzi/Trackr.git
   cd Trackr
   ```
````

2. Install dependencies:

   ```bash
   npm install
   ```

   Or, if you're using Yarn:

   ```bash
   yarn install
   ```

3. Set up Firebase:

   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firebase Authentication (email/password or other methods).
   - Add your Firebase credentials to your environment variables (`.env` file). Make sure to add your own API key and other config values:

     ```env
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```

4. Run the application:

   ```bash
   npm run dev
   ```

   Or, if using Yarn:

   ```bash
   yarn dev
   ```

   This will start the development server. Open your browser and visit `http://localhost:5173` to see the app in action.

   - Log in with your Firebase credentials once the app is running.

## Contributing

If you'd like to contribute to the development of Trackr, feel free to fork the repository and create a pull request. Contributions are always welcome!

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add feature'`).
4. Push to your forked repository (`git push origin feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Firebase for providing authentication and real-time database services.
- React for building the user interface.
- Tailwind CSS for a fast, utility-first CSS framework.

```

```
