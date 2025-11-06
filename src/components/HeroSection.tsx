import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const HeroSection = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleShorten = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL to shorten");
      return;
    }

    // Validate URL starts with http:// or https://
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      toast.error("URL must start with http:// or https://");
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      toast.error("Please enter a valid URL");
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke("shorten-url", {
        body: { longUrl: url },
      });

      if (error) throw error;

      if (data.error) {
        toast.error(data.error);
        return;
      }

      setShortCode(data.shortCode);
      setShortUrl(data.shortUrl);
      toast.success("✅ Link shortened successfully!");
      
      // Auto-copy to clipboard
      await navigator.clipboard.writeText(data.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
    } catch (error) {
      console.error("Error shortening URL:", error);
      toast.error("Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
      {/* Ad Banner Placeholder - Top */}
      <div className="mb-12 flex justify-center">
        <div className="w-full max-w-3xl h-24 glass-card rounded-lg flex items-center justify-center text-muted-foreground text-sm border-2 border-dashed">
          Ad Space (728x90)
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>AI-Powered Link Shortening</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="gradient-text">Shorten Your Links.</span>
          <br />
          <span className="text-foreground">Track Smarter.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Create fast, secure, and SEO-friendly short links with AI-powered accuracy.
          Perfect for social media, marketing, and analytics.
        </p>

        <div className="max-w-3xl mx-auto space-y-4 animate-slide-up">
          <div className="glass-card rounded-2xl p-6 md:p-8 space-y-4 shadow-medium hover:shadow-glow transition-all duration-300">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="url"
                placeholder="Paste your long URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleShorten()}
                className="flex-1 h-12 md:h-14 text-base bg-white/50 border-border/50 focus:border-primary"
              />
              <Button
                onClick={handleShorten}
                disabled={isLoading}
                className="h-12 md:h-14 px-8 btn-gradient text-white font-semibold shadow-md hover:shadow-glow"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Shortening...
                  </span>
                ) : (
                  "Shorten Now"
                )}
              </Button>
            </div>

            {shortUrl && (
              <div className="animate-scale-in space-y-3 pt-4 border-t border-border/50">
                <p className="text-sm font-medium text-muted-foreground">Your shortened link:</p>
                <div className="flex items-center gap-3 p-4 bg-white/70 rounded-xl border border-primary/20">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-primary font-medium hover:underline truncate"
                  >
                    {shortUrl}
                  </a>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            No signup required • Free forever • Powered by AI
          </p>
        </div>
      </div>

      {/* Ad Banner Placeholder - Bottom */}
      <div className="mt-16 flex justify-center">
        <div className="w-full max-w-3xl h-24 glass-card rounded-lg flex items-center justify-center text-muted-foreground text-sm border-2 border-dashed">
          Ad Space (728x90)
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
