
function init(event) {
    // Volume settings
    let volumeOff = .2;
    let volumeOn = 1;
    let volumeMusic = .9;

    let dir1 = '../emmaPlayer/'

    var blank = document.createElement( "br" );

    // THIS IS ALL THERE IS TO IT: just add a title to the songList
    // naming convention of audio files is important, though:
    //  songName_Music.mp3
    //  songname_Sopraan.mp3
    //  songName_Alt.mp3
    //  songName_Tenor.mp3
    //  songName_Bas.mp3
    let songList = ["JezusUDieHeeftBeloofd",
        "LaudateOmnesGentes",
        "MisericordiasDomini",
        "HeerUBentMijnLeven",
        "KomOntvangDeHeer",
        "Maranatha",
        "OMoederVanDeHeer",
        "OnderUwGespreideMantel",
        "OnzeVader_RimskyKorsakow",
        "ZingtVoorDeHeer"];

    myDiv = document.getElementById( "myDiv" );
    for( songName of songList ) {
        let song1 = new Song( songName, volumeMusic, volumeOn, volumeOff, dir1 );
        //    console.log( songName );
    }


}

// Load function when DOM is loaded
window.addEventListener("DOMContentLoaded", init);
