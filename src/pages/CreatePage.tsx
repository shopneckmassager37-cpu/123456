/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Zap, SlidersHorizontal, FileText, Blend, Mic2,
  Play, Loader2, Plus, Trash2, ChevronDown, ChevronUp,
  Wand2, Music, RotateCcw, Check,
} from 'lucide-react';
import {
  GENRES, MOODS, INSTRUMENTS, VOCAL_STYLES,
  ERAS, LANGUAGES, THEMES, MUSIC_KEYS, TEMPOS, STRUCTURE_SECTIONS,
} from '../constants';
import { CreateTab, Track } from '../types';

interface Props {
  isGenerating: boolean;
  currentTrack: Track | null;
  onGenerate: (prompt: string, lyrics: string, meta: Partial<Track>) => void;
}

// ─── shared pill toggle ──────────────────────────────────────────────────────
function Pill({
  label, selected, onClick, color,
}: { label: string; selected: boolean; onClick: () => void; color?: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
        selected
          ? (color ?? 'bg-violet-600 border-violet-500 text-white')
          : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200'
      }`}
    >
      {label}
    </button>
  );
}

// ─── tabs ────────────────────────────────────────────────────────────────────
const TABS: { id: CreateTab; label: string; icon: React.ReactNode }[] = [
  { id: 'quick',  label: 'Quick Create',    icon: <Zap className="w-4 h-4" /> },
  { id: 'custom', label: 'Custom Style',    icon: <SlidersHorizontal className="w-4 h-4" /> },
  { id: 'lyrics', label: 'Lyrics Studio',   icon: <FileText className="w-4 h-4" /> },
  { id: 'mixer',  label: 'Style Mixer',     icon: <Blend className="w-4 h-4" /> },
  { id: 'vocal',  label: 'Vocal Designer',  icon: <Mic2 className="w-4 h-4" /> },
];

// ─── quick create tab ────────────────────────────────────────────────────────
function QuickCreateTab({ onGenerate, isGenerating }: {
  onGenerate: (prompt: string, lyrics: string, meta: Partial<Track>) => void;
  isGenerating: boolean;
}) {
  const [prompt, setPrompt] = useState('');
  const [genre, setGenre]   = useState('');
  const [mood, setMood]     = useState('');

  const QUICK_SUGGESTIONS = [
    'Uplifting pop anthem with clapping and big chorus',
    'Chill lo-fi hip-hop for late-night studying',
    'Epic cinematic orchestral battle theme',
    'Romantic jazz with saxophone and piano',
    'Dark electronic synth with heavy bass drops',
    'Acoustic folk ballad about leaving home',
  ];

  const handleGenerate = () => {
    const fullPrompt = [
      prompt,
      genre && `Genre: ${genre}`,
      mood  && `Mood: ${mood}`,
    ].filter(Boolean).join('. ');
    onGenerate(fullPrompt, '', { genre, mood });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Describe your track</label>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="e.g. Uplifting synthwave with a driving beat and nostalgic 80s vibes..."
          rows={4}
          className="w-full bg-gray-950 border border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-gray-100 placeholder-gray-600 resize-none"
        />
        <p className="text-xs text-gray-600 mt-1">Be descriptive — tempo, instruments, feel, and story help a lot.</p>
      </div>

      <div>
        <p className="text-sm text-gray-400 mb-3">Quick suggestions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {QUICK_SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => setPrompt(s)}
              className="text-left text-sm px-3 py-2 rounded-lg bg-gray-900 border border-gray-800 hover:border-violet-600 hover:text-violet-300 text-gray-400 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-2">Genre (optional)</label>
          <select
            value={genre}
            onChange={e => setGenre(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-sm text-gray-200"
          >
            <option value="">Any genre</option>
            {GENRES.map(g => <option key={g.id} value={g.label}>{g.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-2">Mood (optional)</label>
          <select
            value={mood}
            onChange={e => setMood(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-sm text-gray-200"
          >
            <option value="">Any mood</option>
            {MOODS.map(m => <option key={m.id} value={m.label}>{m.emoji} {m.label}</option>)}
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all"
      >
        {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" />Generating…</> : <><Wand2 className="w-5 h-5" />Generate</>}
      </button>
    </div>
  );
}

// ─── custom style tab ────────────────────────────────────────────────────────
function CustomStyleTab({ onGenerate, isGenerating }: {
  onGenerate: (prompt: string, lyrics: string, meta: Partial<Track>) => void;
  isGenerating: boolean;
}) {
  const [prompt,      setPrompt]      = useState('');
  const [genre,       setGenre]       = useState('');
  const [mood,        setMood]        = useState('');
  const [tempo,       setTempo]       = useState('medium');
  const [era,         setEra]         = useState('');
  const [theme,       setTheme]       = useState('');
  const [instruments, setInstruments] = useState<string[]>([]);

  const toggleInstrument = (inst: string) =>
    setInstruments(p => p.includes(inst) ? p.filter(i => i !== inst) : [...p, inst]);

  const handleGenerate = () => {
    const tempoLabel = TEMPOS.find(t => t.id === tempo)?.label ?? tempo;
    const parts = [
      prompt,
      genre       && `Genre: ${genre}`,
      mood        && `Mood: ${mood}`,
      `Tempo: ${tempoLabel}`,
      era         && `Era/Decade: ${era}`,
      theme       && `Theme: ${theme}`,
      instruments.length && `Featured instruments: ${instruments.join(', ')}`,
    ].filter(Boolean);
    onGenerate(parts.join('. '), '', { genre, mood, tempo, era, theme, instruments });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Track description</label>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Additional details about your track..."
          rows={3}
          className="w-full bg-gray-950 border border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-violet-500 outline-none text-gray-100 placeholder-gray-600 resize-none"
        />
      </div>

      {/* Genre */}
      <div>
        <label className="block text-sm text-gray-400 mb-3">Genre</label>
        <div className="flex flex-wrap gap-2">
          {GENRES.map(g => (
            <button
              key={g.id}
              onClick={() => setGenre(genre === g.label ? '' : g.label)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                genre === g.label
                  ? `${g.color} ${g.textColor}`
                  : 'bg-gray-900 border border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mood */}
      <div>
        <label className="block text-sm text-gray-400 mb-3">Mood</label>
        <div className="flex flex-wrap gap-2">
          {MOODS.map(m => (
            <button
              key={m.id}
              onClick={() => setMood(mood === m.label ? '' : m.label)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-all ${
                mood === m.label
                  ? m.color.replace('text-', 'bg-').replace('-400', '-900') + ' ' + m.color + ' border-current'
                  : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500'
              }`}
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tempo */}
      <div>
        <label className="block text-sm text-gray-400 mb-3">Tempo</label>
        <div className="grid grid-cols-5 gap-2">
          {TEMPOS.map(t => (
            <button
              key={t.id}
              onClick={() => setTempo(t.id)}
              className={`p-2 rounded-lg border text-center transition-all ${
                tempo === t.id
                  ? 'border-violet-500 bg-violet-900/30 text-violet-300'
                  : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-500'
              }`}
            >
              <div className="text-xs font-bold">{t.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{t.bpm}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Era & Theme */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-2">Era / Decade</label>
          <select
            value={era}
            onChange={e => setEra(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-sm text-gray-200"
          >
            <option value="">Any era</option>
            {ERAS.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-2">Theme</label>
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-sm text-gray-200"
          >
            <option value="">Any theme</option>
            {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
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
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all flex items-center gap-1 ${
                instruments.includes(inst)
                  ? 'border-emerald-500 bg-emerald-900/30 text-emerald-300'
                  : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-500'
              }`}
            >
              {instruments.includes(inst) && <Check className="w-3 h-3" />}
              {inst}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all"
      >
        {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" />Generating…</> : <><Wand2 className="w-5 h-5" />Generate with Style</>}
      </button>
    </div>
  );
}

// ─── lyrics studio tab ───────────────────────────────────────────────────────
interface LyricsSection { id: string; type: string; content: string; open: boolean }

function LyricsStudioTab({ onGenerate, isGenerating }: {
  onGenerate: (prompt: string, lyrics: string, meta: Partial<Track>) => void;
  isGenerating: boolean;
}) {
  const [prompt,  setPrompt]  = useState('');
  const [genre,   setGenre]   = useState('');
  const [sections, setSections] = useState<LyricsSection[]>([
    { id: '1', type: 'Verse 1', content: '', open: true },
    { id: '2', type: 'Chorus',  content: '', open: true },
  ]);

  const addSection = (type: string) => {
    setSections(p => [...p, { id: Date.now().toString(), type, content: '', open: true }]);
  };

  const removeSection = (id: string) => setSections(p => p.filter(s => s.id !== id));
  const updateContent = (id: string, content: string) =>
    setSections(p => p.map(s => s.id === id ? { ...s, content } : s));
  const toggleOpen = (id: string) =>
    setSections(p => p.map(s => s.id === id ? { ...s, open: !s.open } : s));

  const buildLyrics = () =>
    sections.map(s => `[${s.type}]\n${s.content}`).join('\n\n');

  const handleGenerate = () => {
    const lyrics = buildLyrics();
    const fullPrompt = [prompt, genre && `Genre: ${genre}`].filter(Boolean).join('. ');
    onGenerate(fullPrompt, lyrics, { genre, lyrics });
  };

  const sectionColors: Record<string, string> = {
    'Intro': 'bg-blue-900/30 border-blue-700',
    'Verse 1': 'bg-violet-900/30 border-violet-700',
    'Verse 2': 'bg-violet-900/30 border-violet-700',
    'Pre-Chorus': 'bg-amber-900/30 border-amber-700',
    'Chorus': 'bg-pink-900/30 border-pink-700',
    'Bridge': 'bg-emerald-900/30 border-emerald-700',
    'Outro': 'bg-blue-900/30 border-blue-700',
    'Solo / Break': 'bg-orange-900/30 border-orange-700',
    'Refrain': 'bg-teal-900/30 border-teal-700',
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Track style / context</label>
          <input
            type="text"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="e.g. Emotional ballad about leaving home"
            className="w-full bg-gray-950 border border-gray-700 p-3 rounded-xl outline-none text-sm text-gray-100 placeholder-gray-600 focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Genre</label>
          <select
            value={genre}
            onChange={e => setGenre(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 p-3 rounded-lg outline-none text-sm text-gray-200"
          >
            <option value="">Select genre</option>
            {GENRES.map(g => <option key={g.id} value={g.label}>{g.label}</option>)}
          </select>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {sections.map(section => (
          <div
            key={section.id}
            className={`rounded-xl border overflow-hidden ${sectionColors[section.type] ?? 'bg-gray-900 border-gray-700'}`}
          >
            <div className="flex items-center justify-between px-4 py-2.5">
              <button
                onClick={() => toggleOpen(section.id)}
                className="flex items-center gap-2 text-sm font-semibold text-gray-200"
              >
                {section.open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                {section.type}
                <span className="text-xs font-normal text-gray-500">{section.content.split('\n').filter(Boolean).length} lines</span>
              </button>
              <button
                onClick={() => removeSection(section.id)}
                className="text-gray-600 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {section.open && (
              <textarea
                value={section.content}
                onChange={e => updateContent(section.id, e.target.value)}
                placeholder={`Write your ${section.type} lyrics here…`}
                rows={4}
                className="w-full bg-black/20 px-4 pb-3 outline-none text-gray-200 placeholder-gray-600 text-sm resize-none"
              />
            )}
          </div>
        ))}
      </div>

      {/* Add section */}
      <div>
        <p className="text-xs text-gray-500 mb-2">Add section</p>
        <div className="flex flex-wrap gap-2">
          {STRUCTURE_SECTIONS.map(s => (
            <button
              key={s}
              onClick={() => addSection(s)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs border border-dashed border-gray-600 text-gray-400 hover:border-violet-500 hover:text-violet-300 transition-colors"
            >
              <Plus className="w-3 h-3" /> {s}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all"
      >
        {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" />Generating…</> : <><Music className="w-5 h-5" />Generate with Lyrics</>}
      </button>
    </div>
  );
}

// ─── style mixer tab ─────────────────────────────────────────────────────────
function StyleMixerTab({ onGenerate, isGenerating }: {
  onGenerate: (prompt: string, lyrics: string, meta: Partial<Track>) => void;
  isGenerating: boolean;
}) {
  const initialGenres = GENRES.slice(0, 6).map(g => ({ genre: g.label, value: 0 }));
  const [sliders, setSliders] = useState(initialGenres);
  const [prompt,  setPrompt]  = useState('');

  const updateSlider = (idx: number, value: number) => {
    setSliders(p => p.map((s, i) => i === idx ? { ...s, value } : s));
  };

  const reset = () => setSliders(initialGenres);

  const totalWeight = sliders.reduce((sum, s) => sum + s.value, 0);

  const handleGenerate = () => {
    const active = sliders.filter(s => s.value > 0);
    if (!active.length) return;
    const blend = active.map(s => `${Math.round((s.value / totalWeight) * 100)}% ${s.genre}`).join(' + ');
    const fullPrompt = [prompt, `Genre blend: ${blend}`].filter(Boolean).join('. ');
    onGenerate(fullPrompt, '', { genre: active[0]?.genre ?? '' });
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-gray-950 border border-gray-800">
        <p className="text-sm text-gray-400 mb-1">How it works</p>
        <p className="text-xs text-gray-500">Drag each slider to blend genres together. The resulting prompt will reflect the proportions you set — e.g. 60% Jazz + 40% Electronic creates a "Jazz-Fusion Electronic" track.</p>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Additional description</label>
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Extra details (tempo, mood, instruments…)"
          className="w-full bg-gray-950 border border-gray-700 p-3 rounded-xl outline-none text-sm text-gray-100 placeholder-gray-600 focus:ring-2 focus:ring-violet-500"
        />
      </div>

      <div className="space-y-4">
        {sliders.map((s, idx) => {
          const pct = totalWeight > 0 ? Math.round((s.value / totalWeight) * 100) : 0;
          const genre = GENRES.find(g => g.label === s.genre);
          return (
            <div key={s.genre}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-300">{s.genre}</span>
                <span className={`text-sm font-bold ${s.value > 0 ? 'text-violet-400' : 'text-gray-600'}`}>
                  {s.value > 0 ? `${pct}%` : 'off'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0} max={100} value={s.value}
                  onChange={e => updateSlider(idx, Number(e.target.value))}
                  className="flex-1 accent-violet-500"
                />
                <div className={`w-3 h-3 rounded-full ${s.value > 0 ? (genre?.color ?? 'bg-violet-600') : 'bg-gray-800'}`} />
              </div>
            </div>
          );
        })}
      </div>

      {totalWeight > 0 && (
        <div className="p-3 rounded-lg bg-violet-900/20 border border-violet-800">
          <p className="text-xs text-violet-300">
            Current blend:{' '}
            {sliders
              .filter(s => s.value > 0)
              .map(s => `${Math.round((s.value / totalWeight) * 100)}% ${s.genre}`)
              .join(' + ')}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 text-sm transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        <button
          onClick={handleGenerate}
          disabled={isGenerating || totalWeight === 0}
          className="flex-1 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
        >
          {isGenerating ? <><Loader2 className="w-4 h-4 animate-spin" />Generating…</> : <><Blend className="w-4 h-4" />Generate Blend</>}
        </button>
      </div>
    </div>
  );
}

// ─── vocal designer tab ──────────────────────────────────────────────────────
function VocalDesignerTab({ onGenerate, isGenerating }: {
  onGenerate: (prompt: string, lyrics: string, meta: Partial<Track>) => void;
  isGenerating: boolean;
}) {
  const [vocalStyle, setVocalStyle] = useState('female');
  const [language,   setLanguage]   = useState('English');
  const [key,        setKey]        = useState('C Major');
  const [tempo,      setTempo]      = useState('medium');
  const [theme,      setTheme]      = useState('');
  const [prompt,     setPrompt]     = useState('');
  const [genre,      setGenre]      = useState('');

  const handleGenerate = () => {
    const vLabel = VOCAL_STYLES.find(v => v.id === vocalStyle)?.label ?? vocalStyle;
    const tLabel = TEMPOS.find(t => t.id === tempo)?.label ?? tempo;
    const parts = [
      prompt,
      `Vocal style: ${vLabel}`,
      `Language: ${language}`,
      `Key: ${key}`,
      `Tempo: ${tLabel}`,
      genre && `Genre: ${genre}`,
      theme && `Theme: ${theme}`,
    ].filter(Boolean);
    onGenerate(parts.join('. '), '', { vocals: vocalStyle, language, key, tempo, genre, theme });
  };

  return (
    <div className="space-y-6">
      {/* Vocal style cards */}
      <div>
        <label className="block text-sm text-gray-400 mb-3">Vocal Style</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {VOCAL_STYLES.map(v => (
            <button
              key={v.id}
              onClick={() => setVocalStyle(v.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                vocalStyle === v.id
                  ? 'border-violet-500 bg-violet-900/30'
                  : 'border-gray-700 bg-gray-900 hover:border-gray-600'
              }`}
            >
              <div className={`text-sm font-semibold ${vocalStyle === v.id ? 'text-violet-300' : 'text-gray-200'}`}>{v.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{v.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Language */}
        <div>
          <label className="block text-xs text-gray-500 mb-2">Language</label>
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-sm text-gray-200"
          >
            {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {/* Musical Key */}
        <div>
          <label className="block text-xs text-gray-500 mb-2">Musical Key</label>
          <select
            value={key}
            onChange={e => setKey(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-sm text-gray-200"
          >
            {MUSIC_KEYS.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        {/* Genre */}
        <div>
          <label className="block text-xs text-gray-500 mb-2">Genre</label>
          <select
            value={genre}
            onChange={e => setGenre(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-sm text-gray-200"
          >
            <option value="">Any genre</option>
            {GENRES.map(g => <option key={g.id} value={g.label}>{g.label}</option>)}
          </select>
        </div>

        {/* Theme */}
        <div>
          <label className="block text-xs text-gray-500 mb-2">Lyric Theme</label>
          <select
            value={theme}
            onChange={e => setTheme(e.target.value)}
            className="w-full bg-gray-950 border border-gray-700 p-2.5 rounded-lg outline-none text-sm text-gray-200"
          >
            <option value="">Any theme</option>
            {THEMES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Tempo */}
      <div>
        <label className="block text-sm text-gray-400 mb-3">Tempo</label>
        <div className="flex gap-2">
          {TEMPOS.map(t => (
            <button
              key={t.id}
              onClick={() => setTempo(t.id)}
              className={`flex-1 p-2.5 rounded-xl border text-center transition-all ${
                tempo === t.id
                  ? 'border-violet-500 bg-violet-900/30 text-violet-300'
                  : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600'
              }`}
            >
              <div className="text-xs font-bold">{t.label}</div>
              <div className="text-xs text-gray-500">{t.bpm}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Extra prompt */}
      <div>
        <label className="block text-sm text-gray-400 mb-2">Additional details</label>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Any extra description…"
          rows={2}
          className="w-full bg-gray-950 border border-gray-700 p-3 rounded-xl outline-none text-sm text-gray-100 placeholder-gray-600 focus:ring-2 focus:ring-violet-500 resize-none"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full bg-gradient-to-r from-rose-600 to-violet-600 hover:from-rose-500 hover:to-violet-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all"
      >
        {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" />Generating…</> : <><Mic2 className="w-5 h-5" />Generate with Voice</>}
      </button>
    </div>
  );
}

// ─── main create page ────────────────────────────────────────────────────────
export default function CreatePage({ isGenerating, currentTrack, onGenerate }: Props) {
  const [tab, setTab] = useState<CreateTab>('quick');

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Create Music</h1>
        <p className="text-gray-400 text-sm mt-1">Choose your creation mode and generate a unique track with AI</p>
      </div>

      {/* tab bar */}
      <div className="flex gap-1 bg-gray-900 p-1 rounded-xl overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
              tab === t.id
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/50'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* tab content */}
      <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
        {tab === 'quick'  && <QuickCreateTab  onGenerate={onGenerate} isGenerating={isGenerating} />}
        {tab === 'custom' && <CustomStyleTab  onGenerate={onGenerate} isGenerating={isGenerating} />}
        {tab === 'lyrics' && <LyricsStudioTab onGenerate={onGenerate} isGenerating={isGenerating} />}
        {tab === 'mixer'  && <StyleMixerTab   onGenerate={onGenerate} isGenerating={isGenerating} />}
        {tab === 'vocal'  && <VocalDesignerTab onGenerate={onGenerate} isGenerating={isGenerating} />}
      </div>

      {/* audio player */}
      {currentTrack?.audioUrl && (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center flex-shrink-0">
              <Play className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white text-sm truncate">{currentTrack.title}</p>
              <p className="text-xs text-gray-500">{currentTrack.genre} · {currentTrack.mood}</p>
            </div>
          </div>
          <audio src={currentTrack.audioUrl} controls className="w-full" />
        </div>
      )}

      {isGenerating && (
        <div className="bg-gray-900 rounded-2xl border border-violet-800 p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center animate-pulse">
            <Music className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-violet-300">AI is composing your track…</p>
            <p className="text-xs text-gray-500 mt-0.5">This may take 30–60 seconds</p>
          </div>
          <Loader2 className="w-6 h-6 text-violet-400 animate-spin ml-auto" />
        </div>
      )}
    </div>
  );
}
