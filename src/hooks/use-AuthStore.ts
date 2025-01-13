import { createStore } from "floppy-disk";

type authStore = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    address: string;
    phone: string;
};

export const useAuthStore = createStore<authStore>(({ set }) => ({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    address: "",
    phone: ""
}));
