const express = require('express');
const auth = require('../middleware/auth');
const Review = require('../models/Review');
const Book = require('../models/Book');

const router = express.Router();

// Create a review
router.post('/', auth, async (req, res) => {
  const { bookId, rating, reviewText } = req.body;
  try {
    const review = new Review({
      bookId,
      userId: req.user,
      rating,
      reviewText,
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get reviews for a book
router.get('/book/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId }).populate('userId', 'name');
    const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
    res.json({ reviews, averageRating });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update review (only reviewer)
router.put('/:id', auth, async (req, res) => {
  const { rating, reviewText } = req.body;
  try {
    let review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    if (review.userId.toString() !== req.user) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    review.rating = rating || review.rating;
    review.reviewText = reviewText || review.reviewText;

    await review.save();
    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete review (only reviewer)
router.delete('/:id', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    if (review.userId.toString() !== req.user) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await review.remove();
    res.json({ message: 'Review removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
