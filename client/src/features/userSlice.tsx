import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the user state interface
export interface UserState {
    user: Record<string, unknown> | null;
    accessToken: string | null;
    refreshToken: string | null;
}

// Load initial state from localStorage
const loadStateFromLocalStorage = (): UserState => {
    const user = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    return {
        user: user ? JSON.parse(user) : null,
        accessToken: accessToken || null,
        refreshToken: refreshToken || null,
    };
};


const initialState: UserState = loadStateFromLocalStorage();

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                user: Record<string, unknown>;
                accessToken: string;
                refreshToken: string;
            }>
        ) => {
            const { user,accessToken,refreshToken } = action.payload;
            console.log("user",user)
            state.user = user;
            state.accessToken  = accessToken 
            state.refreshToken = refreshToken;

            // Save to localStorage
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
        },
        logOut: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;

            // Clear localStorage
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
    },
});


export const { setCredentials, logOut } = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectCurrentUser = (state: { user: UserState }) => state.user.user;
export const selectCurrentToken = (state: { user: UserState }) => state.user.accessToken;
export const selectRefreshToken = (state: { user: UserState }) => state.user.refreshToken;
