import express, { Response ,Request } from "express";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post('/', verifyToken , [],async (req: Request, res: Response) => {})

export default router;