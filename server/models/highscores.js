const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizScoresSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
    quizName: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    unique: ['userId', 'quizName'],
  }
);

const QuizScores = mongoose.model('QuizScores', QuizScoresSchema);

module.exports = QuizScores;
