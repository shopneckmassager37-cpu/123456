/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Music2, Compass, Library, Cpu, TrendingUp,
  Wand2, Key, ChevronRight, Play, Pause, X,
  Volume2, SkipBack, SkipForward, Heart,
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { Track, Playlist, Page } from './types';
import CreatePage   from './pages/CreatePage';
import ExplorePage  from './pages/ExplorePage';
import LibraryPage  from './pages/LibraryPage';
import StudioPage   from './pages/StudioPage';
import TrendingPage from './pages/TrendingPage';

// ─── helpers ──────────────────────────────────────────────────────────────────
function generateTitle(prompt: string, genre: string): string {
  const words = prompt.split(' ').filter(w => w.length > 3).slice(0, 3);
  if (words.length >= 2) {
    return words.slice(0, 2).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }
  const fallbacks = [
    'Neon Horizon', 'Midnight Echo', 'Broken Prism', 'Silver Wave',
    'Crimson Tide', 'Ember Flight', 'Glass City', 'Shadow Bloom',
    'Velvet Storm', 'Golden Hour', 'Cosmic Drift', 'Paper Wings',
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// ─── nav items ────────────────────────────────────────────────────────────────
const NAV: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: 'create',   label: 'Create',   icon: <Wand2     className="w-5 h-5" /> },
  { id: 'explore',  label: 'Explore',  icon: <Compass   className="w-5 h-5" /> },
  { id: 'library',  label: 'Library',  icon: <Library   className="w-5 h-5" /> },
  { id: 'studio',   label: 'Studio',   icon: <Cpu       className="w-5 h-5" /> },
  { id: 'trending', label: 'Trending', icon: <TrendingUp className="w-5 h-5" /> },
];

// ─── mini player ──────────────────────────────────────────────────────────────
function MiniPlayer({
  track, onClose, onToggleLike,
}: {
  track: Track;
  onClose: () => void;
  onToggleLike: (id: string) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => track.audioUrl ? new Audio(track.audioUrl) : null);

  useEffect(() => {
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
    return () => { audio.pause(); };
  }, [isPlaying, audio]);

  useEffect(() => {
    return () => { audio?.pause(); };
  }, [audio]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-800 px-4 py-3">
      <div className="max-w-5xl mx-auto flex items-center gap-4">
        {/* Art */}
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center flex-shrink-0">
          <Music2 className="w-5 h-5 text-white" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{track.title}</p>
          <p className="text-xs text-gray-500">{[track.genre, track.mood].filter(Boolean).join(' · ')}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleLike(track.id)}
            className={`${track.liked ? 'text-pink-400' : 'text-gray-500 hover:text-pink-400'} transition-colors`}
          >
            <Heart className={`w-5 h-5 ${track.liked ? 'fill-pink-400' : ''}`} />
          </button>

          {track.audioUrl ? (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-violet-600 hover:bg-violet-500 flex items-center justify-center transition-colors"
            >
              {isPlaying
                ? <Pause className="w-5 h-5 text-white fill-white" />
                : <Play  className="w-5 h-5 text-white fill-white ml-0.5" />}
            </button>
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              <Music2 className="w-5 h-5 text-gray-500" />
            </div>
          )}

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inline audio */}
        {track.audioUrl && (
          <audio src={track.audioUrl} className="hidden" />
        )}
      </div>
    </div>
  );
}

