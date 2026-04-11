/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const GENRES = [
  { id: 'pop',       label: 'Pop',        color: 'bg-pink-600',    textColor: 'text-pink-100' },
  { id: 'rock',      label: 'Rock',       color: 'bg-red-700',     textColor: 'text-red-100' },
  { id: 'hiphop',    label: 'Hip-Hop',    color: 'bg-yellow-600',  textColor: 'text-yellow-100' },
  { id: 'jazz',      label: 'Jazz',       color: 'bg-amber-700',   textColor: 'text-amber-100' },
  { id: 'classical', label: 'Classical',  color: 'bg-purple-700',  textColor: 'text-purple-100' },
  { id: 'electronic',label: 'Electronic', color: 'bg-cyan-600',    textColor: 'text-cyan-100' },
  { id: 'rnb',       label: 'R&B',        color: 'bg-violet-600',  textColor: 'text-violet-100' },
  { id: 'country',   label: 'Country',    color: 'bg-orange-700',  textColor: 'text-orange-100' },
  { id: 'indie',     label: 'Indie',      color: 'bg-green-700',   textColor: 'text-green-100' },
  { id: 'metal',     label: 'Metal',      color: 'bg-gray-700',    textColor: 'text-gray-100' },
  { id: 'folk',      label: 'Folk',       color: 'bg-lime-700',    textColor: 'text-lime-100' },
  { id: 'reggae',    label: 'Reggae',     color: 'bg-emerald-700', textColor: 'text-emerald-100' },
  { id: 'soul',      label: 'Soul',       color: 'bg-rose-700',    textColor: 'text-rose-100' },
  { id: 'funk',      label: 'Funk',       color: 'bg-yellow-700',  textColor: 'text-yellow-100' },
  { id: 'blues',     label: 'Blues',      color: 'bg-blue-700',    textColor: 'text-blue-100' },
  { id: 'ambient',   label: 'Ambient',    color: 'bg-teal-700',    textColor: 'text-teal-100' },
  { id: 'lofi',      label: 'Lo-Fi',      color: 'bg-indigo-700',  textColor: 'text-indigo-100' },
  { id: 'synthwave', label: 'Synthwave',  color: 'bg-violet-800',  textColor: 'text-violet-100' },
  { id: 'house',     label: 'House',      color: 'bg-orange-600',  textColor: 'text-orange-100' },
  { id: 'trap',      label: 'Trap',       color: 'bg-red-800',     textColor: 'text-red-100' },
  { id: 'kpop',      label: 'K-Pop',      color: 'bg-pink-500',    textColor: 'text-pink-100' },
  { id: 'latin',     label: 'Latin',      color: 'bg-orange-500',  textColor: 'text-orange-100' },
  { id: 'afrobeat',  label: 'Afrobeat',   color: 'bg-yellow-800',  textColor: 'text-yellow-100' },
  { id: 'bossa',     label: 'Bossa Nova', color: 'bg-emerald-600', textColor: 'text-emerald-100' },
];

export const MOODS = [
  { id: 'happy',       label: 'Happy',       emoji: '😄', color: 'border-yellow-500 text-yellow-400' },
  { id: 'sad',         label: 'Sad',         emoji: '😢', color: 'border-blue-500 text-blue-400' },
  { id: 'energetic',   label: 'Energetic',   emoji: '⚡', color: 'border-orange-500 text-orange-400' },
  { id: 'calm',        label: 'Calm',        emoji: '🌊', color: 'border-teal-500 text-teal-400' },
  { id: 'romantic',    label: 'Romantic',    emoji: '💕', color: 'border-pink-500 text-pink-400' },
  { id: 'angry',       label: 'Angry',       emoji: '😤', color: 'border-red-500 text-red-400' },
  { id: 'melancholic', label: 'Melancholic', emoji: '🌧️', color: 'border-indigo-500 text-indigo-400' },
  { id: 'uplifting',   label: 'Uplifting',   emoji: '🚀', color: 'border-amber-500 text-amber-400' },
  { id: 'dark',        label: 'Dark',        emoji: '🌑', color: 'border-gray-600 text-gray-400' },
  { id: 'mysterious',  label: 'Mysterious',  emoji: '🔮', color: 'border-purple-500 text-purple-400' },
  { id: 'nostalgic',   label: 'Nostalgic',   emoji: '📻', color: 'border-orange-400 text-orange-300' },
  { id: 'peaceful',    label: 'Peaceful',    emoji: '🕊️', color: 'border-green-500 text-green-400' },
  { id: 'aggressive',  label: 'Aggressive',  emoji: '🔥', color: 'border-red-600 text-red-400' },
  { id: 'dreamy',      label: 'Dreamy',      emoji: '✨', color: 'border-violet-500 text-violet-400' },
  { id: 'chill',       label: 'Chill',       emoji: '😎', color: 'border-cyan-500 text-cyan-400' },
  { id: 'epic',        label: 'Epic',        emoji: '⚔️', color: 'border-amber-600 text-amber-400' },
];

export const INSTRUMENTS = [
  'Piano', 'Guitar (Acoustic)', 'Guitar (Electric)', 'Bass Guitar',
  'Drums & Percussion', 'Violin', 'Cello', 'Saxophone',
  'Trumpet', 'Flute', 'Synthesizer', 'Choir',
  'Orchestral Strings', 'Harp', 'Banjo', 'Ukulele',
  'Organ', 'Harmonica', 'Marimba', 'Trombone',
];

