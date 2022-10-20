import express from "express";
const router = express.Router();
import {
    getAuthById,
    login,
    signup,
    getAllUsers
} from '../controllers/auth.controller.js';
import advancedResults from "../middlewares/advancedResults.js";
import Auth from "../models/auth.model.js";


router.get('/', advancedResults(Auth), getAllUsers);
router.get('/:id', getAuthById);
router.post('/', signup);
router.post('/login', login);


export default router;
