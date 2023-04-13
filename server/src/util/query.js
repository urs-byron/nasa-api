const PAGE_DEFAULT = 1;
const LIMIT_DEFAULT = 0;

function getPageSkip(query) {
  const page = isNaN(+query.page) ? PAGE_DEFAULT : Math.abs(+query.page);
  const limit = isNaN(+query.limit) ? LIMIT_DEFAULT : Math.abs(+query.limit);

  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

module.exports = { getPageSkip };
