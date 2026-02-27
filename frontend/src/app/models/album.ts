export interface Track {
  title: string;
  length: string;
}

export interface Album {
  id?: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
  tracks: Track[];
}