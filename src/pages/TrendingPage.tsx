/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TrendingUp, Flame, Crown, Play, Music2, Award } from 'lucide-react';
import { MOCK_TRENDING_TRACKS } from '../constants';
import { TrendingTab } from '../types';

const TABS: { id: TrendingTab; label: string; icon: React.ReactNode }[] = [
  { id: 'today',   label: 'Today',    icon: <Flame className="w-4 h-4" /> },
  { id: 'alltime', label: 'All Time', icon: <Crown className="w-4 h-4" /> },
];

function formatPlays(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

const RANK_COLORS = [
  'text-yellow-400',  // 1
  'text-gray-300',    // 2
  'text-amber-600',   // 3
];

function TrendingRow({ track, rank, badge }: {
  track: typeof MOCK_TRENDING_TRACKS[0];
  rank: number;
  badge?: React.ReactNode;
}) {
  const isTop3 = rank <= 3;
  return (
    <div className={`group flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer ${
      isTop3
        ? 'bg-gradient-to-r from-gray-900 to-gray-900 border border-gray-700 hover:border-violet-700'
        : 'hover:bg-gray-800'
    }`}>
      <div className={`w-8 text-center font-black text-xl ${RANK_COLORS[rank - 1] ?? 'text-gray-700'}`}>
        {rank <= 3 ? (rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉') : rank}
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
        isTop3
          ? 'bg-gradient-to-br from-amber-600 to-orange-700'
          : 'bg-gradient-to-br from-violet-800 to-purple-800'
      }`}>
        <Music2 className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-bold text-sm text-gray-100 truncate">{track.title}</p>
          {badge}
        </div>
        <p className="text-xs text-gray-500">{track.genre} · {track.mood}</p>
        <div className="flex gap-1 mt-1.5">
          {track.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-800 px-2 py-0.5 rounded-full text-gray-400">#{tag}</span>
          ))}
        </div>
      </div>
      <div className="text-right flex-shrink-0">
        <div className="flex items-center gap-1 text-sm font-semibold text-gray-300">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          {formatPlays(track.plays)}
        </div>
        <p className="text-xs text-gray-600">plays</p>
      </div>
      <button className="w-9 h-9 rounded-full bg-gray-800 group-hover:bg-violet-600 flex items-center justify-center transition-colors flex-shrink-0">
        <Play className="w-4 h-4 text-gray-300 fill-gray-300" />
      </button>
    </div>
  );
}

function TodayTab() {
  const todayTracks = [...MOCK_TRENDING_TRACKS].sort(() => Math.random() - 0.5);

  return (
    <div className="space-y-6">
      {/* Top 3 hero */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-bold text-white">Hot Right Now</h2>
          <span className="text-xs bg-orange-600 px-2 py-0.5 rounded-full text-white font-medium">LIVE</span>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {todayTracks.slice(0, 3).map((t, i) => (
            <div
              key={t.id}
              className={`relative overflow-hidden rounded-2xl p-4 cursor-pointer group border ${
                i === 0
                  ? 'bg-gradient-to-br from-yellow-900 to-orange-900 border-yellow-700'
                  : i === 1
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-600'
                  : 'bg-gradient-to-br from-amber-900 to-yellow-900 border-amber-700'
              }`}
            >
              <div className="text-2xl mb-2">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                <Music2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-white text-sm">{t.title}</h3>
              <p className="text-xs text-gray-300 mt-0.5">{t.genre}</p>
              <p className="text-xs font-semibold text-emerald-300 mt-2">{formatPlays(t.plays)} plays</p>
              <button className="mt-3 w-full flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 py-1.5 rounded-lg text-xs text-white transition-colors">
                <Play className="w-3 h-3 fill-white" /> Play
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of today's trending */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 mb-3">More trending today</h2>
        <div className="space-y-1">
          {todayTracks.slice(3).map((t, i) => (
            <TrendingRow
              key={t.id}
              track={t}
              rank={i + 4}
              badge={i < 2 ? <span className="text-xs bg-green-900 text-green-400 px-1.5 py-0.5 rounded-full">Rising</span> : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AllTimeTab() {
  const allTimeTracks = [...MOCK_TRENDING_TRACKS].sort((a, b) => b.plays - a.plays);

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Plays',    value: '2.8M+',  icon: <Play className="w-4 h-4 text-violet-400 fill-violet-400" /> },
          { label: 'Top Genre',      value: 'K-Pop',  icon: <Music2 className="w-4 h-4 text-pink-400" /> },
          { label: 'Hall of Fame',   value: '12',     icon: <Award className="w-4 h-4 text-yellow-400" /> },
        ].map(s => (
          <div key={s.label} className="bg-gray-950 border border-gray-800 rounded-xl p-3 flex items-center gap-3">
            {s.icon}
            <div>
              <p className="font-bold text-white text-sm">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Crown className="w-5 h-5 text-yellow-400" />
          <h2 className="text-lg font-bold text-white">All-Time Greatest</h2>
        </div>
        <div className="space-y-1">
          {allTimeTracks.map((t, i) => (
            <TrendingRow
              key={t.id}
              track={t}
              rank={i + 1}
              badge={i === 0 ? <span className="text-xs bg-yellow-800 text-yellow-300 px-1.5 py-0.5 rounded-full">👑 #1</span> : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TrendingPage() {
  const [tab, setTab] = useState<TrendingTab>('today');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Trending</h1>
        <p className="text-gray-400 text-sm mt-1">The most-played tracks across the platform</p>
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
        {tab === 'today'   && <TodayTab />}
        {tab === 'alltime' && <AllTimeTab />}
      </div>
    </div>
  );
}
