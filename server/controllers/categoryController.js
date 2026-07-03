import Category from '../models/Category.js';

export async function getAll(req, res, next) {
  try {
    const { parent } = req.query;
    const filter = { isActive: true };
    if (parent === 'null' || parent === 'root') {
      filter.parent = null;
    } else if (parent) {
      const parentDoc = await Category.findOne({ slug: parent });
      filter.parent = parentDoc ? parentDoc._id : null;
    }
    const categories = await Category.find(filter).sort({ order: 1, name: 1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
}

export async function getBySlug(req, res, next) {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
      isActive: true,
    }).populate('parent', 'name slug');
    if (!category) return res.status(404).json({ message: 'Category not found.' });
    res.json(category);
  } catch (err) {
    next(err);
  }
}

export async function create(req, res, next) {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
}

export async function update(req, res, next) {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ message: 'Category not found.' });
    res.json(category);
  } catch (err) {
    next(err);
  }
}

export async function remove(req, res, next) {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!category) return res.status(404).json({ message: 'Category not found.' });
    res.json({ message: 'Category deactivated.' });
  } catch (err) {
    next(err);
  }
}

export async function adminGetAll(req, res, next) {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
}
