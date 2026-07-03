export function errorHandler(err, req, res, next) {
  console.error('[GLH Error]', err.message);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(400).json({
      message: `A record with this ${field} already exists.`,
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format.' });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error.',
  });
}
