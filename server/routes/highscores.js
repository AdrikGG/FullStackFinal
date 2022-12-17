const express = require('express');
const checkAuth = require('../middleware/check-auth');
const mongoose = require('mongoose');
const QuizScores = require('../models/highscores');

const router = express.Router();

router.patch('/', async (req, res) => {
  const userId = req.body.userId;
  const quizName = req.body.quizName;
  const score = req.body.score;

  try {
    const quizScore = await QuizScores.findOne({
      userId: userId,
      quizName: quizName,
    }).exec();
    if (!quizScore) {
      const newQuizScore = new QuizScores({
        userId: userId,
        quizName: quizName,
        score: score,
      });
      await newQuizScore.save();
      return res.status(201).json(newQuizScore);
    }
    quizScore.score = score;
    await quizScore.save();
    res.status(200).json(quizScore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:id', checkAuth, async (req, res) => {
  const id = req.params.id;
  const updateOps = {};

  if (req.body.userId) {
    updateOps.userId = mongoose.Types.ObjectId(req.body.userId);
  }
  if (req.body.quizName) {
    updateOps.quizName = req.body.quizName;
  }
  if (req.body.score) {
    updateOps.score = req.body.score;
  }

  try {
    const result = await QuizScores.updateOne(
      { _id: id },
      { $set: updateOps }
    ).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
