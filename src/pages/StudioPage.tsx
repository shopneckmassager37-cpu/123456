/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  RefreshCw, Settings2, Wand2, Loader2, Music,
  ChevronRight, Info, Sliders, Shuffle, Copy,
} from 'lucide-react';
import { GENRES, MOODS, TEMPOS, INSTRUMENTS, VOCAL_STYLES, THEMES, ERAS } from '../constants';
import { StudioTab, Track } from '../types';

interface Props {
  tracks:       Track[];
  isGenerating: boolean;
  onGenerate:   (prompt: string, lyrics: string, meta: Partial<Track>) => void;
}

const TABS: { id: StudioTab; label: string; icon: React.ReactNode }[] = [
  { id: 'remix',    label: 'Remix Track',        icon: <RefreshCw className="w-4 h-4" /> },
  { id: 'advanced', label: 'Advanced Settings',  icon: <Settings2 className="w-4 h-4" /> },
];

// ─── remix tab ────────────────────────────────────────────────────────────────
function RemixTab({ tracks, onGenerate, isGenerating }: {
  tracks: Track[];
  onGenerate: (prompt: string, lyrics: string, meta: Partial<Track>) => void;
  isGenerating: boolean;
}) {
  const [baseTrackId, setBaseTrackId] = useState('');
  const [remixGenre,  setRemixGenre]  = useState('');
  const [remixMood,   setRemixMood]   = useState('');
  const [remixTempo,  setRemixTempo]  = useState('');
  const [remixNotes,  setRemixNotes]  = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  const baseTrack = tracks.find(t => t.id === baseTrackId);

  const REMIX_STYLES = [
    { id: 'genre-swap',   label: 'Genre Swap',     desc: 'Keep the melody, change the genre' },
    { id: 'mood-flip',    label: 'Mood Flip',      desc: 'Transform the emotional tone' },
    { id: 'acoustic',     label: 'Acoustic',        desc: 'Strip it down to raw acoustic' },
    { id: 'orchestral',   label: 'Orchestral',      desc: 'Full cinematic orchestra' },
    { id: 'electronic',   label: 'Electro Remix',   desc: 'EDM / electronic treatment' },
    { id: 'lofi',         label: 'Lo-Fi Chill',     desc: 'Mellow, dusty lo-fi version' },
  ];
  const [remixStyle, setRemixStyle] = useState('genre-swap');

  const handleRemix = () => {
    if (!baseTrack && !customPrompt) return;
    const source = baseTrack
      ? `Original: "${baseTrack.prompt}".`
      : `Original concept: "${customPrompt}".`;
    const parts = [
      `Remix. ${source}`,
      `Remix style: ${REMIX_STYLES.find(r => r.id === remixStyle)?.label}`,
      remixGenre && `New genre: ${remixGenre}`,
      remixMood  && `New mood: ${remixMood}`,
      remixTempo && `Tempo: ${TEMPOS.find(t => t.id === remixTempo)?.label}`,
      remixNotes,
    ].filter(Boolean);
    onGenerate(parts.join('. '), baseTrack?.lyrics ?? '', {
      genre:  remixGenre || baseTrack?.genre || '',
      mood:   remixMood  || baseTrack?.mood  || '',
      tempo:  remixTempo || baseTrack?.tempo || '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-gradient-to-r from-violet-900/30 to-pink-900/30 border border-violet-800/50">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-violet-300">What is Remix?</p>
            <p className="text-xs text-gray-400 mt-1">Remix takes an existing track's concept and regenerates it with a new style, genre, or mood — keeping the spirit while changing the execution.</p>
          </div>
        </div>
      </div>

      {/* Source */}
      <div>
        <label className="block text-sm text-gray-400 mb-3">Source track</label>
        {tracks.length > 0 ? (
          <select
            value={baseTrackId}
            onChange={e => setBaseTrackId(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 p-3 rounded-xl outline-none text-sm text-gray-200"
          >
            <option value="">— Start from custom prompt instead —</option>
            {tracks.map(t => <option key={t.id} value={t.id}>{t.title} ({t.genre})</option>)}
          </select>
        ) : (
          <p className="text-sm text-gray-500 italic">No tracks in your library yet. Use a custom prompt below.</p>
        )}

        {!baseTrackId && (
          <div className="mt-3">
            <label className="block text-xs text-gray-500 mb-1">Custom source prompt</label>
            <textarea
              value={customPrompt}
              onChange={e => setCustomPrompt(e.target.value)}
              placeholder="Describe the original idea you want to remix…"
              rows={2}
              className="w-full bg-gray-950 border border-gray-700 p-3 rounded-xl outline-none text-sm text-gray-100 placeholder-gray-600 focus:ring-2 focus:ring-violet-500 resize-none"
            />
          </div>
        )}

        {baseTrack && (
          <div className="mt-3 p-3 rounded-lg bg-gray-950 border border-gray-800">
            <p className="text-xs text-gray-500 mb-1">Original prompt</p>
            <p className="text-sm text-gray-300">{baseTrack.prompt}</p>
          </div>
        )}
      </div>

      {/* Remix Style */}
      <div>
        <label className="block text-sm text-gray-400 mb-3">Remix style</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {REMIX_STYLES.map(rs => (
            <button
              key={rs.id}
              onClick={() => setRemixStyle(rs.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                remixStyle === rs.id
                  ? 'border-violet-500 bg-violet-900/30'
                  : 'border-gray-700 bg-gray-900 hover:border-gray-600'
              }`}
            >
              <div className={`text-sm font-semibold ${remixStyle === rs.id ? 'text-violet-300' : 'text-gray-200'}`}>{rs.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{rs.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-2">New Genre</label>
          <select value={remixGenre} onChange={e => setRemixGenre(e.target.value)} className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-xs text-gray-200">
            <option value="">Keep original</option>
            {GENRES.map(g => <option key={g.id} value={g.label}>{g.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-2">New Mood</label>
          <select value={remixMood} onChange={e => setRemixMood(e.target.value)} className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-xs text-gray-200">
            <option value="">Keep original</option>
            {MOODS.map(m => <option key={m.id} value={m.label}>{m.emoji} {m.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-2">New Tempo</label>
          <select value={remixTempo} onChange={e => setRemixTempo(e.target.value)} className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-xs text-gray-200">
            <option value="">Keep original</option>
            {TEMPOS.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Additional remix notes</label>
        <input
          type="text"
          value={remixNotes}
          onChange={e => setRemixNotes(e.target.value)}
          placeholder="e.g. Add more drums, make the chorus bigger, include a key change…"
          className="w-full bg-gray-950 border border-gray-700 p-3 rounded-xl outline-none text-sm text-gray-100 placeholder-gray-600 focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <button
        onClick={handleRemix}
        disabled={isGenerating || (!baseTrackId && !customPrompt.trim())}
        className="w-full bg-gradient-to-r from-orange-600 to-violet-600 hover:from-orange-500 hover:to-violet-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all"
      >
        {isGenerating
          ? <><Loader2 className="w-5 h-5 animate-spin" />Remixing…</>
          : <><RefreshCw className="w-5 h-5" />Create Remix</>}
      </button>
    </div>
  );
}

// ─── advanced settings tab ────────────────────────────────────────────────────
function AdvancedSettingsTab({ onGenerate, isGenerating }: {
  onGenerate: (prompt: string, lyrics: string, meta: Partial<Track>) => void;
  isGenerating: boolean;
}) {
  const [prompt,        setPrompt]        = useState('');
  const [genre,         setGenre]         = useState('');
  const [mood,          setMood]          = useState('');
  const [tempo,         setTempo]         = useState('medium');
  const [vocalStyle,    setVocalStyle]    = useState('');
  const [instruments,   setInstruments]   = useState<string[]>([]);
  const [era,           setEra]           = useState('');
  const [theme,         setTheme]         = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [complexity,    setComplexity]    = useState(50);
  const [repetition,    setRepetition]    = useState(50);
  const [dynamics,      setDynamics]      = useState(50);

  const toggleInstrument = (inst: string) =>
    setInstruments(p => p.includes(inst) ? p.filter(i => i !== inst) : [...p, inst]);

  const randomize = () => {
    const rg = GENRES[Math.floor(Math.random() * GENRES.length)];
    const rm = MOODS[Math.floor(Math.random() * MOODS.length)];
    const rt = TEMPOS[Math.floor(Math.random() * TEMPOS.length)];
    setGenre(rg.label);
    setMood(rm.label);
    setTempo(rt.id);
    setComplexity(Math.floor(Math.random() * 100));
    setRepetition(Math.floor(Math.random() * 100));
    setDynamics(Math.floor(Math.random() * 100));
  };

  const handleGenerate = () => {
    const parts = [
      prompt,
      genre         && `Genre: ${genre}`,
      mood          && `Mood: ${mood}`,
      `Tempo: ${TEMPOS.find(t => t.id === tempo)?.label}`,
      era           && `Era: ${era}`,
      theme         && `Theme: ${theme}`,
      vocalStyle    && `Vocals: ${VOCAL_STYLES.find(v => v.id === vocalStyle)?.label}`,
      instruments.length && `Instruments: ${instruments.join(', ')}`,
      `Arrangement complexity: ${complexity > 66 ? 'complex' : complexity > 33 ? 'moderate' : 'simple'}`,
      `Dynamic range: ${dynamics > 66 ? 'wide' : dynamics > 33 ? 'moderate' : 'compressed'}`,
      `Structural repetition: ${repetition > 66 ? 'high' : repetition > 33 ? 'moderate' : 'low'}`,
      negativePrompt && `Avoid: ${negativePrompt}`,
    ].filter(Boolean);
    onGenerate(parts.join('. '), '', { genre, mood, tempo, era, theme, vocals: vocalStyle, instruments });
  };

  const Slider = ({ label, value, onChange, desc }: {
    label: string; value: number; onChange: (v: number) => void; desc: string;
  }) => (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-300">{label}</span>
        <span className="text-sm text-violet-400 font-mono">{value}</span>
      </div>
      <input
        type="range" min={0} max={100} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-violet-500"
      />
      <p className="text-xs text-gray-600 mt-0.5">{desc}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">Fine-tune every parameter of your generation</p>
        <button
          onClick={randomize}
          className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-gray-700 text-gray-400 hover:text-violet-300 hover:border-violet-700 transition-colors"
        >
          <Shuffle className="w-4 h-4" /> Randomize
        </button>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Main prompt</label>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Describe your track in as much detail as possible…"
          rows={3}
          className="w-full bg-gray-950 border border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-gray-100 placeholder-gray-600 resize-none text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-2">Genre</label>
          <select value={genre} onChange={e => setGenre(e.target.value)} className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-sm text-gray-200">
            <option value="">Any</option>
            {GENRES.map(g => <option key={g.id} value={g.label}>{g.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-2">Mood</label>
          <select value={mood} onChange={e => setMood(e.target.value)} className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-sm text-gray-200">
            <option value="">Any</option>
            {MOODS.map(m => <option key={m.id} value={m.label}>{m.emoji} {m.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-2">Vocal Style</label>
          <select value={vocalStyle} onChange={e => setVocalStyle(e.target.value)} className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-sm text-gray-200">
            <option value="">Any</option>
            {VOCAL_STYLES.map(v => <option key={v.id} value={v.id}>{v.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-2">Era</label>
          <select value={era} onChange={e => setEra(e.target.value)} className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-sm text-gray-200">
            <option value="">Any</option>
            {ERAS.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-2">Theme</label>
          <select value={theme} onChange={e => setTheme(e.target.value)} className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-sm text-gray-200">
            <option value="">Any</option>
            {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-2">Tempo</label>
          <select value={tempo} onChange={e => setTempo(e.target.value)} className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-sm text-gray-200">
            {TEMPOS.map(t => <option key={t.id} value={t.id}>{t.label} ({t.bpm})</option>)}
          </select>
        </div>
      </div>

      {/* Instruments */}
      <div>
        <label className="block text-sm text-gray-400 mb-3">Instruments</label>
        <div className="flex flex-wrap gap-2">
          {INSTRUMENTS.map(inst => (
            <button
              key={inst}
              onClick={() => toggleInstrument(inst)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                instruments.includes(inst)
                  ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300'
                  : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'
              }`}
            >
              {inst}
            </button>
          ))}
        </div>
      </div>

      {/* Fine-tune sliders */}
      <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 space-y-5">
        <div className="flex items-center gap-2 mb-2">
          <Sliders className="w-4 h-4 text-violet-400" />
          <span className="text-sm font-semibold text-gray-300">Fine-tune Parameters</span>
        </div>
        <Slider
          label="Arrangement Complexity"
          value={complexity}
          onChange={setComplexity}
          desc="Low = sparse and minimal · High = dense and layered"
        />
        <Slider
          label="Structural Repetition"
          value={repetition}
          onChange={setRepetition}
          desc="Low = varied sections · High = strong recurring themes"
        />
        <Slider
          label="Dynamic Range"
          value={dynamics}
          onChange={setDynamics}
          desc="Low = compressed & even · High = big swings between quiet and loud"
        />
      </div>

      {/* Negative prompt */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Negative prompt (avoid)</label>
        <input
          type="text"
          value={negativePrompt}
          onChange={e => setNegativePrompt(e.target.value)}
          placeholder="e.g. distorted guitars, minor key, drums, spoken word…"
          className="w-full bg-gray-950 border border-gray-700 p-3 rounded-xl outline-none text-sm text-gray-100 placeholder-gray-600 focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 hover:opacity-90 disabled:from-gray-700 disabled:via-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all"
      >
        {isGenerating
          ? <><Loader2 className="w-5 h-5 animate-spin" />Generating…</>
          : <><Wand2 className="w-5 h-5" />Generate with Advanced Settings</>}
      </button>
    </div>
  );
}

// ─── main studio page ─────────────────────────────────────────────────────────
export default function StudioPage({ tracks, isGenerating, onGenerate }: Props) {
  const [tab, setTab] = useState<StudioTab>('remix');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Studio</h1>
        <p className="text-gray-400 text-sm mt-1">Advanced tools for power users — remix tracks and fine-tune every parameter</p>
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
        {tab === 'remix'    && <RemixTab            tracks={tracks} onGenerate={onGenerate} isGenerating={isGenerating} />}
        {tab === 'advanced' && <AdvancedSettingsTab onGenerate={onGenerate} isGenerating={isGenerating} />}
      </div>
    </div>
  );
}
