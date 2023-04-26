import Task from "../routes/task.js";
import express from "express";
import cors from "cors";
export class Root {
    constructor() { }
    static setup(app, PORT) {
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(cors());
        app.use("/taskapi", Task);
        app.listen(PORT, () => {
            console.log(`Server running on port#${PORT}`);
        });
    }
}
//# sourceMappingURL=root.js.map