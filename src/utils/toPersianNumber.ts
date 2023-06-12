const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

export function persianNumberWithCommas(n: string) {
  const numberWithComma = numberWithCommas(n);
  const persianNumber = ToPersianNumber(numberWithComma);
  return persianNumber;
}

export function numberWithCommas(n: string) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function ToPersianNumber(n: string) {
  return n.toString().replace(/\d/g, (d) => persianNumbers[parseInt(d)]);
}
