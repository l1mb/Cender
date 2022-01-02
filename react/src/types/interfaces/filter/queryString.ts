const handleFirstItem = (src: string, addedValue: string) => {
  const data = (src === "?" ? "" : `&`) + addedValue.toLowerCase();
  return data;
};

const buildString = (
  shape: string,
  orderBy: string,
  ageRating: string,
  from?: string,
  to?: string,
  title: string,
  page?: number
): string => {
  let initQuery = "?";
  initQuery += `page=${page || 1}&`;
  initQuery += `priceFrom=${from || 0}&`;
  initQuery += `priceTo=${to || 999999}&`;
  initQuery += ageRating ? handleFirstItem(initQuery, `rating18=${ageRating}`) : "";
  initQuery += 6 ? handleFirstItem(initQuery, `size=${6}`) : "";
  initQuery += orderBy ? handleFirstItem(initQuery, `sort=${orderBy}`) : "";
  initQuery += title ? handleFirstItem(initQuery, `title=${title}`) : "";
  initQuery += shape ? handleFirstItem(initQuery, `shape=${shape}`) : "";
  return initQuery;
};

export default buildString;
