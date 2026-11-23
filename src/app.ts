import express, { Application, Request, Response } from "express";
import { prisma } from "./app/lib/prisma";
import { IndexRoutes } from "./app/routes";

const app: Application = express();


// Enable URL-encoded from data parsing
app.use(express.urlencoded({ extended: true }));

// middleware to pass json bodies
app.use(express.json());

app.use("/api/v1", IndexRoutes);

// basic route
app.get("/", async (req: Request, res: Response) => {
    try {
        const specialty = await prisma.specialty.create({
            data: {
                title: "Cardiology"
            }
        })
        res.status(201).json({
            success: true,
            message: "API created for specialty",
            data: specialty
        });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({ success: false, error: error.message })
    }
});

export default app;
