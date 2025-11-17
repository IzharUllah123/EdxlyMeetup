import { useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "@/components/theme-provider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  view?: "sign_in" | "sign_up";
}

const AuthModal = ({ isOpen, onClose, view = "sign_in" }: AuthModalProps) => {
  const { theme } = useTheme();
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {view === "sign_in" ? "Welcome back to EDXLY" : "Join EDXLY"}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(142 76% 36%)',
                    brandAccent: 'hsl(142 76% 30%)',
                  }
                }
              }
            }}
            theme={theme === "dark" ? "dark" : "light"}
            providers={["google"]}
            redirectTo={`${window.location.origin}/auth/callback`}
            view={view}
            showLinks={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;