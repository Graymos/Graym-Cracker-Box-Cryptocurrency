# Graym Cracker Box 🍪

A deliciously themed blockchain implementation that turns the complex world of cryptocurrency into a fun, graham cracker-themed experience. Each block in the chain is represented as a "cracker," making the concept of blockchain more digestible (pun intended!).

## Features

- 🍪 Graham cracker-themed blockchain visualization
- 🔐 Secure transaction system
- 📊 Real-time blockchain statistics
- 🎨 Beautiful, responsive UI with Bootstrap 5
- 🔄 Automatic blockchain updates
- 📱 Mobile-friendly design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crypto
```

2. Install dependencies:
```bash
# Install backend dependencies
npm install express@4.17.1 sqlite3@5.0.2 crypto-js@4.1.1 body-parser@1.19.0

# Or simply run (package.json already includes these)
npm install
```

Note: The `node_modules` directory is not included in the repository (it's in `.gitignore`). This is standard practice as it can be very large. Instead, the dependencies will be installed locally when you run `npm install`.

3. Start the server:
```bash
node server.js
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

The frontend dependencies (Bootstrap 5 and Font Awesome) are loaded via CDN and don't require separate installation.

## How It Works

### Baking Crackers (Mining Blocks)
1. Enter the amount of crackers to create
2. Specify the baker (sender) and recipient
3. Click "Bake Cracker" to create a new block
4. The system will automatically mine the block and add it to the chain

### Viewing the Cracker Chain
- The blockchain is displayed as a series of cards
- Each card represents a block (cracker) in the chain
- Genesis block is marked with a special border
- Latest block is highlighted
- Transaction details are shown for each block

### Statistics
- Total number of crackers in the chain
- Total number of cracker trades
- Total value of all crackers

## Technical Details

### Backend
- Built with Node.js
- Uses SQLite3 for data persistence
- Implements a proof-of-work algorithm for mining
- RESTful API endpoints for blockchain operations

### Frontend
- Responsive design with Bootstrap 5
- Real-time updates using JavaScript
- Beautiful animations for new blocks
- Error handling and user feedback

## API Endpoints

- `GET /api/chain` - Get the entire blockchain
- `POST /api/mine` - Mine a new block
  - Body: `{ amount: number, sender: string, recipient: string }`

## Security Features

- Cryptographic hashing for block integrity
- Proof-of-work system to prevent spam
- Input validation for all transactions
- Error handling for invalid operations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the deliciousness of graham crackers
- Built with ❤️ for educational purposes

## Support

If you encounter any issues or have questions, please open an issue in the repository.

## AI Disclaimer

This project was developed with the assistance of AI tools. While the core functionality and design decisions were made by the development team, AI was used to:
- Generate and optimize code
- Provide design suggestions
- Assist with documentation
- Help debug and troubleshoot issues

The use of AI was instrumental in accelerating development and ensuring code quality, but all final decisions and implementations were reviewed and approved by the development team.

---

Made with 🍪 by the Graym Cracker Box team 