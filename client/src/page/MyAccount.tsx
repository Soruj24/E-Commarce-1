import React, { useState } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
    useChangePasswordMutation,
    useDeleteUserMutation,
    useLogoutMutation,
    useUpdateUserMutation
} from "@/services/userApi";
import { useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";

const nameSchema = z.string().min(1, "Name is required").max(50, "Name cannot exceed 50 characters");
const passwordSchema = z.object({
    currentPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

const MyAccount: React.FC = () => {

    const user = useSelector((state: any) => state.user.user);

    const [formData, setFormData] = useState({
        name: user.name || "",
        email: user.email || "",
        currentPassword: "",
        newPassword: "",
    });


    const [passwordVisible, setPasswordVisible] = useState({
        currentPassword: false,
        newPassword: false,
    });


    const navigate = useNavigate();

    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [logout] = useLogoutMutation();
    const [changePassword] = useChangePasswordMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSaveChanges = async (id: string) => {
        try {
            nameSchema.parse(formData.name);
            await updateUser({ id, name: formData.name });
            toast.success("Profile updated successfully!");
        } catch (error) {
            if (error instanceof z.ZodError) {
                toast.error(error.errors[0].message);
            }
        }
    };

    const handlePasswordChange = async (user: any) => {

        try {

            passwordSchema.parse({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });


            const currentPassword = formData.currentPassword;
            const newPassword = formData.newPassword;

            console.log(currentPassword, newPassword)

            const res = await changePassword({
                id: user._id,
                oldPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });


            if (res.error) {
                toast.error(res?.error?.data?.message || "Password change failed.");
                return;
            }



            toast.success("Password changed successfully!");
        } catch (error) {
            console.log(error)
            if (error instanceof z.ZodError) {
                toast.error(error.errors[0].message);
            }
        }
    };

    const handleDeleteAccount = async (id: string) => {
        try {
            await deleteUser(id);
            await logout();
            toast.success("Account deleted successfully!");
            navigate("/");
        } catch (error) {
            toast.error("An error occurred during account deletion.");
        }
    };

    const togglePasswordVisibility = (field: "currentPassword" | "newPassword") => {
        setPasswordVisible((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    return (
        <div className="container mx-auto p-6">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-lg font-semibold">{formData.name}</h3>
                            <p className="text-sm text-gray-500">{formData.email}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Edit Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="johndoe@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled
                                />
                            </div>
                        </div>
                        <Button onClick={() => handleSaveChanges(user._id)} type="button">
                            Save Changes
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="relative">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                                id="currentPassword"
                                type={passwordVisible.currentPassword ? "text" : "password"}
                                placeholder="Enter current password"
                                value={formData.currentPassword}
                                onChange={handleChange}
                            />
                            <span
                                onClick={() => togglePasswordVisibility("currentPassword")}
                                className="absolute right-2 top-10 cursor-pointer"
                            >
                                {passwordVisible.currentPassword ? <BiHide /> : <BiShow />}
                            </span>
                        </div>
                        <div className="relative">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                type={passwordVisible.newPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                            <span
                                onClick={() => togglePasswordVisibility("newPassword")}
                                className="absolute right-2 top-10 cursor-pointer"
                            >
                                {passwordVisible.newPassword ? <BiHide /> : <BiShow />}
                            </span>
                        </div>
                        <Button onClick={() => handlePasswordChange(user)} type="button">
                            Change Password
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Separator className="my-8" />

            <div className="flex justify-end">
                <Button variant="destructive" onClick={() => handleDeleteAccount(user._id)}>
                    Delete Account
                </Button>
            </div>
        </div>
    );
};

export default MyAccount;
