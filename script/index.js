// CONST LIST
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
//-------------------------------------------------
// FETCH FUNCTION
const fetchQuote = async () => {
  const apiUrl = `${config.api_url}/quote`;
  const res = await fetch(apiUrl);
  const resData = await res.json();
  return resData.data;
};
const fetchVnById = async id => {
  const apiUrl = `${config.api_url}/vn/${id}`;
  const res = await fetch(apiUrl);
  const resData = await res.json();
  return resData.data;
};



//--------------------------------------------------
// LOADER FUNCTION
const randomQuoteLoader = async () => {
  const data = await fetchQuote();
  const vnName = document.getElementById('quote-vn-name');
  const vnQuote = document.getElementById('quote-text');

  vnName.innerHTML = data.title;
  vnQuote.innerHTML = data.quote;
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

const templateVN = id => {
  return new Promise( async (resolve, reject) => {
    try {
      const vnData = await fetchVnById(id);
      let synopsis = vnData.description;
      tagOriginal.forEach((key, index) => {
        synopsis = synopsis.replaceAll(key, tagNew[index]);
      });
      let template = 
      `
      <div class="slide">
              <div class="box-wrapper container-fluid">
                <img src="img/s2-content-bg/gc-b.svg" draggable="false" id="gc-b" alt="">
                <img src="img/s2-content-bg/gc-lt.svg" draggable="false" id="gc-lt" alt="">
                <img src="img/s2-content-bg/box-rb.svg" draggable="false" id="box-rb" alt="">
                <img src="img/s2-content-bg/triangle-lb.svg" draggable="false" id="triangle-lb" alt="">
                <img src="${vnData.image}" class="s2-vn-img" alt="">
                <div class="disc-vn-info">
                  <div class="disc-vn-header">
                    <h1>title</h1>
                  </div>
                  <h2 class="disc-vn-body">${vnData.title}</h2>
                  <div  class="disc-vn-header">
                    <h1>original</h1>
                  </div>
                  <h2 class="disc-vn-body" id="disc-original-title">${vnData.original}</h2>
                  <div class="disc-vn-header">
                    <h1>
                      length
                    </h1>
                  </div>
                  <h2 class="disc-vn-body">${vnData.length}</h2>
                  <div class="disc-vn-header">
                    <h1>release</h1>
                  </div>
                  <h2 class="disc-vn-body">${vnData.released}</h2>
                  <div class="disc-vn-header">
                    <h1 id="disc-vn-info-synopsis-header">synopsis</h1>
                  </div>
                  <h2 class="disc-vn-synopsis">${synopsis}</h2>
                </div>
                <div class="vn-info-nav-btn">
                  <button class="fp-custom-arrow left" onclick="fullpage_api.moveSlideLeft()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#53cef8" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>
                  </button>
                  <button class="fp-custom-arrow right" onclick="fullpage_api.moveSlideRight()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#53cef8" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
      `;
      resolve(template);
    } catch (error) {
      reject(error);
    };
  });
};

const loadDiscover = vnArray => {
  const promises = [];
  console.log(promises);
  vnArray.map(id => {
    promises.push(templateVN(id));
  });
  Promise.all(promises)
    .then(response => {
      response.forEach(template => {
        document.getElementById('discover-section').innerHTML += template;
      });
      console.log('templates loaded');
      loadFullpage();
    });
};

const loadRec = async recData => {
  const id = recData.id;
  const vnData = await fetchVnById(id);
  let synopsis = vnData.description;
  tagOriginal.forEach((key, index) => {
    synopsis = synopsis.replaceAll(key, tagNew[index]);
  });

  document.getElementById('rec-title').innerHTML = vnData.title;
  document.getElementById('rec-title-jp').innerHTML = vnData.original;
  document.getElementById('rec-pic1').src = recData.pic1;
  document.getElementById('rec-vndb-link').innerHTML = `vndb.org/v${id}`;
  document.getElementById('s1-2-bg').src = recData.pic2;
  document.getElementById('s1-2-title').innerHTML = vnData.title;
  document.getElementById('s1-2-title-jp').innerHTML = vnData.original;
  document.getElementById('synopsis-rec').innerHTML = synopsis;
  document.getElementById('s1-3-main').innerHTML = `<iframe width="853" height="480" src="https://www.youtube.com/embed/${recData.op}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`  
};

const loadFullpage = () => {
  new fullpage('#fullpage', {
    navigation: true,
    responsiveWidth: 400,
    anchors: ['recommendation', 'discover', 'music', 'quotes'],
    controlArrows: false,
    sectionsColor: ['#FFF', '#FFF', '#FFF', '#FFF'],
    onLeave: function(origin, destination, direction){
        console.log("Leaving section" + origin.index);
    },
  });
}

//---------------------------------------------------
// INIT FUNCTION
const init = () => {
  loadRec(config.reccomendation);
  musicLoader(config.music);
  loadDiscover(config.new_vn);
  randomQuoteLoader();
};

init();
//------------------------------------------------------
// Fullpage.js Loader
