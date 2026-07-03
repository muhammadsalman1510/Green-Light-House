import Product from '../models/Product.js';
import Category from '../models/Category.js';

export async function getAll(req, res, next) {
  try {
    const {
      category,
      featured,
      sale,
      newArrival,
      q,
      sort = 'createdAt',
      order = 'desc',
      page = 1,
      limit = 12,
      inStock,
    } = req.query;

    const filter = { isActive: true };

    if (category) {
      const cat = await Category.findOne({ slug: category });
      if (cat) filter.category = cat._id;
    }

    if (featured === 'true') filter.isFeatured = true;
    if (sale === 'true') filter.salePrice = { $ne: null, $gt: 0 };
    if (newArrival === 'true') filter.isNewArrival = true;
    if (inStock === 'true') filter.stockStatus = 'inStock';

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { shortDesc: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { sku: { $regex: q, $options: 'i' } },
      ];
    }

    const sortObj = {};
    sortObj[sort] = order === 'asc' ? 1 : -1;

    const skip = (Number(page) - 1) * Number(limit);
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('category', 'name slug')
        .sort(sortObj)
        .skip(skip)
        .limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    next(err);
  }
}

export async function getBySlug(req, res, next) {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      isActive: true,
    }).populate('category', 'name slug');
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug');
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('category', 'name slug');
    if (!product) return res.status(404).json({ message: 'Product not found.' });
    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    await Product.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Product deactivated.' });
  } catch (err) {
    next(err);
  }
}

export async function adminGetAll(req, res, next) {
  try {
    const products = await Product.find({})
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });
    res.json({ products, total: products.length });
  } catch (err) {
    next(err);
  }
}
