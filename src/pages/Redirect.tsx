import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Redirect = () => {
  const { shortCode } = useParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const redirect = async () => {
      if (!shortCode) {
        setError("Invalid short code");
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke("redirect", {
          body: { shortCode },
        });

        if (error) throw error;

        if (data.error) {
          setError(data.error);
          return;
        }

        // Redirect to the long URL
        window.location.href = data.longUrl;
      } catch (error) {
        console.error("Redirect error:", error);
        setError("Failed to redirect. The link may be invalid or expired.");
      }
    };

    redirect();
  }, [shortCode]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
            <span className="text-4xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold">Link Not Found</h1>
          <p className="text-muted-foreground">{error}</p>
          <a
            href="/"
            className="inline-block px-6 py-3 rounded-lg btn-gradient text-white font-semibold hover:shadow-glow transition-all"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 mx-auto animate-spin text-primary" />
        <p className="text-lg text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
};

export default Redirect;
