/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Music, Zap, Settings, History, Mic, Play, Pause, Loader2 } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [style, setStyle] = useState('synthwave');
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  useEffect(() => {
    async function checkApiKey() {
      if (typeof window !== 'undefined' && (window as any).aistudio) {
        setHasApiKey(await (window as any).aistudio.hasSelectedApiKey());
      }
    }
    checkApiKey();
  }, []);

  async function generateMusic() {
    if (!hasApiKey) {
      await (window as any).aistudio.openSelectKey();
      setHasApiKey(true);
    }

    setIsGenerating(true);
    setAudioUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContentStream({
        model: "lyria-3-clip-preview",
        contents: `Style: ${style}. Prompt: ${prompt}. Lyrics: ${lyrics}`,
      });

      let audioBase64 = "";
      let mimeType = "audio/wav";

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
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: mimeType });
      setAudioUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error generating music:", error);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-6 font-sans">
      <header className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-2">
          <Music className="w-8 h-8 text-purple-500" />
          <h1 className="text-3xl font-bold tracking-tighter">MelodyForge <span className="text-purple-500">AI</span></h1>
        </div>
        {!hasApiKey && (
          <button 
            onClick={() => (window as any).aistudio.openSelectKey()}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-full font-medium flex items-center gap-2"
          >
            Select API Key
          </button>
        )}
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Generate Track</h2>
            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your track (e.g., 'Uplifting synthwave with a driving beat')"
                className="w-full bg-gray-950 border border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                rows={3}
              />
              <textarea
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                placeholder="Enter your lyrics here..."
                className="w-full bg-gray-950 border border-gray-700 p-4 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                rows={6}
              />
              <div className="flex gap-4">
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="flex-1 bg-gray-950 border border-gray-700 p-3 rounded-xl outline-none"
                >
                  <option value="synthwave">Synthwave</option>
                  <option value="lofi">Lo-Fi</option>
                  <option value="techno">Techno</option>
                  <option value="jazz">Jazz</option>
                </select>
                <button 
                  onClick={generateMusic}
                  disabled={isGenerating}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 disabled:opacity-50"
                >
                  {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate'}
                </button>
              </div>
            </div>
          </div>
          {audioUrl && (
            <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl flex items-center gap-4">
              <audio src={audioUrl} controls className="w-full" />
            </div>
          )}
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <History className="w-5 h-5" /> History
          </h2>
          <div className="space-y-4">
            {/* Placeholder for history items */}
            <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 flex items-center justify-between">
              <span>Track 1</span>
              <button className="p-2 bg-gray-800 rounded-full"><Play className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


