const config =
{
  api_url: 'http://localhost',
  port: 3000,
};

//-------------------------------------------------

const fetchQuote = async () => {
  const apiUrl = `${config.api_url}:${config.port}/quote`;
  const res = await fetch(apiUrl);
  const resData = await res.json();
  return resData.data;
};
const randomQuoteLoader = async () => {
  const data = await fetchQuote();
  document.getElementById('quote-vn-name').innerHTML = data.title;
  document.getElementById('quote-text').innerHTML = data.quote;
};

randomQuoteLoader();