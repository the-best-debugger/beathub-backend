// scripts/seed.js
import mongoose from "mongoose";
import Artist from "../models/artist.model.js";
import Album from "../models/album.model.js";
import Song from "../models/song.model.js";
import User from "../models/user.model.js";
import Playlist from "../models/playlist.model.js";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    // 1. Clear existing data to avoid duplicates
    await Artist.deleteMany({});
    await Album.deleteMany({});
    await Song.deleteMany({});
    await User.deleteMany({});
    await Playlist.deleteMany({});

    // 2. Create an Artist
    const artist = await Artist.create({
      name: 'Daft Punk',
      genre: 'Electronic',
      bio: 'French electronic music duo.'
    });
    console.log(`Created Artist: ${artist.name}`);

    // 3. Create an Album (Linked to Artist)
    const album = await Album.create({
      title: 'Discovery',
      releaseYear: 2001,
      artist: artist._id, // REFERENCING ID
      coverImage: 'https://example.com/cover.jpg'
    });
    console.log(`Created Album: ${album.title}`);

    // 4. Create a Song (Linked to Album and Artist)
    const song = await Song.create({
      title: 'One More Time',
      duration: 320,
      album: album._id,  // REFERENCING ID
      artist: artist._id // REFERENCING ID
    });
    console.log(`Created Song: ${song.title}`);

    // 5. Create a User
    const user = await User.create({
      username: 'music_fan_01',
      email: 'fan@example.com',
      password: 'hashed_password_123' 
    });
    console.log(`Created User: ${user.username}`);

    // 6. Create a Playlist (Linked to User and containing Songs)
    const playlist = await Playlist.create({
      name: 'Gym Jams',
      user: user._id,    // REFERENCING ID
      songs: [song._id], // ARRAY OF IDs
      description: 'High energy tracks'
    });
    console.log(`Created Playlist: ${playlist.name}`);

    console.log('✅ Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Failed:', error);
    process.exit(1);
  }
}

seed();