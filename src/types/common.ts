export interface Album {
  id: string;
  name: string;
  images: AlbumImage[];
  popularity: number;
}

export interface AlbumImage {
  height: number;
  url: string;
  width: number;
}

export interface SearchResult {
  artists: {
    items: Artist[]
  }
}

export interface Artist {
  id: string;
}

export interface ArtistAlbums {
  items: Album[];
}

export interface AlbumsList {
  albums: Album[]
}