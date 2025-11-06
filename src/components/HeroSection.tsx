import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import AdBanner from "./AdBanner";

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
      {/* Ad Banner - Top */}
      <div className="mb-12">
        <AdBanner position="top" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in relative z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 float-animation">
          <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
          <span className="gradient-text">AI-Powered Link Shortening</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          <span className="gradient-text block mb-2">Shorten Your Links.</span>
          <span className="text-foreground block">Track Smarter.</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Create fast, secure, and SEO-friendly short links with AI-powered accuracy.
          <br className="hidden md:block" />
          <span className="font-semibold text-primary">Perfect for social media, marketing, and analytics.</span>
        </p>

        <div className="max-w-3xl mx-auto space-y-6 animate-slide-up">
          <div className="glass-card rounded-3xl p-6 md:p-10 space-y-6 shadow-large hover:shadow-glow transition-all duration-500 border-2 border-glass-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="url"
                placeholder="✨ Paste your long URL here..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleShorten()}
                className="flex-1 h-14 md:h-16 text-base premium-input rounded-2xl px-6 font-medium placeholder:text-muted-foreground/60"
              />
              <Button
                onClick={handleShorten}
                disabled={isLoading}
                className="h-14 md:h-16 px-10 btn-gradient text-white font-bold shadow-lg rounded-2xl text-base"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    Shortening...
                  </span>
                ) : (
                  "Shorten Now →"
                )}
              </Button>
            </div>

            {shortUrl && (
              <div className="animate-scale-in space-y-4 pt-6 border-t-2 border-primary/10">
                <p className="text-sm font-semibold text-primary flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  Your shortened link is ready!
                </p>
                <div className="flex items-center gap-3 p-5 bg-gradient-to-r from-white/90 to-blue-50/90 rounded-2xl border-2 border-primary/30 shadow-lg">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-primary font-bold hover:underline truncate text-lg"
                  >
                    {shortUrl}
                  </a>
                  <Button
                    onClick={handleCopy}
                    className="shrink-0 bg-primary hover:bg-primary/90 text-white shadow-md rounded-xl px-6 py-2 font-semibold"
                  >
                    {copied ? (
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Copied!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Copy className="w-4 h-4" />
                        Copy
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground font-medium">
            🚀 No signup required • 🎯 Free forever • 🤖 Powered by AI
          </p>
        </div>
      </div>

      {/* Ad Banner - Bottom */}
      <div className="mt-16">
        <AdBanner position="bottom" />
      </div>
    </section>
  );
};

export default HeroSection;
