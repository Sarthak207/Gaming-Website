import express from 'express';
import {getAllGames} from '../controller/game.controller.js';

const router = express.Router();
router.get('/', getAllGames);

export default router;