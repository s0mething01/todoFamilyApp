const getDate = (date) => (date instanceof Date ? date : date.toDate());

export default getDate;
