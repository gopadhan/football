


var Common = {

 MusicOnOffClick: function(imusic){  
    
    if (imusic == false) {
      music.stop();
    }
    else {
      music.play();
    }
    //return imusic ? 1 : 0;
  },
  
   SoundOnOffClick: function(isound){

    if (isound == false) {
      music.stop();
    }
    else {
      music.play();
    }
    //return isound ? 1 : 0;
  }
};

