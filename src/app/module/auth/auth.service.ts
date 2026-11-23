import { auth } from "../../lib/auth";

interface IRegisterPatientPayload {
    name: string;
    email: string;
    password: string;
}

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

export const authService = {
    registerPatient
};
