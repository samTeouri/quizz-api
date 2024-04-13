import { Document, Schema, model } from 'mongoose';

export interface IQuestion extends Document {
  statement: string;
  answers: string[];
  correctAnswer: string;
}

const QuestionSchema = new Schema({
  statement: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

export default model<IQuestion>('Question', QuestionSchema);
