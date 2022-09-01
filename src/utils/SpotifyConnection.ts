import axios from 'axios';
import qs from 'qs';

interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export class SpotifyConnection {
  private static access_token: string;

  static async getAccessToken(): Promise<string> {
    if (!SpotifyConnection.access_token) {
      await SpotifyConnection.updateAccessToken();
    }

    return SpotifyConnection.access_token;
  }

  private static async getToken(): Promise<Token> {
    const url = process.env.SPOTIFY_TOKEN_URL as string;
    const clientId = process.env.SPOTIFY_API_CLIENT_ID as string;
    const clientSecret = process.env.SPOTIFY_API_CLIENT_SECRET as string;

    const { data } = await axios.post<Token>(url, qs.stringify({
      grant_type: 'client_credentials'
    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': 'Basic ' + (Buffer.from(clientId + ':' + clientSecret).toString('base64'))
      }
    });

    return data;
  }

  private static async updateAccessToken(): Promise<void> {
    const token = await SpotifyConnection.getToken();
    SpotifyConnection.access_token = token.access_token;
    SpotifyConnection.startTiming(token.expires_in);
  }
  
  private static startTiming(sec: number) {
    setTimeout(async () => {
      SpotifyConnection.updateAccessToken();
    }, (sec - 60) * 1000);
  }
}
