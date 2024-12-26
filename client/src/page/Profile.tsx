import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/services/userApi";
import { IconBrandProducthunt } from "@tabler/icons-react";
import { CassetteTape, LogOut, User, UserCircle2Icon } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();

    const user = useSelector((state: any) => state.user.user);
    console.log("user", user);

    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res.error) {
                toast.error(res?.error?.data?.message || "Logout failed.");
            } else {
                toast.success("Logged out successfully!");
                navigate("/signin");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during logout.");
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <User className="h-8 w-8 rounded-full cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <Link to={'/myaccount'}>
                    <DropdownMenuLabel className="flex items-center gap-2"> <User /> My Account</DropdownMenuLabel>
                </Link>
                <DropdownMenuSeparator />
                <Link to={'/categories'}>
                    <DropdownMenuLabel className="flex items-center gap-2"> <CassetteTape /> Categories</DropdownMenuLabel>
                </Link>
                <DropdownMenuSeparator />
                <Link to={'/productCreated'}>
                    <DropdownMenuLabel className="flex items-center gap-2"> <IconBrandProducthunt /> Product Created</DropdownMenuLabel>
                </Link>
                <DropdownMenuSeparator />
                <Link to={'/allUsers'}>
                    <DropdownMenuLabel className="flex items-center gap-2"> <UserCircle2Icon /> All Users</DropdownMenuLabel>
                </Link>

                <DropdownMenuSeparator />

                {user ? (
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Button onClick={handleLogout} variant="ghost">
                                <LogOut />
                                Log out
                                <DropdownMenuShortcut />
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                ) : (
                    <DropdownMenuGroup>
                        <Link to="/signup">
                            <DropdownMenuItem>

                                Sign Up
                                <DropdownMenuShortcut />
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuGroup>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Profile;
