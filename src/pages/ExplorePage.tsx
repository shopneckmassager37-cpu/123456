/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Compass, TrendingUp, Flame, Play, Heart, Music2 } from 'lucide-react';
import { GENRES, MOODS, MOCK_TRENDING_TRACKS } from '../constants';
import { ExploreTab } from '../types';

const TABS: { id: ExploreTab; label: string; icon: React.ReactNode }[] = [
  { id: 'featured', label: 'Featured',  icon: <Flame className="w-4 h-4" /> },
  { id: 'genres',   label: 'By Genre',  icon: <Music2 className="w-4 h-4" /> },
  { id: 'moods',    label: 'By Mood',   icon: <Heart className="w-4 h-4" /> },
];

function formatPlays(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

// ─── featured tab ─────────────────────────────────────────────────────────────
function FeaturedTab() {
  const featured   = MOCK_TRENDING_TRACKS.slice(0, 4);
  const newReleases = MOCK_TRENDING_TRACKS.slice(4, 8);
  const risingNow  = MOCK_TRENDING_TRACKS.slice(8, 12);

  const TrackCard = ({ track, rank }: { track: typeof MOCK_TRENDING_TRACKS[0]; rank?: number }) => (
    <div className="group flex items-center gap-3 p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-violet-700 transition-all cursor-pointer">
      {rank && <span className="text-2xl font-black text-gray-700 w-7 text-center">{rank}</span>}
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-700 to-pink-700 flex items-center justify-center flex-shrink-0">
        <Music2 className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-gray-100 truncate">{track.title}</p>
        <p className="text-xs text-gray-500">{track.genre} · {track.mood}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-600">{formatPlays(track.plays)}</span>
        <button className="w-8 h-8 rounded-full bg-gray-800 group-hover:bg-violet-600 flex items-center justify-center transition-colors">
          <Play className="w-3.5 h-3.5 text-gray-300 fill-gray-300" />
        </button>
      </div>
    </div>
  );

  const BigCard = ({ track }: { track: typeof MOCK_TRENDING_TRACKS[0] }) => (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-900 to-gray-900 border border-gray-800 hover:border-violet-600 p-5 cursor-pointer transition-all">
      <div className="absolute top-3 right-3">
        <span className="text-xs bg-black/40 px-2 py-0.5 rounded-full text-gray-300">{formatPlays(track.plays)} plays</span>
      </div>
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-violet-600 flex items-center justify-center mb-4">
        <Music2 className="w-6 h-6 text-white" />
      </div>
      <h3 className="font-bold text-white">{track.title}</h3>
      <p className="text-sm text-gray-400 mt-0.5">{track.genre} · {track.mood}</p>
      <div className="flex flex-wrap gap-1 mt-3">
        {track.tags.map(tag => (
          <span key={tag} className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-gray-300">#{tag}</span>
        ))}
      </div>
      <button className="mt-4 flex items-center gap-2 bg-white/10 hover:bg-violet-600 px-4 py-2 rounded-lg text-sm text-white transition-colors">
        <Play className="w-4 h-4 fill-white" /> Play
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Hero section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-bold text-white">Featured Tracks</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featured.map(t => <BigCard key={t.id} track={t} />)}
        </div>
      </div>

      {/* New releases */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white">New Releases</h2>
        </div>
        <div className="space-y-2">
          {newReleases.map((t, i) => <TrackCard key={t.id} track={t} rank={i + 1} />)}
        </div>
      </div>

      {/* Rising Now */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-pink-400" />
          <h2 className="text-lg font-bold text-white">Rising Now</h2>
        </div>
        <div className="space-y-2">
          {risingNow.map((t, i) => <TrackCard key={t.id} track={t} rank={i + 1} />)}
        </div>
      </div>
    </div>
  );
}

// ─── by genre tab ─────────────────────────────────────────────────────────────
function GenresTab() {
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const tracksForGenre = MOCK_TRENDING_TRACKS.filter(t =>
    selectedGenre ? t.genre.toLowerCase() === selectedGenre.toLowerCase() : true
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Browse by Genre</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {GENRES.map(g => (
            <button
              key={g.id}
              onClick={() => setSelectedGenre(selectedGenre === g.label ? null : g.label)}
              className={`p-3 rounded-xl border text-center text-sm font-medium transition-all ${
                selectedGenre === g.label
                  ? `${g.color} ${g.textColor} border-transparent`
                  : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-500 hover:text-gray-200'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {selectedGenre && (
        <div>
          <h3 className="font-semibold text-white mb-3">{selectedGenre} Tracks</h3>
          {tracksForGenre.length > 0 ? (
            <div className="space-y-2">
              {tracksForGenre.map(t => (
                <div
                  key={t.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-violet-700 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-700 to-pink-700 flex items-center justify-center flex-shrink-0">
                    <Music2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-100 truncate">{t.title}</p>
                    <p className="text-xs text-gray-500">{t.mood} · {formatPlays(t.plays)} plays</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-gray-800 group-hover:bg-violet-600 flex items-center justify-center transition-colors">
                    <Play className="w-3.5 h-3.5 text-gray-300 fill-gray-300" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl border border-dashed border-gray-700">
              <Music2 className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No tracks yet for {selectedGenre}</p>
              <p className="text-gray-600 text-xs mt-1">Be the first to create one!</p>
            </div>
          )}
        </div>
      )}

      {!selectedGenre && (
        <div className="p-8 text-center rounded-xl border border-dashed border-gray-700">
          <Compass className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">Select a genre to browse tracks</p>
        </div>
      )}
    </div>
  );
}

// ─── by mood tab ──────────────────────────────────────────────────────────────
function MoodsTab() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const tracksForMood = MOCK_TRENDING_TRACKS.filter(t =>
    selectedMood ? t.mood.toLowerCase() === selectedMood.toLowerCase() : true
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Browse by Mood</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MOODS.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedMood(selectedMood === m.label ? null : m.label)}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                selectedMood === m.label
                  ? m.color + ' bg-gray-900 border-current'
                  : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'
              }`}
            >
              <div className="text-2xl mb-1">{m.emoji}</div>
              <div className={`text-sm font-semibold ${selectedMood === m.label ? '' : 'text-gray-300'}`}>{m.label}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedMood && (
        <div>
          <h3 className="font-semibold text-white mb-3">{selectedMood} Tracks</h3>
          {tracksForMood.length > 0 ? (
            <div className="space-y-2">
              {tracksForMood.map(t => (
                <div
                  key={t.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-900 border border-gray-800 hover:border-violet-700 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-700 to-pink-700 flex items-center justify-center flex-shrink-0">
                    <Music2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-100 truncate">{t.title}</p>
                    <p className="text-xs text-gray-500">{t.genre} · {formatPlays(t.plays)} plays</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-gray-800 group-hover:bg-violet-600 flex items-center justify-center transition-colors">
                    <Play className="w-3.5 h-3.5 text-gray-300 fill-gray-300" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-xl border border-dashed border-gray-700">
              <Heart className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No tracks yet for {selectedMood} mood</p>
            </div>
          )}
        </div>
      )}

      {!selectedMood && (
        <div className="p-8 text-center rounded-xl border border-dashed border-gray-700">
          <Heart className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">Select a mood to explore</p>
        </div>
      )}
    </div>
  );
}

// ─── main explore page ────────────────────────────────────────────────────────
export default function ExplorePage() {
  const [tab, setTab] = useState<ExploreTab>('featured');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Explore</h1>
        <p className="text-gray-400 text-sm mt-1">Discover music across genres, moods, and trending charts</p>
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
        {tab === 'featured' && <FeaturedTab />}
        {tab === 'genres'   && <GenresTab />}
        {tab === 'moods'    && <MoodsTab />}
      </div>
    </div>
  );
}
