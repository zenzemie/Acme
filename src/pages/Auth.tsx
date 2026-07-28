import { useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Sparkles, Github, Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/dashboard";
  const { isAuthenticated } = useConvexAuth();
  const { signIn } = useAuthActions();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate(returnTo, { replace: true });
    return null;
  }

  const switchMode = useCallback((newMode: "signin" | "signup") => {
    setMode(newMode);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
  }, []);

  const handleEmailAuth = useCallback(async () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }
    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    try {
      await signIn(mode, { email, password, flow: mode });
    } catch (err: any) {
      setError(err?.message || "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [email, password, confirmPassword, mode, signIn]);

  const handleOAuth = useCallback(async (provider: string) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await signIn(provider);
    } catch (err: any) {
      setError(err?.message || `${provider} authentication failed.`);
    } finally {
      setIsSubmitting(false);
    }
  }, [signIn]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[100px]" />
      <div className="absolute right-1/4 top-1/2 h-48 w-48 rounded-full bg-purple-500/10 blur-[80px]" />

      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute left-6 top-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-xl shadow-primary/20">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to continue
          </p>
        </div>

        <Card className="border-border/50 bg-card/40 backdrop-blur-xl shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex rounded-lg bg-muted p-1">
              <button
                onClick={() => switchMode("signin")}
                className={cn(
                  "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                  mode === "signin" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Sign In
              </button>
              <button
                onClick={() => switchMode("signup")}
                className={cn(
                  "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                  mode === "signup" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                Sign Up
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Social auth buttons */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full" size="lg" onClick={() => handleOAuth("github")} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Github className="mr-2 h-4 w-4" />}
                Continue with GitHub
              </Button>
              <Button variant="outline" className="w-full" size="lg" onClick={() => handleOAuth("google")} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                Continue with Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3">
                <p className="text-xs text-destructive">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">Password</label>
                <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleEmailAuth()} />
              </div>
              {mode === "signup" && (
                <div className="space-y-1">
                  <label className="text-sm font-medium">Confirm Password</label>
                  <Input type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
              )}
            </div>

            <Button className="w-full" size="lg" onClick={handleEmailAuth} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {mode === "signin" ? "Sign In" : "Create Account"}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="#" className="underline underline-offset-4 hover:text-foreground">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-4 hover:text-foreground">
                Privacy Policy
              </a>.
            </p>
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          100% open source.{" "}
          <a href="#" className="underline underline-offset-4 hover:text-foreground">
            View on GitHub
          </a>
        </p>
      </motion.div>
    </div>
  );
}