export const VOCAL_STYLES = [
  { id: 'male',       label: 'Male Vocals',    desc: 'Deep or tenor voice' },
  { id: 'female',     label: 'Female Vocals',  desc: 'Soprano or alto voice' },
  { id: 'mixed',      label: 'Mixed Duet',     desc: 'Male & female together' },
  { id: 'none',       label: 'Instrumental',   desc: 'No vocals at all' },
  { id: 'choir',      label: 'Choir',          desc: 'Full choral arrangement' },
  { id: 'rap',        label: 'Rap / Hip-Hop',  desc: 'Rhythmic spoken lyrics' },
  { id: 'spoken',     label: 'Spoken Word',    desc: 'Narrative poetry style' },
  { id: 'opera',      label: 'Opera',          desc: 'Classical operatic voice' },
  { id: 'falsetto',   label: 'Falsetto',       desc: 'High, breathy register' },
  { id: 'growl',      label: 'Metal Growl',    desc: 'Heavy distorted vocals' },
];

export const ERAS = [
  '1950s', '1960s', '1970s', '1980s', '1990s',
  '2000s', '2010s', 'Modern (2020s)',
];

export const LANGUAGES = [
  'English', 'Spanish', 'French', 'Italian', 'Portuguese',
  'Japanese', 'Korean', 'Arabic', 'Hebrew', 'German',
  'Mandarin', 'Hindi', 'Russian', 'Swedish', 'Instrumental (No Lyrics)',
];

export const THEMES = [
  'Love & Romance', 'Adventure & Journey', 'Struggle & Triumph',
  'Party & Celebration', 'Nature & Earth', 'Space & Cosmos',
  'Nostalgia & Memory', 'Freedom & Liberation', 'Identity & Self',
  'Loss & Grief', 'Hope & Resilience', 'Fantasy & Magic',
  'Social Justice', 'Technology & Future', 'Spirituality & Faith', 'Revolution',
];

export const MUSIC_KEYS = [
  'C Major', 'G Major', 'D Major', 'A Major', 'E Major', 'B Major', 'F Major',
  'A Minor', 'E Minor', 'B Minor', 'F# Minor', 'C# Minor', 'D Minor', 'G Minor',
];

export const TEMPOS = [
  { id: 'very-slow', label: 'Very Slow',  bpm: '40–60 BPM',   desc: 'Largo / Grave' },
  { id: 'slow',      label: 'Slow',       bpm: '60–80 BPM',   desc: 'Adagio / Andante' },
  { id: 'medium',    label: 'Medium',     bpm: '80–120 BPM',  desc: 'Moderato' },
  { id: 'fast',      label: 'Fast',       bpm: '120–160 BPM', desc: 'Allegro / Vivace' },
  { id: 'very-fast', label: 'Very Fast',  bpm: '160+ BPM',    desc: 'Presto / Prestissimo' },
];

export const STRUCTURE_SECTIONS = [
  'Intro', 'Verse 1', 'Pre-Chorus', 'Chorus', 'Verse 2',
  'Bridge', 'Outro', 'Solo / Break', 'Refrain',
];

export const MOCK_TRENDING_TRACKS = [
  { id: 't1',  title: 'Neon Horizon',      genre: 'Synthwave',  mood: 'Energetic',  plays: 142800, tags: ['80s', 'retro', 'driving'] },
  { id: 't2',  title: 'Midnight Rain',     genre: 'Lo-Fi',      mood: 'Calm',       plays: 98400,  tags: ['study', 'rain', 'chill'] },
  { id: 't3',  title: 'Broken Clocks',     genre: 'Indie',      mood: 'Melancholic',plays: 87200,  tags: ['guitar', 'raw', 'emotional'] },
  { id: 't4',  title: 'Fire & Gold',       genre: 'Hip-Hop',    mood: 'Energetic',  plays: 204000, tags: ['trap', 'hard', 'anthem'] },
  { id: 't5',  title: 'Blossom',           genre: 'K-Pop',      mood: 'Happy',      plays: 321000, tags: ['bright', 'dance', 'chorus'] },
  { id: 't6',  title: 'Desert Rose',       genre: 'Ambient',    mood: 'Mysterious', plays: 56700,  tags: ['cinematic', 'slow', 'texture'] },
  { id: 't7',  title: 'Soul on Fire',      genre: 'R&B',        mood: 'Romantic',   plays: 175400, tags: ['smooth', 'voice', 'groove'] },
  { id: 't8',  title: 'Stardust Express',  genre: 'Jazz',       mood: 'Uplifting',  plays: 43900,  tags: ['trumpet', 'swing', 'late-night'] },
  { id: 't9',  title: 'Concrete Jungle',   genre: 'Trap',       mood: 'Aggressive', plays: 287600, tags: ['bass', '808', 'urban'] },
  { id: 't10', title: 'Waves & Wind',      genre: 'Folk',       mood: 'Peaceful',   plays: 61200,  tags: ['acoustic', 'nature', 'vocals'] },
  { id: 't11', title: 'Digital Heartbeat', genre: 'Electronic', mood: 'Dreamy',     plays: 134500, tags: ['edm', 'drop', 'festival'] },
  { id: 't12', title: 'Crimson Tide',      genre: 'Metal',      mood: 'Aggressive', plays: 92100,  tags: ['heavy', 'riff', 'breakdown'] },
];
