import { mockCategories, mockProducts } from './mockData';

export function getTopLevelCategories() {
  return mockCategories.filter((c) => c.parentSlug === null);
}

export function getSubcategories(parentSlug) {
  return mockCategories.filter((c) => c.parentSlug === parentSlug);
}

export function getCategoryBySlug(slug) {
  return mockCategories.find((c) => c.slug === slug) || null;
}

export function isLeafCategory(slug) {
  return getSubcategories(slug).length === 0;
}

export function getAllDescendantSlugs(slug) {
  const children = getSubcategories(slug);
  if (children.length === 0) return [slug];
  const childSlugs = children.flatMap((c) => getAllDescendantSlugs(c.slug));
  return [slug, ...childSlugs];
}

export function getProductsByCategory(slug) {
  const direct = mockProducts.filter((p) => p.categorySlug === slug);
  if (direct.length > 0) return direct;

  const children = getSubcategories(slug);
  if (children.length === 0) return [];

  const descendantSlugs = getAllDescendantSlugs(slug);
  return mockProducts.filter((p) => descendantSlugs.includes(p.categorySlug));
}

export function getBreadcrumbs(slug) {
  const crumbs = [{ label: 'Home', href: '/' }];
  const category = getCategoryBySlug(slug);
  if (!category) return crumbs;

  const chain = [];
  let current = category;
  while (current) {
    chain.unshift(current);
    current = current.parentSlug ? getCategoryBySlug(current.parentSlug) : null;
  }

  chain.forEach((cat, index) => {
    const isLast = index === chain.length - 1;
    crumbs.push({
      label: cat.name,
      href: isLast ? null : `/category/${cat.slug}`,
    });
  });

  return crumbs;
}

export function filterAndSortProducts(products, { sortBy, inStockOnly, maxPrice, minPrice } = {}) {
  let result = [...products];

  if (inStockOnly) {
    result = result.filter((p) => p.stockStatus !== 'outOfStock');
  }

  if (minPrice !== undefined && minPrice > 0) {
    result = result.filter((p) => (p.salePrice || p.price) >= minPrice);
  }

  if (maxPrice !== undefined && maxPrice > 0) {
    result = result.filter((p) => (p.salePrice || p.price) <= maxPrice);
  }

  switch (sortBy) {
    case 'price-asc':
      result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
      break;
    case 'price-desc':
      result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
      break;
    case 'rating':
      result.sort((a, b) => b.avgRating - a.avgRating);
      break;
    case 'newest':
    default:
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      break;
  }

  return result;
}
