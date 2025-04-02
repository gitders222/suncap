# Nordisk Butikk - Norwegian E-commerce Shop

Nordisk Butikk is a modern e-commerce platform designed specifically for the Norwegian market, featuring integration with Vipps and Norwegian bank payment solutions.

## Features

- **Norwegian-focused Design**: Complete Norwegian language UI and UX
- **Responsive Design**: Works on all devices and screen sizes
- **Product Management**: Easy to manage products, categories, and inventory
- **Shopping Cart**: Intuitive shopping cart with real-time updates
- **Secure Checkout**: Multiple payment options with Norwegian payment providers
- **Norwegian Payment Integration**:
  - Vipps Integration
  - Norwegian Bank Integration
- **Order Management**: Track orders, update status, and manage fulfillment
- **User Accounts**: User registration, profiles, and order history

## Technology Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- CSS with custom variables for theming
- Responsive design with CSS Grid and Flexbox

### Backend
- Node.js with Express.js
- MongoDB for database
- Mongoose ODM
- JWT for authentication
- Bcrypt for password hashing

### Payment Integrations
- Vipps API integration
- Norwegian Bank payment integration

## Project Structure

The project follows a modern, organized file structure:

```
nordisk-butikk/
├── public/                  # Publicly accessible files
│   ├── images/              # Product and UI images
│   ├── fonts/               # Custom fonts
│   └── favicon.ico          # Site favicon
├── src/                     # Frontend source code
│   ├── components/          # Reusable UI components
│   ├── pages/               # Page components
│   ├── services/            # API and service integrations
│   ├── utils/               # Utility functions
│   ├── context/             # React context providers
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Styling files
│   ├── i18n/                # Internationalization
│   ├── App.js               # Main application component
│   └── index.js             # Application entry point
├── server/                  # Backend code
│   ├── controllers/         # Request handlers
│   ├── models/              # Data models
│   ├── routes/              # API routes
│   ├── config/              # Server configuration
│   ├── middleware/          # Custom middleware
│   └── server.js            # Server entry point
└── config/                  # Build and environment configuration
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Steps

1. Clone the repository:
```
git clone https://github.com/yourusername/nordisk-butikk.git
cd nordisk-butikk
```

2. Install dependencies:
```
npm install
```

3. Set up environment variables:
   - Copy the `.env.example` file to `.env`
   - Edit the `.env` file with your own configuration values

4. Start the development server:
```
npm run dev
```

This will start both the backend server and the React development server.

## Payment Integration

### Vipps Integration

This project includes integration with Vipps, Norway's most popular mobile payment solution. To use Vipps in your project:

1. Sign up for a Vipps developer account at [portal.vipps.no](https://portal.vipps.no)
2. Obtain your Vipps API credentials
3. Update the `.env` file with your Vipps API credentials

### Norwegian Bank Integration

For Norwegian bank payment integration:

1. Sign up with a Norwegian payment service provider that supports bank payments
2. Obtain API credentials
3. Update the `.env` file with your bank API credentials

## Deployment

### Frontend Deployment
The React frontend can be deployed to platforms like Vercel, Netlify, or AWS Amplify:

```
npm run build
```

This will create a production build in the `build` directory.

### Backend Deployment
The Express backend can be deployed to platforms like Heroku, DigitalOcean, or AWS EC2.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Vipps](https://vipps.no) for their payment solution
- Norwegian banking system for providing secure payment options
- The React and Node.js communities for their excellent libraries and tools