import axios from "axios";
import { Album, AlbumsList, ArtistAlbums, SearchResult } from "../types/common";
import { recordsService } from "./records.service";
import spotifyApi from "../utils/spotifyApi";

export const albumsService = {

  async getAlbumsByPopularity(artistName: string, userIp: string): Promise<Album[]> {

    const albumsIds = await this.getAlbumsIds(artistName);

    let albumsWithPopularity: Album[] = [];

    if(albumsIds.length > 0) {
      albumsWithPopularity = await this.getSortedAlbums(albumsIds);
    }

    await recordsService.createRecord(userIp, artistName);

    return albumsWithPopularity;
  },

  async getAlbumsIds(artistName: string): Promise<string[]> {
    const albums = await this.getAlbumsFromArtist(artistName);
    
    const albumsIds: string[] = albums.map(album => album.id);

    return albumsIds;
  },
  
  async getAlbumsFromArtist(artistName: string): Promise<Album[]> {
    const id = await this.getArtistId(artistName);
    let albums: Album[] = [];

    if(id) {
      const url = `${process.env.SPOTIFY_API_URL}/artists/${id}/albums?include_groups=album`;
      const { data } = await spotifyApi.get<ArtistAlbums>(url);
      albums = data.items;
    }

    return albums;
  },

  async getArtistId(artistName: string): Promise<string | undefined> {
    const url = `${process.env.SPOTIFY_API_URL}/search?q=${artistName.trim()}&type=artist`;

    const { data } = await spotifyApi.get<SearchResult>(url);

    return data.artists.items[0]?.id;
  },

  async getSortedAlbums(albumsIds: string[]) {
    const url = `${process.env.SPOTIFY_API_URL}/albums?ids=${albumsIds.join()}`;

    const { data } = await spotifyApi.get<AlbumsList>(url);
    
    return data.albums.sort((album1, album2) => album2.popularity - album1.popularity);
  },
}