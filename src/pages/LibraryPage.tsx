/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Library, Heart, ListMusic, Music2, Play, Trash2,
  Plus, Download, Share2, Clock, Search, FolderOpen,
} from 'lucide-react';
import { Track, Playlist, LibraryTab } from '../types';

interface Props {
  tracks:    Track[];
  playlists: Playlist[];
  onToggleLike:      (id: string) => void;
  onDeleteTrack:     (id: string) => void;
  onCreatePlaylist:  (name: string, desc: string) => void;
  onDeletePlaylist:  (id: string) => void;
  onAddToPlaylist:   (trackId: string, playlistId: string) => void;
  onPlayTrack:       (track: Track) => void;
}

const TABS: { id: LibraryTab; label: string; icon: React.ReactNode }[] = [
  { id: 'tracks',    label: 'My Tracks',  icon: <Music2 className="w-4 h-4" /> },
  { id: 'favorites', label: 'Favorites',  icon: <Heart className="w-4 h-4" /> },
  { id: 'playlists', label: 'Playlists',  icon: <ListMusic className="w-4 h-4" /> },
];

function formatDate(d: Date): string {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function TrackRow({
  track, onToggleLike, onDelete, onPlay,
}: {
  track: Track;
  onToggleLike: (id: string) => void;
  onDelete: (id: string) => void;
  onPlay: (track: Track) => void;
}) {
  return (
    <div className="group flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition-all">
      <button
        onClick={() => onPlay(track)}
        className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-700 to-pink-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
      >
        <Play className="w-4 h-4 text-white fill-white" />
      </button>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-gray-100 truncate">{track.title}</p>
        <p className="text-xs text-gray-500">
          {[track.genre, track.mood, track.vocals].filter(Boolean).join(' · ')}
        </p>
      </div>

      <span className="text-xs text-gray-600 hidden sm:block">{formatDate(track.createdAt)}</span>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onToggleLike(track.id)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            track.liked ? 'text-pink-400 bg-pink-900/30' : 'text-gray-500 hover:text-pink-400 hover:bg-gray-700'
          }`}
        >
          <Heart className={`w-4 h-4 ${track.liked ? 'fill-pink-400' : ''}`} />
        </button>
        {track.audioUrl && (
          <a
            href={track.audioUrl}
            download={`${track.title}.wav`}
            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-green-400 hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
          </a>
        )}
        <button
          onClick={() => onDelete(track.id)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-gray-700 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── my tracks tab ────────────────────────────────────────────────────────────
function MyTracksTab({ tracks, onToggleLike, onDeleteTrack, onPlay }: {
  tracks: Track[];
  onToggleLike: (id: string) => void;
  onDeleteTrack: (id: string) => void;
  onPlay: (track: Track) => void;
}) {
  const [search, setSearch] = useState('');
  const [filterGenre, setFilterGenre] = useState('');

  const genres = [...new Set(tracks.map(t => t.genre).filter(Boolean))];

  const filtered = tracks.filter(t => {
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.prompt.toLowerCase().includes(search.toLowerCase());
    const matchGenre = !filterGenre || t.genre === filterGenre;
    return matchSearch && matchGenre;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search your tracks…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 pl-9 pr-4 py-2.5 rounded-xl outline-none text-sm text-gray-200 placeholder-gray-600 focus:ring-2 focus:ring-violet-500"
          />
        </div>
        {genres.length > 0 && (
          <select
            value={filterGenre}
            onChange={e => setFilterGenre(e.target.value)}
            className="bg-gray-950 border border-gray-700 px-3 py-2.5 rounded-xl outline-none text-sm text-gray-300"
          >
            <option value="">All genres</option>
            {genres.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        )}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{filtered.length} track{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <Music2 className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">
            {tracks.length === 0 ? 'No tracks yet' : 'No matching tracks'}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            {tracks.length === 0 ? 'Head over to Create to generate your first track' : 'Try a different search'}
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          {filtered.map(t => (
            <TrackRow
              key={t.id}
              track={t}
              onToggleLike={onToggleLike}
              onDelete={onDeleteTrack}
              onPlay={onPlay}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── favorites tab ────────────────────────────────────────────────────────────
function FavoritesTab({ tracks, onToggleLike, onDeleteTrack, onPlay }: {
  tracks: Track[];
  onToggleLike: (id: string) => void;
  onDeleteTrack: (id: string) => void;
  onPlay: (track: Track) => void;
}) {
  const favorites = tracks.filter(t => t.liked);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{favorites.length} favorite{favorites.length !== 1 ? 's' : ''}</p>
      </div>

      {favorites.length === 0 ? (
        <div className="py-16 text-center">
          <Heart className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No favorites yet</p>
          <p className="text-gray-600 text-sm mt-1">Like a track to save it here</p>
        </div>
      ) : (
        <div className="space-y-1">
          {favorites.map(t => (
            <TrackRow
              key={t.id}
              track={t}
              onToggleLike={onToggleLike}
              onDelete={onDeleteTrack}
              onPlay={onPlay}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── playlists tab ────────────────────────────────────────────────────────────
function PlaylistsTab({ playlists, tracks, onCreatePlaylist, onDeletePlaylist, onPlay }: {
  playlists: Playlist[];
  tracks: Track[];
  onCreatePlaylist: (name: string, desc: string) => void;
  onDeletePlaylist: (id: string) => void;
  onPlay: (track: Track) => void;
}) {
  const [creating, setCreating] = useState(false);
  const [newName,  setNewName]  = useState('');
  const [newDesc,  setNewDesc]  = useState('');
  const [openId,   setOpenId]   = useState<string | null>(null);

  const handleCreate = () => {
    if (!newName.trim()) return;
    onCreatePlaylist(newName.trim(), newDesc.trim());
    setNewName('');
    setNewDesc('');
    setCreating(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{playlists.length} playlist{playlists.length !== 1 ? 's' : ''}</p>
        <button
          onClick={() => setCreating(!creating)}
          className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-colors"
        >
          <Plus className="w-4 h-4" /> New Playlist
        </button>
      </div>

      {creating && (
        <div className="p-4 rounded-xl bg-gray-950 border border-violet-700 space-y-3">
          <input
            type="text"
            placeholder="Playlist name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg outline-none text-sm text-gray-100 placeholder-gray-600 focus:ring-2 focus:ring-violet-500"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newDesc}
            onChange={e => setNewDesc(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 p-3 rounded-lg outline-none text-sm text-gray-100 placeholder-gray-600 focus:ring-2 focus:ring-violet-500"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              disabled={!newName.trim()}
              className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:bg-gray-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Create
            </button>
            <button
              onClick={() => setCreating(false)}
              className="px-4 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-gray-200 text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {playlists.length === 0 ? (
        <div className="py-16 text-center">
          <ListMusic className="w-12 h-12 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-400 font-medium">No playlists yet</p>
          <p className="text-gray-600 text-sm mt-1">Create a playlist to organize your tracks</p>
        </div>
      ) : (
        <div className="space-y-3">
          {playlists.map(pl => {
            const plTracks = tracks.filter(t => pl.trackIds.includes(t.id));
            const isOpen = openId === pl.id;
            return (
              <div key={pl.id} className="rounded-xl border border-gray-800 overflow-hidden">
                <button
                  onClick={() => setOpenId(isOpen ? null : pl.id)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-gray-800 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-700 to-teal-700 flex items-center justify-center flex-shrink-0">
                    <FolderOpen className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-100">{pl.name}</p>
                    <p className="text-xs text-gray-500">{plTracks.length} track{plTracks.length !== 1 ? 's' : ''}{pl.description ? ` · ${pl.description}` : ''}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={e => { e.stopPropagation(); onDeletePlaylist(pl.id); }}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-gray-600 hover:text-red-400 hover:bg-gray-700 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-800">
                    {plTracks.length === 0 ? (
                      <p className="text-center text-gray-600 text-sm py-6">No tracks in this playlist yet</p>
                    ) : (
                      plTracks.map(t => (
                        <div
                          key={t.id}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 transition-colors group"
                        >
                          <button
                            onClick={() => onPlay(t)}
                            className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-700 to-pink-700 flex items-center justify-center flex-shrink-0"
                          >
                            <Play className="w-3.5 h-3.5 text-white fill-white" />
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-200 truncate">{t.title}</p>
                            <p className="text-xs text-gray-600">{t.genre}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── main library page ────────────────────────────────────────────────────────
export default function LibraryPage({
  tracks, playlists, onToggleLike, onDeleteTrack,
  onCreatePlaylist, onDeletePlaylist, onAddToPlaylist, onPlayTrack,
}: Props) {
  const [tab, setTab] = useState<LibraryTab>('tracks');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Library</h1>
        <p className="text-gray-400 text-sm mt-1">Your generated tracks, favorites, and playlists</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Tracks', value: tracks.length, icon: <Music2 className="w-5 h-5 text-violet-400" /> },
          { label: 'Favorites',    value: tracks.filter(t => t.liked).length, icon: <Heart className="w-5 h-5 text-pink-400" /> },
          { label: 'Playlists',    value: playlists.length, icon: <ListMusic className="w-5 h-5 text-emerald-400" /> },
        ].map(stat => (
          <div key={stat.label} className="bg-gray-900 rounded-xl border border-gray-800 p-4 flex items-center gap-3">
            {stat.icon}
            <div>
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-1 bg-gray-900 p-1 rounded-xl">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === t.id
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/50'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        {tab === 'tracks'    && <MyTracksTab    tracks={tracks} onToggleLike={onToggleLike} onDeleteTrack={onDeleteTrack} onPlay={onPlayTrack} />}
        {tab === 'favorites' && <FavoritesTab   tracks={tracks} onToggleLike={onToggleLike} onDeleteTrack={onDeleteTrack} onPlay={onPlayTrack} />}
        {tab === 'playlists' && <PlaylistsTab   playlists={playlists} tracks={tracks} onCreatePlaylist={onCreatePlaylist} onDeletePlaylist={onDeletePlaylist} onPlay={onPlayTrack} />}
      </div>
    </div>
  );
}
