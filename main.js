
function init(event) {
    // Volume settings
    var volumeOff = .2;
    var volumeOn = 1;

    // Globals (ouch!)
    var partLabels = ["Sopraan", "Alt", "Tenor", "Bas"];




    // THIS IS ALL THERE IS TO IT: just add a generateSong()
    // naming convention is important, though:
    //  songName_Music.mp3
    //  songname_Sopraan.mp3
    //  songName_Alt.mp3
    //  songName_Tenor.mp3
    //  songName_Bas.mp3

    generateSong( "laudateOmnesGentes" );
    generateSong( "misericordiasDomini" );






    function generateSong( songName ){
        var myDiv = document.getElementById("myDiv");
        var hSong;
        var str1;
        var lab1;
        var blank = document.createElement( "br" );

            /* ***************************************** */
            /* Generate Music audio object with controls */
            /* ***************************************** */
        hSong = new Audio();
        str1 = songName.concat( "_Music.mp3" );
        hSong.src = str1;
        hSong.id = songName;
        hSong.controls = true;
        hSong.volume = .9;
        lab1 = document.createElement( 'label' );
        lab1.htmlFor = "id";
        lab1.appendChild( document.createTextNode( songName ));
        myDiv.appendChild( lab1 );
        myDiv.appendChild( hSong );

            /* ****************************************** */
            /* Generate Vocal audio objects (no controls) */
            /* ****************************************** */
            // id=songName_partLabel
        var audio1;
        for( c1 = 0; c1 < 4; c1++ ){
            audio1 = new Audio();
            str1 = songName.concat( "_", partLabels[c1], ".mp3" );
            audio1.src = str1;
            audio1.id = songName.concat( "_", partLabels[c1] );
            audio1.controls = false;
            audio1.name = "vocal";
            myDiv.appendChild( audio1 );
        }

            /* ***************************** */
            /* Link vocals playback to music */
            /* ***************************** */
        hSong.addEventListener( "play", function(){cb_play( songName )} );
        hSong.addEventListener( "pause", function(){cb_pause( songName )} );
        hSong.addEventListener( "seeked", function(){cb_seeked( songName )} );


            /* ************************************************* */
            /* Generate checkboxes name=songName_partLabel_check */
            /* ************************************************* */
        for( c1 = 0; c1 < 4; c1++ ){
            // Checkbox
            var ch1 = document.createElement( 'input' );
            ch1.type = "checkbox";
            ch1.name = songName.concat( "_", partLabels[c1], "_check" );
            ch1.value = false;

            // Label
            lab1 = document.createElement( 'label' );
            lab1.htmlFor = "id";
            lab1.appendChild( document.createTextNode( partLabels[c1] ));

            myDiv.appendChild( ch1 );
            myDiv.appendChild( lab1 );
        }
        myDiv.appendChild( blank );

    }

    // Callback for change in (any) checkbox
    function cb_checkbox() {
        // Get list of all checkboxes
        var hListCheck = document.querySelectorAll( 'input[name$="check"]' );

        for( var h1 of hListCheck ){
            // Get corresponding audio handle
            var strList = h1.name.split( "_" );
            songName = strList[0];
            lab1 = strList[1];
            var hAudio = document.getElementById( songName.concat( "_", lab1 ));

            // Set volume
            if( h1.checked == true ){
                hAudio.volume = volumeOn;
            }
            else{
                hAudio.volume = volumeOff;
            }
        }
    }

    function cb_play( songName ){
        var c1;
        for( c1 = 0; c1 < 4; c1++ ){
            var id1 = songName.concat( "_", partLabels[c1] );
            var h1 = document.getElementById( id1 );
            h1.play();
        }
    }
    function cb_pause( songName ){
        var c1;
        for( c1 = 0; c1 < 4; c1++ ){
            var id1 = songName.concat( "_", partLabels[c1] );
            var h1 = document.getElementById( id1 );
            h1.pause();
        }
    }
    function cb_seeked( songName ){
        var t1 = document.getElementById( songName ).currentTime;
        var c1;
        for( c1 = 0; c1 < 4; c1++ ){
            var id1 = songName.concat( "_", partLabels[c1] );
            var h1 = document.getElementById( id1 );
            h1.currentTime = t1;
        }
    }


        /* *************** */
        /* Some More Stuff */
        /* *************** */
    // Set initial volumes
    cb_checkbox();

    // Set callback for all checkboxes (with name "checkme")
    var hList = document.querySelectorAll( 'input[name$="check"]' );
    for( var h1 of hList ){
        h1.addEventListener( "change", cb_checkbox );
    }
}

// Load function when DOM is loaded
window.addEventListener("DOMContentLoaded", init);