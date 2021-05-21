const getQueryString = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get('name');
};

const fetchVnByName = async name => {
  const apiUrl = `${config.api_url}/vn/search/${name}`;
  const res = await fetch(apiUrl);
  const resData = await res.json();
  return resData.data;
};

const loadSearchResult = async name => {
  document.getElementById('search-name').innerHTML = name;
  try {
    const searchData = await fetchVnByName(name);
    console.log(searchData);
    let template = "";
    searchData.forEach(vn => {
      template = 
      `<li class="col-6 col-sm-3 card bg-dark text-white">
      <a href="details.html?id=${vn.id}">
        <img src="${vn.image}" class="card-img" alt="">
        <div class="card-img-overlay">
          <h5 class="card-title">${vn.title}</h5>
        </div>
      </a>
      </li>`;
      console.log(template);
      document.getElementById('search-content').innerHTML += template;
    });
  } catch (error) {
    console.log(error);
    document.getElementById('search-content').innerHTML += '<h2>No results for your search</h2>'
  };
};

loadSearchResult(getQueryString());