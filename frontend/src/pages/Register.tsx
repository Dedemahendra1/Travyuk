import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {  useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import * as apiClient from '../api-client'
import {toast} from 'react-hot-toast'

export type RegisterFormData = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}


const Register = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation(apiClient.register,
        {
            onSuccess: async () => {
              toast.success("Registration Success!");
              await queryClient.invalidateQueries("validateToken");
              navigate("/");
              console.log("Registration")
            },
            onError: (error: Error) => {
              toast.error("ERROR");
              console.log(error.message)
            },
          }
    )

    const { register, 
        handleSubmit,
        watch,
        formState: { errors } } = useForm<RegisterFormData>();

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
        <form onSubmit={onSubmit}>
            <Card className="mx-auto max-w-4xl">
                <CardHeader className="items-center ">
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input {...register("firstName", { required: "This field is required" })} id="first-name" placeholder="Max" />
                                {errors.firstName && (
                                    <span className="text-red-500">{errors.firstName.message}</span>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Last name</Label>
                                <Input {...register("lastName", { required: "This field is required" })} id="last-name" placeholder="Robinson" />
                                {errors.lastName && (
                                    <span className="text-red-500">{errors.lastName.message}</span>
                                )}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input {...register("email", { required: "This field is required" })} id="email" type="email" placeholder="m@example.com" />
                            {errors.email && (
                                <span className="text-red-500">{errors.email.message}</span>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input {...register("password", { required: "This field is required" })} id="password" type="password" />
                            {errors.password && (
                                <span className="text-red-500">{errors.password.message}</span>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <Input {...register("confirmPassword", {
                                validate: (val) => {
                                    if (!val) {
                                        return "This field is required";
                                    } else if (watch("password") !== val) {
                                        return "Your passwords do not match";
                                    }
                                },
                            })} id="confirm-password" type="password" />
                            {errors.confirmPassword && (
                                <span className="text-red-500">{errors.confirmPassword.message}</span>
                            )}
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/sign-in" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}

export default Register
