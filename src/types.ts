/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Track {
  id: string;
  title: string;
  prompt: string;
  genre: string;
  mood: string;
  vocals: string;
  tempo: string;
  instruments: string[];
  key: string;
  language: string;
  theme: string;
  lyrics: string;
  audioUrl?: string;
  createdAt: Date;
  liked: boolean;
  plays: number;
  tags: string[];
  era: string;
  playlistIds: string[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  trackIds: string[];
  createdAt: Date;
}

export interface MixSlider {
  genre: string;
  value: number;
}

export type Page = 'create' | 'explore' | 'library' | 'studio' | 'trending';
export type CreateTab = 'quick' | 'custom' | 'lyrics' | 'mixer' | 'vocal';
export type ExploreTab = 'featured' | 'genres' | 'moods';
export type LibraryTab = 'tracks' | 'favorites' | 'playlists';
export type StudioTab = 'remix' | 'advanced';
export type TrendingTab = 'today' | 'alltime';
