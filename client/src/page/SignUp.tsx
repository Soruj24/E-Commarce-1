import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";

import { cn } from "@/lib/utils";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
const signupSchema = z
    .object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .regex(/[A-Z]/, "Password must include at least one capital letter")
            .regex(/[0-9]/, "Password must include at least one number")
            .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include at least one special character"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });


type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () =>
        setShowConfirmPassword(!showConfirmPassword);

    const onSubmit = (data: SignupFormValues) => {
        toast.success("Signup successful!", { position: "top-right" });
        console.log("Form data:", data);
    };

    const onError = () => {
        toast.error("Please fix the errors in the form!", { position: "top-right" });
    };

    return (
        <div className="max-w-md w-full mt-3  mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <ToastContainer />
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Sign Up
            </h2>

            <form className="my-8" onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                        <Label htmlFor="firstname">First name</Label>
                        <Input
                            id="firstname"
                            placeholder="First Name"
                            type="text"
                            {...register("firstName")}
                        />
                        {errors.firstName && (
                            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                        )}
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="lastname">Last name</Label>
                        <Input
                            id="lastname"
                            placeholder="Last Name"
                            type="text"
                            {...register("lastName")}
                        />
                        {errors.lastName && (
                            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                        )}
                    </LabelInputContainer>
                </div>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        placeholder="Email Address"
                        type="email"
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                    )}
                </LabelInputContainer>
                <LabelInputContainer className="mb-4 relative">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        placeholder="••••••••"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                    />
                    <span
                        className="absolute right-3 top-7 cursor-pointer text-gray-600 dark:text-gray-400"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </LabelInputContainer>
                <LabelInputContainer className="mb-8 relative">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        placeholder="••••••••"
                        type={showConfirmPassword ? "text" : "password"}
                        {...register("confirmPassword")}
                    />
                    <span
                        className="absolute right-3 top-7 cursor-pointer text-gray-600 dark:text-gray-400"
                        onClick={toggleConfirmPasswordVisibility}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </LabelInputContainer>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    Sign up &rarr;
                    <BottomGradient />
                </button>
            </form>

            <div className="flex flex-col space-y-4">
                <button
                    className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="submit"
                >
                    <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        GitHub
                    </span>
                    <BottomGradient />
                </button>
                <button
                    className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="submit"
                >
                    <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        Google
                    </span>
                    <BottomGradient />
                </button>
                <button
                    className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="submit"
                >
                    <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        OnlyFans
                    </span>
                    <BottomGradient />
                </button>
            </div>

            <div className=" mt-4 text-center">
                <p className="text-sm font-semibold">Already have an account? <Link to="/signin" className="text-blue-500"> Sign in </Link> </p>
            </div>


        </div>
    );
};

const BottomGradient = () => (
    <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
);

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>
);

export default Signup;
