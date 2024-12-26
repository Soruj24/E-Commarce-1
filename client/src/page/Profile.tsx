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
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Profile = () => {
    const [logout] = useLogoutMutation();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const res = await logout();
            if (res.error) {
                // Display error toast if logout fails
                toast.error(res?.error?.data?.message || "Logout failed.");
            } else {
                // Display success toast if logout succeeds
                toast.success("Logged out successfully!");
                navigate("/signin");
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred during logout.");
        }
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <User className="h-8 w-8 rounded-full cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link to={"/signup"}>
                        <DropdownMenuItem>
                            Sign Up
                            <DropdownMenuShortcut></DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Button onClick={handleLogout} variant="ghost">
                        Log out
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Profile;
