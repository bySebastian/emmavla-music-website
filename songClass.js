class Song {
    partLabels = ["Sopraan", "Alt", "Tenor", "Bas", "Full"];
    songName;
    hSong;              // music player
    hCheck;             // checkbox for each vocal (inc full)
    hVocal;             // vocals (inc full)

    playing = false;
//    myDiv = document.getElementById( "myDiv" );

    constructor( songName, volumeMusic, volumeOn, volumeOff, dir1 ) {
        let self = this;    // self refers to instantiation of Song
        var blank = document.createElement( "br" ); // var, not let!!!

        self.songName = songName;
        self.volumeOn = volumeOn;
        self.volumeOff = volumeOff;
        self.volumeMusic = volumeMusic;

            /* ******************************************* */
            /* Generate Music Audio Object (with controls) */
            /* ******************************************* */
        self.hSong = new Audio();
        let str1 = songName.concat( "_Music.mp3" );
        self.hSong.src = dir1.concat( str1 );
        self.hSong.id = songName.concat( "_Music" );
        self.hSong.controls = true;
        self.hSong.volume = volumeMusic;

        self.hVocal = [];
        self.hCheck = [];
        for( let c1 = 0; c1 < self.partLabels.length; c1++ ) {
            /* ****************************************** */
            /* Generate Vocal Audio Objects (no controls) */
            /* ****************************************** */
            // id=songName_partLabel
            let hAudio2 = new Audio();
            str1 = songName.concat( "_", self.partLabels[c1], ".mp3" );
            hAudio2.src = dir1.concat( str1 );
            hAudio2.addEventListener( "error", function() {self.cb_disableCheckbox( c1 )} );
            hAudio2.id = songName.concat( "_", self.partLabels[c1] );
            hAudio2.controls = false;
            hAudio2.preload = true;
            myDiv.appendChild( hAudio2 );
            if( self.partLabels[c1] != "Full" ) {
                hAudio2.volume = self.volumeOff;
            }
            else {
                hAudio2.volume = .0;
            }
            self.hVocal.push( hAudio2 );


            /* ******************* */
            /* Generate Checkboxes */
            /* ******************* */
            // Checkbox
            let hCheck = document.createElement( 'input' );
            hCheck.type = "checkbox";
            hCheck.id = songName.concat( "_", self.partLabels[c1], "_check" );
            hCheck.value = false;

            let str2 = self.partLabels[c1];  // scope of cb input argument needs to be local!!!
            hCheck.addEventListener( "change", function() {self.cb_checkbox( c1 )} );
            self.hCheck.push( hCheck );

            // Label (we could do this is in the main scipt)
            let lab1 = document.createElement( 'label' );
            lab1.htmlFor = "id";
            lab1.appendChild( document.createTextNode( self.partLabels[c1] ));

            // Add checkbox and label to div
            myDiv.appendChild( hCheck );
            myDiv.appendChild( lab1 );
        }
        // Add player contrl to div
        myDiv.appendChild( self.hSong );

        // Add song label to div (we could do this in the main script)
        let lab1 = document.createElement( 'label' );
        lab1.htmlFor = "id";
        lab1.appendChild( document.createTextNode( songName ));
        myDiv.appendChild( lab1 );
        myDiv.appendChild( blank );

            /* ***************************** */
            /* Link vocals playback to music */
            /* ***************************** */
        self.hSong.addEventListener( "play", function() {self.cb_play()} );
        self.hSong.addEventListener( "pause", function() {self.cb_pause()} );
        self.hSong.addEventListener( "seeked", function() {self.cb_seeked()} );
        self.hSong.addEventListener( "ended", function() {self.cb_ended()} );
    }

    // Getter
    get songName() {
        return self.songName;
    }

    // Callbacks
    cb_play() {
        let self = this;
        let t1 = self.hSong.currentTime;

        for( let c1 = 0; c1 < this.partLabels.length; c1++ ) {
            if( self.hCheck[c1].disabled == false ) {   // Check availability
                self.hVocal[c1].currentTime = t1;
                self.hVocal[c1].play();
            }
        }
        self.hSong.currentTime = t1;
        self.playing = true;
    }
    cb_pause() {
        let self = this;
        let t1 = self.hSong.currentTime;
        for( let c1 = 0; c1 < this.partLabels.length; c1++ ) {
            self.hVocal[c1].currentTime = t1;
            self.hVocal[c1].pause();
        }
    }
    cb_seeked() {
        let self = this;
        let t1 = self.hSong.currentTime;
        for( let c1 = 0; c1 < this.partLabels.length; c1++ ) {
            self.hVocal[c1].currentTime = t1;
        }
    }
    cb_ended() {
        let self = this;
        self.playing = false;
    }

    cb_disableCheckbox( ind1 ) {
        let self = this;
        this.hCheck[ind1].disabled = true;
    }

    // Callback for change in (any) checkbox
    cb_checkbox( ind1 ) {
        let self = this;
        let nParts = self.partLabels.length;
        let indFull = nParts - 1;

        // Set volume
        if( ind1 != nParts - 1 ) {  // Vocal checkbox
            // Uncheck and mute Full (if selected)
            if( self.hCheck[indFull].checked == true ) {
                self.hCheck[indFull].checked = false;

                // Mute Full
                self.hVocal[indFull].volume = .0;

                // Restore Music
                self.hSong.volume = self.volumeMusic;
                for( let c1 = 0; c1 < ( nParts - 1 ); c1++ ) {
                    self.hVocal[c1].volume = self.volumeOff;
                }
            }

            // Set volume of Vocal
            if( self.hCheck[ind1].checked == true ) {
                self.hVocal[ind1].volume = self.volumeOn;
            }
            else {
                self.hVocal[ind1].volume = self.volumeOff;
            }
        }
        else {                      // Full checkbox
            if( self.hCheck[ind1].checked == true ) {
                self.hVocal[indFull].volume = 1.0;

                // Mute all others
                self.hSong.volume = .0;
                for( let c1 = 0; c1 < ( self.partLabels.length - 1 ); c1++ ) {
                    self.hVocal[c1].volume = .0;
                }

                // Uncheck checkboxes
                for( let c1 = 0; c1 < ( self.partLabels.length - 1 ); c1++ ) {
                    self.hCheck[c1].checked = false;
                }
            }
            else {
                console.log( "full unchecked" )
                // Mute full
                self.hVocal[indFull].volume = .0;

                // Play Music
                self.hSong.volume = self.volumeMusic;

                // PLay Vocals
                for( let c1 = 0; c1 < ( self.partLabels.length - 1 ); c1++ ) {
                    self.hVocal[c1].volume = self.volumeOff;
                }

            }
        }
    }

}
