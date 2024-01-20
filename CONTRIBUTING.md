# Contributing to Kharcha Tracker App

Thank you for considering contributing to Kharcha Tracker App! Contributions help improve and grow the project. Before getting started, please take a moment to review the following guidelines.

> **Note:**
>
> 1. This repository is specifically for backend-related changes. For UI-related changes, please refer to the [Kharcha Tracker UI](https://github.com/piyush7199/kharcha-tracker-UI) repository.
> 2. If you need to modify email functionality, you will also have to use the [email-verification](https://github.com/piyush7199/email-verification). Refer to the linked repository for more information on how to integrate and customize email verification.

## Table of Contents

- [How to Contribute](#how-to-contribute)
- [Setting Up the Development Environment](#setting-up-the-development-environment)
- [Environment Variables](#environment-variables)
- [Code Style](#code-style)
- [Submitting Pull Requests](#submitting-pull-requests)

## How to Contribute

1. **Fork the Repository on GitHub:**

   - Visit the Kharcha Tracker repository on GitHub: [https://github.com/piyush7199/kharcha-tracker](https://github.com/piyush7199/kharcha-tracker).
   - Click on the "Fork" button in the top right corner to create a copy of the repository in your GitHub account.

2. **Clone Your Forked Repository:**

   - Open a terminal or command prompt on your local machine.
   - Run the following command to clone the repository to your machine:

     ```bash
     git clone https://github.com/piyush7199/kharcha-tracker
     ```

3. **Create a New Branch:**

   - Change into the project's directory:

     ```bash
     cd kharcha-tracker
     ```

   - Create a new branch for your contribution. The branch name should be descriptive of the changes you are making:

     ```bash
     git checkout -b feature-or-fix-name
     ```

4. **Make Changes and Test:**

   - Make the necessary changes to the codebase.
   - Test your changes to ensure they work as expected.

5. **Commit Your Changes:**

   - Commit your changes with a clear and descriptive commit message:

     ```bash
     git add .
     git commit -m "Your descriptive commit message"
     ```

6. **Push Changes to Your Fork:**

   - Push the changes to the branch you created in your forked repository:

     ```bash
     git push origin feature-or-fix-name
     ```

7. **Open a Pull Request:**
   - Visit your fork on GitHub: [https://github.com/piyush7199/kharcha-tracker](https://github.com/piyush7199/kharcha-tracker).
   - Click on the "New Pull Request" button.
   - Ensure that the base repository is set to `piyush7199/kharcha-tracker` and the base and compare branches are appropriately selected.
   - Write a clear and detailed pull request description.
   - Click on the "Create Pull Request" button.

## Setting Up the Development Environment

Make sure you have Node.js, npm, and MongoDB installed on your machine. You can download them from:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Environment Variables

Kharcha Tracker App uses several environment variables for configuration. These variables should be set based on your local development environment or deployment settings. Make sure to configure the following variables:

- **`PORT`**: Specify the port on which the application should listen.
- **`MONGODB_URI`**: The connection URI for your MongoDB database.
- **`EMAIL_ADDRESS`**: The email address used for sending system emails.
- **`EMAIL_APP_PASSWORD`**: The application-specific password for the email service.
- **`EMAIL_PASSWORD`**: The general email password.
- **`JWT_SECRET`**: The secret key used for JWT (JSON Web Token) encryption.
- **`ENVIRONMENT`**: Specify the environment mode (e.g., development, production).
- **`EMAIL_SERVICE_URL`**: The URL for the email service.
- **`EMAIL_SERVICE_TOKEN`**: The token required for authentication with the email service.

## Code Style

Follow these code style guidelines when contributing to the Kharcha Tracker App. Consistent code style helps maintain a clean and readable codebase.

### General Guidelines

- **Consistent Imports:**

  - Use named imports consistently.
  - Example:

    ```javascript
    import { genSalt, hash, compare } from "bcrypt";
    import {
      getEmailChangeMail,
      getForgetEmail,
    } from "../../constants/appConstants.js";
    import {
      getErrorResponse,
      getErrorResponseForUnprovidedFields,
    } from "../../utilities/responses/responses.js";
    ```

- **Descriptive Variable Names:**

  - Use descriptive variable names for clarity.
  - Example:

    ```javascript
    const emailChangeOtp = generateOTP();
    ```

- **Error Handling:**
  - Utilize the `asyncHandler` consistently for asynchronous functions.

### Indentation and Formatting

- **Indentation:**

  - Use 2 spaces for indentation.
  - Example:

    ```javascript
    const changeEmail = asyncHandler(async (req, res) => {
      // ... code
    });
    ```

- **Braces Placement:**

  - Place opening braces on the same line as the corresponding statement.

- **Logging:**

  - Consider using a more robust logging solution instead of `console.log`, especially in production.

- **Middleware and Reusability:**

  - If `asyncHandler` is something used across multiple routes/controllers, consider moving it to a middleware function to avoid redundancy.

- **Consistent Status Codes:**
  - Ensure that HTTP status codes are consistent throughout the codebase.

### Comments

- **Comments:**
  - Add comments where necessary to explain complex logic or functionality.

### Unused Imports

- **Remove Unused Imports:**
  - Remove any imports that are not being used in the file.

### Consistency

- **Consistency:**
  - Be consistent with the existing codebase. Match the style used in the files you are working on.

## Submitting Pull Requests

When submitting a pull request, please ensure the following:

1. **Descriptive Title:**

   - Provide a clear and descriptive title for your pull request. It should succinctly describe the purpose of the changes.

2. **Detailed Description:**

   - Write a detailed description of the changes introduced by your pull request. Explain the problem your changes solve or the new features they add.

3. **Include Tests:**

   - If applicable, include tests that cover the changes you made. Tests help maintain the stability of the codebase.

4. **Follow Code Style:**

   - Ensure that your code follows the established code style guidelines. Consistent code style helps maintain a clean and readable codebase.

5. **Resolve Conflicts:**

   - If there are conflicts with the base branch, resolve them before submitting the pull request.

6. **Review and Discussion:**

   - Be open to feedback and participate in discussions related to your pull request. Respond promptly to any comments or suggestions.

7. **CI/CD Checks:**

   - Ensure that your changes pass any continuous integration (CI) or continuous deployment (CD) checks set up for the repository.

8. **Squash Commits:**

   - Consider squashing multiple commits into a single, coherent commit before merging. This helps maintain a clean and organized git history.

9. **Rebase on the Latest:**

   - Before finalizing your pull request, rebase your branch on the latest changes from the base branch to avoid merge conflicts.

10. **Assignees and Labels:**

- Assign relevant team members as reviewers and add appropriate labels to your pull request.

11. **Documentation:**

- Update any relevant documentation to reflect the changes you've made.

Once your pull request meets these criteria, click on the "Create Pull Request" button. Your changes will be reviewed, and if approved, merged into the main codebase.

Thank you for your contribution!

Happy Coding!!
