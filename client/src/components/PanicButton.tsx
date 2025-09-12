import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function PanicButton() {
  const showEmergencyAlert = () => {
    alert('🚨 EMERGENCY ALERT ACTIVATED!\n\nYour location has been shared with:\n• Local emergency services\n• Your emergency contacts\n• Tourist helpline\n\nHelp is on the way!');
  };

  return (
    <Button 
      onClick={showEmergencyAlert}
      data-testid="button-panic"
      className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg transition-all transform hover:scale-110 z-50"
      style={{ boxShadow: '0 4px 20px rgba(220, 38, 38, 0.3)' }}
    >
      <AlertTriangle className="h-6 w-6" />
    </Button>
  );
}
