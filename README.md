# Trackr

Trackr is a job tracking application designed to help users efficiently manage and track their job applications. The app enables users to store, view, and update job applications with key details like company name, position, and application status. Built using React, Trackr aims to streamline the job application process and help users stay organized throughout their job search.

> **Important Note**: This app is still in development and uses **local storage** to store job application data. **Do not use this app for actual job tracking at this time**, as data is stored locally and not securely. It is intended for testing purposes only.

---

## Features

- **Track Job Applications**: Store, view, and manage job applications with details like job title, company name, and application status.
- **User Authentication**: Log in securely using Firebase credentials.
- **Responsive Design**: A fully responsive and user-friendly interface optimized for both mobile and desktop devices.
- **Secure Data**: User data is stored securely using Firebase to ensure a smooth experience.

---

## Note on Authentication

- This application currently **does not support sign-up functionality**. To log in, users must set up their own Firebase project and add Firebase credentials.

---

## Tech Stack

| **Technology** | **Purpose**                          |
|-----------------|--------------------------------------|
| React.js        | Frontend development                |
| Firebase        | Authentication & Firestore backend  |
| Tailwind CSS    | Styling with utility-first CSS      |
| React Hooks     | State management                    |

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

1. **Node.js**: [Download Node.js](https://nodejs.org/)
2. **npm** (comes with Node.js) or **yarn**: [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/)

---

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/MahanNorouzi/Trackr.git
   cd Trackr
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   Or, if you're using Yarn:
   ```bash
   yarn install
   ```

3. **Set up Firebase**:
   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firebase Authentication (email/password or other methods).
   - Add Firebase credentials to your environment variables by creating a `.env` file. Include your API key and other config values:
     ```env
     VITE_FIREBASE_API_KEY=your-api-key
     VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
     VITE_FIREBASE_PROJECT_ID=your-project-id
     VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
     VITE_FIREBASE_APP_ID=your-app-id
     ```

4. **Run the application**:
   ```bash
   npm run dev
   ```
   Or, if using Yarn:
   ```bash
   yarn dev
   ```
   This starts the development server. Open your browser and visit `http://localhost:5173` to see the app in action.

   - Log in using your Firebase credentials once the app is running.

---

## Contributing

Want to help improve Trackr? Contributions are welcome! Here's how you can get involved:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -am 'Add feature'
   ```
4. Push to your forked repository:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

Trackr is licensed under the MIT License. For more details, see the [LICENSE](LICENSE) file.

---

## Acknowledgments

- **Firebase**: For providing authentication and real-time database services.
- **React**: For enabling a seamless user interface.
- **Tailwind CSS**: For offering a utility-first CSS framework that simplifies styling.

