import Review from '../models/Review.js';
import Product from '../models/Product.js';

export async function getForProduct(req, res, next) {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({
      product: productId,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
}

export async function submit(req, res, next) {
  try {
    const { productId } = req.params;
    const { name, city, rating, title, body } = req.body;

    if (!name || !rating || !body) {
      return res.status(400).json({ message: 'Name, rating, and review text are required.' });
    }
    if (body.length < 10) {
      return res.status(400).json({ message: 'Review must be at least 10 characters.' });
    }

    const review = new Review({
      product: productId,
      name,
      city: city || '',
      rating: Number(rating),
      title: title || '',
      body,
      isApproved: false,
    });
    await review.save();
    res.status(201).json({ message: 'Review submitted. It will appear after approval.' });
  } catch (err) {
    next(err);
  }
}

export async function getPending(req, res, next) {
  try {
    const reviews = await Review.find({ isApproved: false })
      .populate('product', 'name slug')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
}

export async function adminGetAll(req, res, next) {
  try {
    const reviews = await Review.find({})
      .populate('product', 'name slug')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
}

export async function approve(req, res, next) {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: 'Review not found.' });

    const approved = await Review.find({
      product: review.product,
      isApproved: true,
    });
    const avg = approved.reduce((sum, r) => sum + r.rating, 0) / approved.length;
    await Product.findByIdAndUpdate(review.product, {
      avgRating: Math.round(avg * 10) / 10,
      reviewCount: approved.length,
    });

    res.json({ message: 'Review approved.', review });
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found.' });

    const approved = await Review.find({
      product: review.product,
      isApproved: true,
    });
    const avg = approved.length
      ? approved.reduce((sum, r) => sum + r.rating, 0) / approved.length
      : 0;
    await Product.findByIdAndUpdate(review.product, {
      avgRating: Math.round(avg * 10) / 10,
      reviewCount: approved.length,
    });

    res.json({ message: 'Review deleted.' });
  } catch (err) {
    next(err);
  }
}

export async function addReply(req, res, next) {
  try {
    const { reply } = req.body;
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { adminReply: reply },
      { new: true }
    );
    if (!review) return res.status(404).json({ message: 'Review not found.' });
    res.json(review);
  } catch (err) {
    next(err);
  }
}
