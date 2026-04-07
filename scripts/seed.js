// scripts/seed.js
import mongoose from "mongoose";
import Artist from "../models/artist.js";
import Album from "../models/album.js";
import Song from "../models/song.js";
import User from "../models/user.js";
import Playlist from "../models/playlist.js";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');

    // create a sample artist and album to link songs to
    const artist = await Artist.create({
      name: 'Various Artist',
      genre: 'Pop',
      bio: 'Collection of seeded songs.'
    });

    const album = await Album.create({
      title: 'Seeded Collection',
      releaseYear: 2024,
      artist: artist._id,
      coverImage: 'https://example.com/cover.jpg'
    });

    // 4. Create 50 Songs (Linked to Album and Artist)
    const genres = ['Pop', 'Rock', 'Jazz', 'Hip-Hop'];

    // A small list of 50 sample song titles
    const titles = [
      'Midnight Echoes','Solar Flare','City Lights','Paper Boats','Neon Dreams',
      'Velvet Sky','Glass Harbor','Silver Lanes','Rust & Roses','Parallel Hearts',
      'Golden Static','Quiet Riot','Blue Horizon','Echo Chamber','Last Parade',
      'Shadow Play','Crimson Wave','Frozen Dawn','Paper Wings','Starlit Route',
      'Hollow Road','Twin Rivers','Moonlit Parade','Velvet Tides','Falling Pages',
      'Carousel Mind','Empty Frames','Whispered Maps','Gilded Cage','Late Train',
      'Ink & Feather','Broken Compass','Silent Motor','Autumn Glass','Neon Harbor',
      'Radiant Fog','Winding Thread','Copper Bloom','Faint Signal','Aurora Line',
      'Distant Signal','Luminous Dust','Bitter Sugar','Lone Satellite','Cracked Mirror',
      'Paper Stars','Rooftop Parade','Velvet Echo','Concrete Garden'
    ];

    const songsData = titles.map((title, idx) => ({
      title,
      duration: 180 + (idx % 6) * 15, // durations between 180-265
      album: album._id,
      artist: artist._id,
      genre: genres[idx % genres.length]
    }));

    const createdSongs = await Song.insertMany(songsData);
    console.log(`Created ${createdSongs.length} Songs.`);

    console.log('✅ Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Failed:', error);
    process.exit(1);
  }
}

seed();