import express, { Request, Response } from 'express';
import Question, { IQuestion } from '../models/Question';

const router = express.Router();

// Route pour ajouter une nouvelle question
router.post('/', async (req: Request, res: Response) => {
    try {
        const { statement, answers, correctAnswer } = req.body;
        if (!answers.includes(correctAnswer)) {
            res.status(400).json({ message: 'La réponse correcte doit figurer parmis les réponses du quizz !' })
        }
        const newQuestion: IQuestion = new Question({
            statement,
            answers,
            correctAnswer,
        });
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
});

// Route pour récupérer une question aléatoire
router.get('/random', async (req: Request, res: Response) => {
    try {
        const count = await Question.countDocuments();
        const random = Math.floor(Math.random() * count);
        const question = await Question.findOne().skip(random);
        res.json(question);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
});

// Route pour vérifier si la réponse fournie est correcte
router.post('/:id/check', async (req: Request, res: Response) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question non trouvée' });
        }

        const { answer } = req.body;
        if (question.correctAnswer === answer) {
            res.json({ correct: true });
        } else {
            res.json({ correct: false });
        }
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
  });

export default router;
