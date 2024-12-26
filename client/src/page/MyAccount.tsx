import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "@/services/userApi";

const MyAccount: React.FC = () => {
    const user = useSelector((state: any) => state.user.user);
    console.log("user", user);

    const [formData, setFormData] = useState({
        name: user.name || "",
        email: user.email || "",
        currentPassword: "",
        newPassword: "",
    });

    const [updateUser] = useUpdateUserMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSaveChanges = async (id: string) => {
        const res = await updateUser({ id, name: formData.name });
        console.log(res);
        toast.success("Profile updated successfully!");
    };

    const handlePasswordChange = () => {
        if (formData.currentPassword && formData.newPassword) {
            toast.success("Password changed successfully!");
            console.log("Password change request:", {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
            });
        } else {
            toast.error("Please fill in both password fields.");
        }
    };

    const handleDeleteAccount = (id: string) => {
        alert(`Deleting account with ID: ${id}`);
        toast.success("Account deleted successfully!");
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
                        <div>
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                                id="currentPassword"
                                type="password"
                                placeholder="Enter current password"
                                value={formData.currentPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                placeholder="Enter new password"
                                value={formData.newPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <Button onClick={handlePasswordChange} type="button">
                            Change Password
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Separator className="my-8" />

            <div className="flex justify-end">
                <Button
                    variant="destructive"
                    onClick={() => handleDeleteAccount(user._id)}
                >
                    Delete Account
                </Button>
            </div>
        </div>
    );
};

export default MyAccount;
