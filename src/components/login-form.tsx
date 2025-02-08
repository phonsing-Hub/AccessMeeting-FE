import { useNavigate } from "react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertCircle, Loader2, User, EyeOff, Eye } from "lucide-react";
import axios from "axios";

type FormDataType = {
  [key: string]: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  const [errormessage, setErrormessage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsloading(true);
    setErrormessage(null);
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as FormDataType;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/admin`,
        data
      );
      //   console.log(res.data)
      localStorage.setItem("token", res.data.value);
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrormessage(error.response?.data?.detail || "Something went wrong");
      } else {
        setErrormessage("An unexpected error occurred");
      }
    } finally {
      setIsloading(false);
    }
  };

    return (
      <form
        onSubmit={onSubmit}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">Sign in</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Please sign in to your account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="relative">
              <Input
                name="username"
                className="peer pe-9"
                placeholder="Username or Email or ID"
                type="text"
                required
              />
              <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                <User size={16} strokeWidth={2} aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="relative">
              <Input
                name="password"
                className="pe-9"
                placeholder="Password"
                type={isVisible ? "text" : "password"}
              />
              <button
                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? "Hide password" : "Show password"}
                aria-pressed={isVisible}
                aria-controls="password"
              >
                {isVisible ? (
                  <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
                ) : (
                  <Eye size={16} strokeWidth={2} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
          <a
            href="#"
            className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
          <Button type="submit" className="w-full">
            {isloading && <Loader2 className="animate-spin" />}
            SIGN IN
          </Button>

          <div className="text-sm">
            {errormessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errormessage}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </form>
    );
}
