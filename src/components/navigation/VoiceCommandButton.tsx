import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function VoiceCommandButton() {
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const handleVoiceCommand = () => {
    if (isListening) {
      setIsListening(false);
      // Stop voice recognition
    } else {
      setIsListening(true);
      // Start voice recognition and navigate to search
      navigate('/search?voice=true');
      setTimeout(() => setIsListening(false), 3000); // Auto-stop after 3 seconds
    }
  };

  return (
    <Button
      onClick={handleVoiceCommand}
      className={`fixed bottom-20 right-4 w-14 h-14 rounded-full elevation-floating z-50 transition-material ${
        isListening 
          ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground scale-110' 
          : 'bg-primary hover:bg-primary/90 text-primary-foreground'
      }`}
      size="icon"
    >
      {isListening ? <MicOff size={24} /> : <Mic size={24} />}
    </Button>
  );
}