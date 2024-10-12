# SocioGram

SocioGram is a real-time social media platform built using the MERN (MongoDB, Express, React, Node.js) stack. Users can post content, follow other users, like posts, and interact in real-time.

## Features

- User authentication and authorization
- Create, read, update, and delete posts
- Follow/unfollow other users
- Like and comment on posts
- Real-time updates for new posts, likes, and comments
- User profiles with customizable avatars

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (v4 or later)
- Git

## Installation

To install SocioGram, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/sociogram.git
   cd sociogram
   ```

2. Install dependencies for both the server and client:
   ```
   cd .\frontend\
   npm install
   cd ..
   cd .\backend\ 
   npm install
   cd ..
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

   SMPT_HOST=your_smtp_host
   SMPT_PORT=your_smtp_port
   SMPT_MAIL=your_smtp_email
   SMPT_PASSWORD=your_smtp_password
   SMPT_SERVICE=your_smtp_service

   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API=your_cloudinary_api_key
   CLOUD_SECRET=your_cloudinary_api_secret
   ```

   Replace the placeholder values with your actual configuration details.

## Usage

To run SocioGram, use the following commands:

1. Start the server:
   ```
   cd .\backend\ 
   npm run dev
   ```

2. In a separate terminal, start the client:
   ```
   cd .\frontend\
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to access the application.

## Contributing

We welcome contributions to SocioGram! Here's how you can contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

Please make sure to update tests as appropriate and adhere to the existing coding style.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, please reach out to us at [your-email@example.com](mailto:shreyansh2102004@gmail.com).

Thank you for your interest in SocioGram!
