import Order from '../models/Order.js';

export async function create(req, res, next) {
  try {
    const { customer, items, total } = req.body;

    if (!customer?.name || !customer?.phone || !customer?.city) {
      return res.status(400).json({ message: 'Customer name, phone, and city are required.' });
    }
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must contain at least one item.' });
    }

    const order = new Order({
      customer,
      items,
      total,
      whatsappSent: true,
    });
    await order.save();
    res.status(201).json({ message: 'Order recorded.', orderNumber: order.orderNumber });
  } catch (err) {
    next(err);
  }
}

export async function getAll(req, res, next) {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Order.countDocuments(filter),
    ]);
    res.json({ orders, total, page: Number(page) });
  } catch (err) {
    next(err);
  }
}

export async function getById(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json(order);
  } catch (err) {
    next(err);
  }
}

export async function updateStatus(req, res, next) {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json(order);
  } catch (err) {
    next(err);
  }
}

export async function getStats(req, res, next) {
  try {
    const [total, newOrders, processing, completed] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: 'new' }),
      Order.countDocuments({ status: 'processing' }),
      Order.countDocuments({ status: 'completed' }),
    ]);
    res.json({ total, new: newOrders, processing, completed });
  } catch (err) {
    next(err);
  }
}