// ─── main app ────────────────────────────────────────────────────────────────
export default function App() {
  const [page,         setPage]         = useState<Page>('create');
  const [tracks,       setTracks]       = useState<Track[]>([]);
  const [playlists,    setPlaylists]    = useState<Playlist[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasApiKey,    setHasApiKey]    = useState(false);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [miniPlayer,   setMiniPlayer]   = useState<Track | null>(null);
  const [sidebarOpen,  setSidebarOpen]  = useState(true);

  useEffect(() => {
    async function checkKey() {
      if (typeof window !== 'undefined' && (window as any).aistudio) {
        setHasApiKey(await (window as any).aistudio.hasSelectedApiKey());
      }
    }
    checkKey();
  }, []);

  // ── generate music ──────────────────────────────────────────────────────────
  const generateMusic = useCallback(async (
    prompt: string,
    lyrics: string,
    meta: Partial<Track>,
  ) => {
    if (!hasApiKey && typeof window !== 'undefined' && (window as any).aistudio) {
      await (window as any).aistudio.openSelectKey();
      setHasApiKey(true);
    }

    setIsGenerating(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const fullPrompt = [
        prompt,
        lyrics && `Lyrics:\n${lyrics}`,
      ].filter(Boolean).join('\n\n');

      const response = await ai.models.generateContentStream({
        model: 'lyria-3-clip-preview',
        contents: fullPrompt,
      });

      let audioBase64 = '';
      let mimeType    = 'audio/wav';

      for await (const chunk of response) {
        const parts = chunk.candidates?.[0]?.content?.parts;
        if (!parts) continue;
        for (const part of parts) {
          if (part.inlineData?.data) {
            if (!audioBase64 && part.inlineData.mimeType) {
              mimeType = part.inlineData.mimeType;
            }
            audioBase64 += part.inlineData.data;
          }
        }
      }

      const binary = atob(audioBase64);
      const bytes  = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      const blob     = new Blob([bytes], { type: mimeType });
      const audioUrl = URL.createObjectURL(blob);

      const newTrack: Track = {
        id:          Date.now().toString(),
        title:       generateTitle(prompt, meta.genre ?? ''),
        prompt,
        genre:       meta.genre       ?? '',
        mood:        meta.mood        ?? '',
        vocals:      meta.vocals      ?? '',
        tempo:       meta.tempo       ?? '',
        instruments: meta.instruments ?? [],
        key:         meta.key         ?? '',
        language:    meta.language    ?? '',
        theme:       meta.theme       ?? '',
        era:         meta.era         ?? '',
        lyrics:      lyrics,
        audioUrl,
        createdAt:   new Date(),
        liked:       false,
        plays:       0,
        tags:        [meta.genre, meta.mood].filter(Boolean) as string[],
        playlistIds: [],
      };

      setTracks(prev => [newTrack, ...prev]);
      setCurrentTrack(newTrack);
      setMiniPlayer(newTrack);
    } catch (err) {
      console.error('Error generating music:', err);
    } finally {
      setIsGenerating(false);
    }
  }, [hasApiKey]);

  // ── track actions ───────────────────────────────────────────────────────────
  const toggleLike = (id: string) =>
    setTracks(p => p.map(t => t.id === id ? { ...t, liked: !t.liked } : t));

  const deleteTrack = (id: string) => {
    setTracks(p => p.filter(t => t.id !== id));
    if (miniPlayer?.id === id) setMiniPlayer(null);
    if (currentTrack?.id === id) setCurrentTrack(null);
  };

  const createPlaylist = (name: string, desc: string) => {
    const pl: Playlist = {
      id: Date.now().toString(), name, description: desc, trackIds: [], createdAt: new Date(),
    };
    setPlaylists(p => [...p, pl]);
  };

  const deletePlaylist = (id: string) => setPlaylists(p => p.filter(pl => pl.id !== id));

  const addToPlaylist = (trackId: string, playlistId: string) => {
    setPlaylists(p =>
      p.map(pl =>
        pl.id === playlistId && !pl.trackIds.includes(trackId)
          ? { ...pl, trackIds: [...pl.trackIds, trackId] }
          : pl
      )
    );
  };

  const playTrack = (track: Track) => setMiniPlayer(track);

  // ── render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex">
      {/* ── Sidebar ── */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-16'} flex-shrink-0 bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300 sticky top-0 h-screen`}>
        {/* Logo */}
        <div className="p-4 flex items-center gap-3 border-b border-gray-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center flex-shrink-0">
            <Music2 className="w-4 h-4 text-white" />
          </div>
          {sidebarOpen && (
            <span className="font-black text-white tracking-tight">
              Melody<span className="text-violet-400">Forge</span>
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(item => {
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  active
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/50'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
                title={!sidebarOpen ? item.label : undefined}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
                {sidebarOpen && active && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            );
          })}
        </nav>

        {/* API Key status */}
        {sidebarOpen && (
          <div className="p-3 border-t border-gray-800">
            {!hasApiKey ? (
              <button
                onClick={() => (window as any).aistudio?.openSelectKey()}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-yellow-900/40 border border-yellow-700 text-yellow-400 hover:bg-yellow-900/60 transition-colors text-sm"
              >
                <Key className="w-4 h-4" />
                <span className="text-xs font-medium">Select API Key</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-gray-500">API Key active</span>
              </div>
            )}
          </div>
        )}

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 border-t border-gray-800 flex items-center justify-center text-gray-600 hover:text-gray-300 transition-colors"
        >
          <ChevronRight className={`w-4 h-4 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </aside>

      {/* ── Main content ── */}
      <main className={`flex-1 min-h-screen overflow-y-auto ${miniPlayer ? 'pb-20' : ''}`}>
        <div className="max-w-4xl mx-auto p-6">
          {page === 'create' && (
            <CreatePage
              isGenerating={isGenerating}
              currentTrack={currentTrack}
              onGenerate={generateMusic}
            />
          )}
          {page === 'explore' && <ExplorePage />}
          {page === 'library' && (
            <LibraryPage
              tracks={tracks}
              playlists={playlists}
              onToggleLike={toggleLike}
              onDeleteTrack={deleteTrack}
              onCreatePlaylist={createPlaylist}
              onDeletePlaylist={deletePlaylist}
              onAddToPlaylist={addToPlaylist}
              onPlayTrack={playTrack}
            />
          )}
          {page === 'studio' && (
            <StudioPage
              tracks={tracks}
              isGenerating={isGenerating}
              onGenerate={generateMusic}
            />
          )}
          {page === 'trending' && <TrendingPage />}
        </div>
      </main>

      {/* ── Mini Player ── */}
      {miniPlayer && (
        <MiniPlayer
          track={tracks.find(t => t.id === miniPlayer.id) ?? miniPlayer}
          onClose={() => setMiniPlayer(null)}
          onToggleLike={toggleLike}
        />
      )}
    </div>
  );
}
