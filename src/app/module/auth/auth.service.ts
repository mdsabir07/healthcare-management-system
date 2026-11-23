import { UserStatus } from "../../../generated/prisma/browser";
import { auth } from "../../lib/auth";

interface IRegisterPatientPayload {
    name: string;
    email: string;
    password: string;
}

interface ILoginUserPayload {
    email: string;
    password: string;
}

// RegisterPatientPayload
const registerPatient = async (payload: IRegisterPatientPayload) => {
    const { name, email, password } = payload;

    const response = await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
        },
        asResponse: true,
    });

    return response;
}

// LoginUserPayload
const loginUser = async (payload: ILoginUserPayload) => {
    const { email, password } = payload;

    const data = await auth.api.signInEmail({
        body: {
            email,
            password,
        },
    });

    if (data.user.status === UserStatus.BLOCKED) {
        throw new Error("User is blocked. Please contact support.");
    }

    if (data.user.isDeleted || data.user.status === UserStatus.DELETED) {
        throw new Error("User is deleted. Please contact support.")
    }

    return data;
}


export const authService = {
    registerPatient,
    loginUser
};
