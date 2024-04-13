import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import { Link, useLocation, useNavigate } from "react-router-dom"
import * as apiClient from "../api-client"
import {toast} from "react-hot-toast"

export type SignInFormData = {
  email: string
  password: string
}

const SignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const location = useLocation()

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      toast.success( "Sign in Successful!");
      await queryClient.invalidateQueries("validateToken");
      navigate(location.state?.from?.pathname || "/");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  
  return (
  <form onSubmit={onSubmit}>
    <Card className="mx-auto max-w-xl">
    <CardHeader>
      <CardTitle className="text-2xl">Login</CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email", { required: "this field is required" })}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="password" 
            {...register("password", {
              required: "this field is required",
              minLength: {
                value: 6,
                message: "password must be at least 6 characters",
              }

            })}
          />
          {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to='/register' className="underline">
          Register
        </Link>
      </div>
    </CardContent>
  </Card>
  </form>

  )
}

export default SignIn
