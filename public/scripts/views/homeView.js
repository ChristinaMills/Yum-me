var app = app || {};

(function (module) {

  let homeView = {};
    
  homeView.centerpieceTemplate = Handlebars.compile($('#centerpiece-template').text());
  homeView.$centerpiece = $('#centerpiece');
  homeView.$playPauseBtn = $('#play-pause-button');

  homeView.history = [];
  homeView.historyPosition = -1;
  homeView.interval = null;

  homeView.init = function() {
    homeView.display();
  };
// app.Biz.all[0].imgUrls[0]

  homeView.display = function () {
    let $altView = $('#altView');
    $altView.attr('href', '/grid');
    $altView.text('Grid');
    
    $('#home').show().siblings().hide();
    homeView.slideShow();
  }

  homeView.slideShow = function() {
    
    function render() {
      
      let currentBiz = app.Biz.all[Math.floor(Math.random() * app.userSettings.maxNumBiz)];
      
      let currentImg = currentBiz.imgUrls[0];
      
      let bizDisplay = {
        Img: currentImg,
        YelpUrl: currentBiz.yelpUrl,
        name: currentBiz.name,
        distance: currentBiz.distance
      }
      // TODO: prevent showing from recent homeView.history
      homeView.history.push(bizDisplay);
      homeView.historyPosition = homeView.history.length - 1;
      // [Math.floor(Math.random() * currentBiz.imgUrls.length)];
      console.table(homeView.history);
      console.log(homeView.historyPosition);

      // function initMap() {
      //   var uluru = {lat: 45.22 , lng: -122.567};//lat long current 
      //   var map = new google.maps.Map(document.getElementById('map'), {
      //     zoom: 4,
      //     center: uluru
      //   });
      //   console.log("uluru", uluru);
      //   var marker = new google.maps.Marker({
      //     position: uluru,
      //     map: map
      //   });
      // }
      
      homeView.initMap();
      homeView.$centerpiece.empty().append(homeView.centerpieceTemplate(bizDisplay));
      
      

    }
    
    clearInterval(app.homeView.interval);
    render();
    homeView.interval = setInterval(render, app.userSettings.slideshowInterval);
  };

  homeView.renderSelect = function(index) {
    homeView.$centerpiece.empty().append(homeView.centerpieceTemplate(homeView.history[index]));
    console.table(homeView.history);
    console.log(homeView.historyPosition);
  };

  homeView.showPlayButton = function(isOn) {
    switch(isOn) {
      case false:
        homeView.$playPauseBtn.attr('name', 'pause-button')
        homeView.$playPauseBtn.find('h1').text('||');
        break;
      case true:
        homeView.$playPauseBtn.attr('name', 'play-button')
        homeView.$playPauseBtn.find('h1').text('|>');
        break;
      default:
        console.log('in homeView; play/pause switch:default');
    }
  }

  homeView.initMap = function () {
    

    console.log('running init MAP***')
    var mapEle = $('googleMapScript')
    var mapUrl= "https://maps.googleapis.com/maps/api/js?key=AIzaSyAbe6TOoV-iKlX4DIUfhu-Cs5omGDJZIA0&callback=homeView.initMap"  
    mapEle.src = mapUrl;
    var myOptions = {
      center: {lat: 45.222, lng: -122.666},
      zoom: 4
    };

    var map = new google.maps.Map(document.getElementById('map'), myOptions);

    var marker = new google.maps.Marker({
      position: {lat: 45.222, lng: -122.666}, 
      map: map, 
    });
    
  
  }
  

  module.homeView = homeView;

})(app);