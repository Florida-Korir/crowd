
# Crowd - Crowdfunding Web App

## Overview
Crowd is a decentralized crowdfunding platform that enables users to launch and support campaigns easily. The platform integrates Mpesa for donations, offering a streamlined experience for Kenyan users to contribute to causes they care about.

## Features
- **Campaign Creation** : Easily create and manage fundraising campaigns.
- **Secure Donations** : Mpesa integration for seamless payment processing.
- **User Authentication using Privado ID** : Secure login and campaign management.
- **Real-Time Updates** : Stay informed with live campaign updates keeping you up to date with the latest campaigns.

## Installation

1. **Clone the repository**:
   ```
   git clone https://github.com/Florida-Korir/crowd.git
   cd crowd
   ```

2. **Client Setup**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Backend Setup**:
   ```bash
   cd Backend
   npm install
   npm run start
   ```

5. **Mpesa API Setup**:
   ```bash
   cd Mpesa-Daraja-Api-NODE.JS
   npm install
   npm run start
   ```

6. **Mpesa Demo UI**:
   ```bash
   cd Mpesa-Demo-Ui-React
   npm install
   npm run build
   npm install -g serve
   serve -s build
   ```

## Technologies Used
- **Frontend**: React
- **Backend**: Node.js
- **Payment Integration**: Mpesa Daraja API
- **SMS Service**: Node.js

## Demo Link
``https://www.youtube.com/watch?v=kg_p1taUZmQ``


## Contributing
Pull requests are welcome. For major changes, open an issue to discuss.

## License
[MIT](https://opensource.org/licenses/MIT)
