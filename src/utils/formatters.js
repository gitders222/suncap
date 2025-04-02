/**
 * Format a number as Norwegian currency (NOK)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (amount) => {
  return new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency: 'NOK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format a date in Norwegian format
 * @param {string|Date} date - The date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('nb-NO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

/**
 * Convert a string to slug format
 * @param {string} text - The text to convert to slug
 * @returns {string} Slugified text
 */
export const toSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[æ]/g, 'ae')
    .replace(/[å]/g, 'aa')
    .replace(/[ø]/g, 'oe')
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

/**
 * Truncate text to a specified length and add ellipsis
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};