import { useNavigate } from "react-router";
import { useState } from "react";
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Loader2 } from "lucide-react";
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
  const [errormessage, setErrormessage] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsloading(true);
    setErrormessage(null)
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as FormDataType;
    const formData = new URLSearchParams();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const res = await axios.post(
        "http://localhost:8000/backend/api/v1/auth/admins",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      console.log(res.data)
      localStorage.setItem("authData", res.data.value);
      navigate('/')
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
    <form onSubmit={onSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
        {isloading && <Loader2 className="animate-spin" />}
          Login
        </Button>
        
        <div className="text-sm">
                {errormessage && <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    {errormessage}
                  </AlertDescription>
                </Alert>}
              </div>
      </div>
    
    </form>
  )
}
