export interface PronunciationProps {
    id: string;
    englishWord: string;
    yorubaWord: string;
    femaleVoice: string;
    maleVoice: string;
  }

  export interface PronunciationListProps {
  setSelectedItem: (item: string) => void;
  selectedItem: string;
}