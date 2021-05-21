const tagOriginal = [
  '[SPOILER]',
  '[/SPOILER]',
  '[URL=',
  '[url=',
  '/]',
  '[/url]',
  '[/URL]'
];
const tagNew = [
  '<spoiler>',
  '</spoiler>',
  '<a id="synopsis-link" target="_blank"href="',
  '<a id="synopsis-link" target="_blank"href="',
  '">',
  '</a>',
  '</a>',
];

const getQueryString = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('id');
};

const fetchVnById = async id => {
  const apiUrl = `${config.api_url}/vn/${id}`;
  const res = await fetch(apiUrl);
  const resData = await res.json();
  return resData.data;
};

const loadVnData = async id => {
  const vnData = await fetchVnById(id);
  let synopsis = vnData.description;
  tagOriginal.forEach((key, index) => {
    synopsis = synopsis.replaceAll(key, tagNew[index]);
  });

  document.getElementById('tab-title').innerHTML = `${vnData.title} - VN Corner`
  document.getElementById('details-img').src = vnData.image;
  document.getElementById('title').innerHTML = vnData.title;
  document.getElementById('ori-title').innerHTML = vnData.original;
  document.getElementById('aliases').innerHTML = vnData.aliases;
  document.getElementById('released').innerHTML = vnData.released;
  document.getElementById('length').innerHTML = vnData.length;
  document.getElementById('synopsis').innerHTML = synopsis;
};

loadVnData(getQueryString());