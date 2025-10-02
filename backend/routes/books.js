const express = require('express');
const auth = require('../middleware/auth');
const Book = require('../models/Book');

const router = express.Router();

// Create a book
router.post('/', auth, async (req, res) => {
  const { title, author, description, genre, year } = req.body;
  try {
    const book = new Book({
      title,
      author,
      description,
      genre,
      year,
      addedBy: req.user,
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get books with pagination (5 per page)
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  try {
    const count = await Book.countDocuments();
    const books = await Book.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    res.json({
      books,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get book by id
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('addedBy', 'name email');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(500).send('Server error');
  }
});

// Update book (only creator)
router.put('/:id', auth, async (req, res) => {
  const { title, author, description, genre, year } = req.body;
  try {
    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (book.addedBy.toString() !== req.user) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    book.title = title || book.title;
    book.author = author || book.author;
    book.description = description || book.description;
    book.genre = genre || book.genre;
    book.year = year || book.year;

    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete book (only creator)
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (book.addedBy.toString() !== req.user) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await book.remove();
    res.json({ message: 'Book removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
