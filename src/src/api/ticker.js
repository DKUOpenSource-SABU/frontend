import { callAPI } from "./axiosInstance";

export const getTickerDaily = (ticker) =>
  callAPI('/search/ticker/daily?ticker=' + ticker,'GET');

export const getTickerWeekly = (ticker) =>
  callAPI('/search/ticker/weekly?ticker=' + ticker,'GET');

export const getTickerMonthly = (ticker) =>
  callAPI('/search/ticker/monthly?ticker=' + ticker,'GET');

export const getTickerAnnual = (ticker) =>
  callAPI('/search/ticker/annual?ticker=' + ticker,'GET');

export const getTickerMeta = (ticker) =>
  callAPI('/search/ticker/meta?ticker=' + ticker,'GET');

export const getTickerNews = (ticker) =>
  callAPI('/search/ticker/news?ticker=' + ticker,'GET');