new fullpage('#fullpage', {
  navigation: true,
  responsiveWidth: 700,
  anchors: ['reccomendation', 'about-us', 'contact'],
  parallax: true,
  controlArrows: false,
  sectionsColor: ['#FFF', '#FFF', '#FFF', '#FFF'],
  onLeave: function(origin, destination, direction){
      console.log("Leaving section" + origin.index);
  },
});

