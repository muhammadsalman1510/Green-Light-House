const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export function productInquiryLink(product) {
  const message =
    `Hi! I'm interested in ${product.name} ` +
    `(Ref: ${product.sku || product._id}). ` +
    `Please confirm availability and delivery details.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productQuestionLink(product) {
  const message =
    `Hi! I have a question about ${product.name} ` +
    `(Ref: ${product.sku || product._id}).`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function orderLink({ customer, items, total }) {
  const itemLines = items
    .map(
      (item) =>
        `• ${item.name} ×${item.qty} — PKR ${(
          (item.salePrice || item.price) * item.qty
        ).toLocaleString('en-PK')}`
    )
    .join('\n');

  const message =
    `*New Order — Green Light House*\n\n` +
    `*Customer:* ${customer.name}\n` +
    `*Phone:* ${customer.phone}\n` +
    `*City:* ${customer.city}\n` +
    `*Instructions:* ${customer.notes || 'None'}\n\n` +
    `*Items:*\n${itemLines}\n\n` +
    `*Total: PKR ${total.toLocaleString('en-PK')}*\n\n` +
    `Order placed via greenlighthouse.pk`;

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
