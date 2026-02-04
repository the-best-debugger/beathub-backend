# Design Decisions

Why did you reference Songs in the Playlist instead of embedding them?

I referenced songs in the Playlist as an array of `ObjectId` references (`ref: "Song"`) rather than embedding full song documents to keep data normalized and avoid duplication. Songs are first-class entities used across the app (they appear in albums, search results, and multiple playlists), so referencing provides a single source of truth: updating a `Song` document (metadata, duration, artist, album) is reflected everywhere it's referenced without needing to update embedded copies. References also keep playlist documents small and performant, and allow efficient indexing and querying (for example, populating only when necessary or querying playlists by song id).

Embedding would be appropriate when the song data were small, immutable, and unique to a single playlist — which is not the case here.

Why did you reference the Artist in the Song model?

The `Song` model stores `artist` as an `ObjectId` reference (`ref: 'Artist'`) to avoid repeating artist metadata across many song documents. Artists have attributes (name, genre, bio) that are shared across all their songs; referencing lets the app maintain consistency and change artist information in one place. It also reduces storage size for each `Song` document and enables efficient queries and population (e.g., fetch songs and populate artist details only when needed). Finally, referencing supports indexing on the artist field to speed up queries like "all songs by this artist." 

In short, references were chosen for normalization, consistency, storage efficiency, and query flexibility.
