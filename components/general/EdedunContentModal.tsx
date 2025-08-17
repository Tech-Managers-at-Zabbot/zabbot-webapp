import React, { useState } from 'react';
import { Search, Play, Pause, Check } from 'lucide-react';

interface EdedunPhrase {
  id: string;
  yorubaText: string;
  englishTranslation: string;
  audioUrl: string;
  category: string;
}

interface EdedunModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (phrases: EdedunPhrase[]) => void;
}

// Mock data for Ededun phrases
const mockEdedunPhrases: EdedunPhrase[] = [
  {
    id: '1',
    yorubaText: 'Báwo ni?',
    englishTranslation: 'How are you?',
    audioUrl: '/audio/bawo-ni.mp3',
    category: 'Greetings'
  },
  {
    id: '2',
    yorubaText: 'Ẹ kú àárọ̀',
    englishTranslation: 'Good morning',
    audioUrl: '/audio/eku-aaro.mp3',
    category: 'Greetings'
  },
  {
    id: '3',
    yorubaText: 'Mo fẹ́ jeun',
    englishTranslation: 'I want to eat',
    audioUrl: '/audio/mo-fe-jeun.mp3',
    category: 'Food'
  },
  {
    id: '4',
    yorubaText: 'Orúkọ mi ni...',
    englishTranslation: 'My name is...',
    audioUrl: '/audio/oruko-mi-ni.mp3',
    category: 'Introduction'
  },
  {
    id: '5',
    yorubaText: 'Ṣé o gbọ́ mi?',
    englishTranslation: 'Do you hear me?',
    audioUrl: '/audio/se-o-gbo-mi.mp3',
    category: 'Communication'
  },
  {
    id: '6',
    yorubaText: 'Àárẹ̀',
    englishTranslation: 'Thank you',
    audioUrl: '/audio/aare.mp3',
    category: 'Gratitude'
  },
  {
    id: '7',
    yorubaText: 'Níbo ni ilé ìwé wà?',
    englishTranslation: 'Where is the school?',
    audioUrl: '/audio/nibo-ni-ile-iwe-wa.mp3',
    category: 'Directions'
  },
  {
    id: '8',
    yorubaText: 'Mo nífẹ̀ẹ́ sí ọ',
    englishTranslation: 'I love you',
    audioUrl: '/audio/mo-nife-si-o.mp3',
    category: 'Emotions'
  }
];

const EdedunModal: React.FC<EdedunModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPhrases, setSelectedPhrases] = useState<EdedunPhrase[]>([]);
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = ['All', ...Array.from(new Set(mockEdedunPhrases.map(phrase => phrase.category)))];

  const filteredPhrases = mockEdedunPhrases.filter(phrase => {
    const matchesSearch = phrase.yorubaText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         phrase.englishTranslation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || phrase.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const togglePhraseSelection = (phrase: EdedunPhrase) => {
    setSelectedPhrases(prev => {
      const isSelected = prev.some(p => p.id === phrase.id);
      if (isSelected) {
        return prev.filter(p => p.id !== phrase.id);
      } else {
        return [...prev, phrase];
      }
    });
  };

  const playAudio = (audioUrl: string, phraseId: string) => {
    // In a real app, you would play the actual audio file
    setPlayingAudio(phraseId);
    // Simulate audio playing for 2 seconds
    setTimeout(() => setPlayingAudio(null), 2000);
  };

  const handleSelect = () => {
    onSelect(selectedPhrases);
    onClose();
    setSelectedPhrases([]);
    setSearchTerm('');
    setSelectedCategory('All');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#012657]">Select from Ededun Database</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#012657]" size={16} />
              <input
                type="text"
                placeholder="Search phrases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-[#012657] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border text-[#012657] border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {selectedPhrases.length > 0 && (
            <div className="mb-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                {selectedPhrases.length} phrase{selectedPhrases.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          )}
        </div>

        {/* Phrases List */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="grid gap-3">
            {filteredPhrases.map(phrase => {
              const isSelected = selectedPhrases.some(p => p.id === phrase.id);
              const isPlaying = playingAudio === phrase.id;
              
              return (
                <div
                  key={phrase.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => togglePhraseSelection(phrase)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-lg text-gray-900">{phrase.yorubaText}</h3>
                          <p className="text-gray-600 text-sm">{phrase.englishTranslation}</p>
                          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full mt-1">
                            {phrase.category}
                          </span>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playAudio(phrase.audioUrl, phrase.id);
                          }}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full"
                          title="Play pronunciation"
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                        </button>
                        
                        {isSelected && (
                          <div className="p-1 bg-blue-600 text-white rounded-full">
                            <Check size={16} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPhrases.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No phrases found matching your search criteria.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSelect}
            disabled={selectedPhrases.length === 0}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Selected ({selectedPhrases.length})
          </button>
        </div>
      </div>
    </div>
  );
};

export default EdedunModal;