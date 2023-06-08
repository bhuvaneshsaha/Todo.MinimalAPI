import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GravatarService {
  async getGravatarUrl(email: string, defaultImage: string): Promise<string> {
    const trimmedEmail = email.trim().toLowerCase();
    const hash = await this.hash(trimmedEmail);
    return `https://www.gravatar.com/avatar/${hash}?d=${encodeURIComponent(defaultImage)}`;
  }

  async hash(email: string): Promise<string> {
    const msgUint8 = new TextEncoder().encode(email);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
  }
}

export enum DefaultGravatarImage {
  NotFound = '404',
  MysteryPerson = 'mp',
  Identicon = 'identicon',
  MonsterId = 'monsterid',
  Wavatar = 'wavatar',
  Retro = 'retro',
  RoboHash = 'robohash',
  Blank = 'blank',
}
