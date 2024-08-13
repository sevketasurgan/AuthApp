# AuthApp

AuthApp is a sample authentication application built with Angular for the frontend and ASP.NET Core for the backend. It demonstrates user registration, login, and logout functionalities using JWT tokens.

## Features

- User Registration
- User Login
- User Logout
- JWT Authentication
- Responsive UI

## Getting Started

To get started with AuthApp, follow these steps:

### Prerequisites

- Node.js (version 16 or later)
- Angular CLI
- .NET SDK (version 6 or later)
- PostgreSQL (for database)

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sevketasurgan/AuthApp.git
Navigate to the backend folder:

bash
Copy code
cd AuthApp/backend
Restore the NuGet packages:

bash
Copy code
dotnet restore
Update the appsettings.json file with your PostgreSQL connection string.

Apply database migrations:

bash
Copy code
dotnet ef database update
Run the application:

bash
Copy code
dotnet run
The backend will be running on http://localhost:7265.

Frontend Setup
Navigate to the frontend folder:

bash
Copy code
cd AuthApp/frontend
Install the required Node.js packages:

bash
Copy code
npm install
Start the Angular application:

bash
Copy code
ng serve
The application will be available at http://localhost:4200.

API Endpoints
POST /api/register: Creates a new user registration.

Body: { "email": "user@example.com", "password": "Password123!" }
Response: { "token": "jwt_token_here" }
POST /api/login: Logs in a user.

Body: { "email": "user@example.com", "password": "Password123!" }
Response: { "token": "jwt_token_here" }
Usage Guide
Register: Click on the "Register" link on the home page to create a new user account.
Login: Click on the "Login" link on the home page to log in.
Logout: After logging in, click on the "Logout" button at the top right corner to log out.
Contributing
If you would like to contribute, please feel free to submit pull requests and report issues. Before contributing, please review the CONTRIBUTING.md file.

License
This project is licensed under the MIT License.

Contact
For questions and feedback, you can reach out at sevketasurgan@example.com.
