exports.filterOffers = (offers, maxBudget) => {
  const filtered = offers.filter(o => o.bid_value <= maxBudget);
  return filtered.length > 0 ? filtered : null;
};