# BeatHub Backend
This is the backend for BeatHub.

Prerequisites
- Node.js
- A running MongoDB instance

Setup
1. Create a `.env` file in the project root with at least the `MONGO_URI` variable. Example:

```env
MONGO_URI=mongodb://localhost:27017/beathub
```

2. Install dependencies:

```bash
npm install
```

Run the seed script
- Development (installs and runs with nodemon):

```bash
npm run dev
```

- Directly run the seeder:

```bash
npm start
```

The seeder file is `scripts/seed.js` and will connect using the `MONGO_URI` value from your `.env` file and populate Artists, Albums, Songs, Users, and Playlists.