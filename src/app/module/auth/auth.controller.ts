import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../shared/sendResponse";

const registerPatient = catchAsync(
    async(req: Request, res: Response) => {
        const payload = req.body;

        const authResponse = await authService.registerPatient(payload);

        // Forward Set-Cookie headers from better-auth's Response to Express
        const cookies = authResponse.headers.getSetCookie?.() ??
            (authResponse.headers.get("set-cookie")
                ? [authResponse.headers.get("set-cookie")!]
                : []);
        if (cookies.length > 0) {
            res.setHeader("Set-Cookie", cookies);
        }

        const data = await authResponse.json();

        if (!authResponse.ok || !data.user) {
            throw new Error(data.message || data.error || "Failed to register patient");
        }

        sendResponse(res, {
            httpStatusCode: 201,
            success: true,
            message: "Patient registered successfully",
            data
        });
    }
)

export const authController = {
    registerPatient
};
