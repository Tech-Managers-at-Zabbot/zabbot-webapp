export interface PronunciationProps {
  id: string;
  englishWord: string;
  yorubaWord: string;
  femaleVoice: string;
  maleVoice: string;
  tone: string;
}

export interface PronunciationListProps {
  setSelectedItem: (item: string) => void;
  selectedItem: string;
  data: PronunciationProps[];
  isLoading: boolean;
}

export interface ConversationProps {
  id: string;
  title: string;
  date: Date;
  messages: {
    role: 'user' | 'assistant';
    content: string;
  }[];
}