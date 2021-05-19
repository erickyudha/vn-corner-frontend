// Config File -- EDIT HERE! --
const config =
{
  api_url: 'https://vncorner.herokuapp.com',
  music: ['DAvUseXorzU', 'rUL35Lge1ds'],
};
/*
Config Notes:
api-url = Backend URL, make sure there is no '/' at the end
music = list for adding music slides, to add more just add
  more youtube video id, example:
  https://www.youtube.com/watch?v={THIS IS YOUTUBE VIDEO ID}

*/
//-------------------------------------------------
// FUNCTION
const fetchQuote = async () => {
  const apiUrl = `${config.api_url}/quote`;
  const res = await fetch(apiUrl);
  const resData = await res.json();
  return resData.data;
};
const randomQuoteLoader = async () => {
  const data = await fetchQuote();
  document.getElementById('quote-vn-name').innerHTML = data.title;
  document.getElementById('quote-text').innerHTML = data.quote;
};
const musicLoader = musicArray => {
  musicArray.forEach(music => {
    let musicTemplate = 
    `
    <div class="slide">
          <div class="container-fluid box-wrapper">
            <img src="img/msc-bg-cg.svg" draggable="false" id="msc-bg-cg" alt="">
            <h1 id="kanji-music">音楽</h1>
            <div id="music-line"></div>
            <h1 id="text-music">MUSIC</h1>
            <iframe class="music-frame" width="876" height="405" src="https://www.youtube.com/embed/${music}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <div class="music-nav-btn">
              <button class="fp-custom-arrow left" onclick="fullpage_api.moveSlideLeft()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7f629e" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                </svg>
              </button>
              <button class="fp-custom-arrow right" onclick="fullpage_api.moveSlideRight()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7f629e" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
    `;
    document.getElementById('music-section').innerHTML += musicTemplate;
  });
};





//---------------------------------------------------
// INIT FUNCTION
const init = () => {
  musicLoader(config.music);
  randomQuoteLoader();
};

init();
