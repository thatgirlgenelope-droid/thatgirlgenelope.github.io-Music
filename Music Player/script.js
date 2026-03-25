
// declare the variables!!!! (so that javascript knows what they actually are)
    let Progress = document.getElementById("Progress_Bar");
     let Song = document.getElementById("Song");
      let ctrlIcon = document.getElementById("ctrlIcon");
        let Song_Title = document.getElementById("Song_Title");
        let Song_Artist = document.getElementById("Song_Artist");
        let Song_Pic = document.getElementById("Song_Pic");
                let skipCenterIndicator = document.getElementById("skipCenterIndicator");

//  an 'Array' is a list that holds multiple items created with square brackets []

let Songs = [ 
    { title: "Lust",
    artist: "Marino, Alexandria",
    src: "Songs/Music player Project_Songs_Marino_Alexandria_-_Lust_(mp3.pm).mp3.mp3",
    img: "Songs/Lust_Thumbnail edit v3.jpg"
}, 
    {title: "Puppet",
    artist: "John Michael Howell",
    src: "Songs/Music player Project_Songs_John_Michael_Howell_-_Puppet_(mp3.pm).mp3",
    img: "Songs/Puppet_Thumbnail v2.jpg"
},
{ title: "Paro",
    artist: "Nej'",
    src: "Songs/Nej - Paro [Miel Noir].mp3",
    img: "Songs/Paro 600p.jpg",
}
];

let songIndex = 0;

      Song.onloadedmetadata = function() {
        Progress.max = Song.duration;
        Progress.value = Song.currentTime;
      }

      function playPause(){
        // if this CLASS LIST contains 'fa-pause' then pause the song
        if(ctrlIcon.classList.contains("fa-pause")){
            Song.pause();
            // change name of icon from 'fa-pause' to 'fa-play'
            ctrlIcon.classList.remove("fa-pause");
            ctrlIcon.classList.add("fa-play");

        }
        else{
                                                Song.play();
              ctrlIcon.classList.add("fa-pause");
            ctrlIcon.classList.remove("fa-play");
        }
      }

      setInterval(()=>{
            Progress.value = Song.currentTime;
        },500)

    Progress.onchange = function(){
        Song.currentTime = Progress.value;
        Song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }

    function skipForward(){
        Song.currentTime += 5;
        showSkipIndicator("+5");
    }

function skipBackward(){
        Song.currentTime -= 5;
        showSkipIndicator("-5");
    }

function showSkipIndicator(value){
    if(!skipCenterIndicator){
        return;
    }
    skipCenterIndicator.textContent = value;
    skipCenterIndicator.classList.remove("show");
    void skipCenterIndicator.offsetWidth;
    skipCenterIndicator.classList.add("show");
}

    Song.onended = function(){
        // '++' means to add 1 to the current value (if songIndex is 0, songIndex++ makes it 1)
        songIndex++;
        // 'songs.length' is the total number of songs in the array (in this case, 4)
        // '>=' means 'greater than or equal to'
        // if the songIndex becomes 4 (which doesn't exist in the array - arrays go 0, 1, 2, 3), reset it to 0
        // this makes the playlist loop back to the start after the last song
        if(songIndex >= Songs.length){
            songIndex = 0;
        }
        // this gets the new song info from the array (basically goes through the list of songs)
        // 'Songs[songIndex]' gets the current song object from the array
        // 'song.src =' gets the actual audio file and sets it to get the file from the array
      Song.src = Songs[songIndex].src;
    //   change the display song title + artist name + song picture to the new song title, artist name, etc from the array
        Song_Title.innerText = Songs[songIndex].title;
        Song_Artist.innerText = Songs[songIndex].artist;
        Song_Pic.src = Songs[songIndex].img;
        Song.play();
    }
    // in summary: When a song ends → move to next song number → if too high, 
    // loop back → load all the new song's info → press play!