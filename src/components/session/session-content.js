import React from 'react';
import { View } from 'react-native';
import { Button,
    Card,
    CardItem,
    Form,
    Icon,
    Text,
    Textarea,
    
} from 'native-base';
import axios from 'axios';

import { Asset, Audio, FileSystem, Font, Video, Permissions, Sound} from 'expo';
import {RECORDING_OPTIONS_SET_HIGH_QUALITY, Base64} from './config';

class SessionContent extends React.Component {
    render() {

        let { isRecording, isRecordingDone } = this.state;
        return (
            <Card 
              style={{height: '50%'}}>
                <CardItem>
                    {
                        !isRecording && !isRecordingDone ?
                        <Button
                            onPress={() => this._onRecordPressed()}
                            type="primary"
                            >
                            <Icon name="md-mic" />
                            <Text> Start Consultation </Text>
                        </Button>   
                        :
                        isRecording &&  !isRecordingDone?
                        <View style={{flexDirection: 'column'}}>
                            <Button
                                onPress={() => this._onRecordPressed()}
                                type="primary">
                                    <Text>Stop consultation</Text>
                                
                            </Button>
                            <Text 
                                note
                                style={{paddingLeft: 4}}
                            >
                                {this._getRecordingTimestamp()}
                            </Text>
                        </View>

                        :
                        <View style={{flexDirection: 'column'}} >
                            <Text style={{fontSize: 16, paddingBottom: 4}}>
                                Consultation completed
                            </Text>

                            <Text 
                                note
                                style={{paddingLeft: 4}}>

                                {this._getRecordingTimestamp()}
                            </Text>
                        </View>
                    }

                    
                </CardItem>

                {/* <CardItem>
                    <Button 
                        onPress={() => this.onPlayPausePressed()}
                        >
                        <Text>Play</Text>
                    </Button>

                    <Button onPress={() => this._onStopPressed()}>
                        <Text>Stop</Text>
                    </Button>

                    <Text>
                        Playback timestamp : 
                        {this._getPlaybackTimestamp()}
                    </Text>
                </CardItem> */}

                <CardItem>
                    <Form>
                        <Textarea 
                            rowSpan={5} 
                            value={this.state.diagnosisText}
                            style={{width: '100%', minWidth: '100%'}}
                            placeholder="Start Consultation to start automatic text input" 
                        />
                    </Form>
                </CardItem>
            </Card>
        )
    }

    constructor(props) {
        super(props);
        this.recording = null;
        this.sound = null;
        this.isSeeking = false;
        this.shouldPlayAtEndOfSeek = false;
        this.state = {
            haveRecordingPermissions: false,
            isLoading: false,
            isPlaybackAllowed: false,
            isRecordingDone: false,
            muted: false,
            soundPosition: null,
            soundDuration: null,
            recordingDuration: null,
            shouldPlay: false,
            isPlaying: false,
            isRecording: false,
            fontLoaded: false,
            shouldCorrectPitch: true,
            volume: 1.0,
            rate: 1.0,
            patient: this.props.patient,
            diagnosisText: ''
        }
    }

    componentDidMount() {
        console.log("WORKING...")
        Audio.setIsEnabledAsync(true);
        Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentLockedModeIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });
        this._askForAudioPermission();
    }

    activateFakeResponse = () => {
        let words = [
            'fever \n',
            'cough for four days\n',
            'fever lasted for a week \n'
        ]
        let _words = '';
        
        setTimeout(() => {
            _words = _words + words[0] + '';
            this.setState({
                diagnosisText: _words
            })
        },2000)

        setTimeout(() => {
            _words = _words + words[1] + '';
            this.setState({
                diagnosisText: _words
            })
        },4000)
        setTimeout(() => {
            _words = _words + words[2] + '';
            this.setState({
                diagnosisText: _words
            })
        },6000)
        
    }

    _askForAudioPermission = async () => {
    const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({
        haveRecordingPermissions: response.status === 'granted',
    });
    console.log("PERMISSION:", JSON.stringify(this.state.haveRecordingPermissions));
    };

    _getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);
    
        const padWithZero = number => {
          const string = number.toString();
          if (number < 10) {
            return '0' + string;
          }
          return string;
        };
        return padWithZero(minutes) + ':' + padWithZero(seconds);
    }
    

    _getPlaybackTimestamp() {
        console.log("this.sound = " , this.sound)
        if (
          this.sound != null &&
          this.state.soundPosition != null &&
          this.state.soundDuration != null
        ) {
          return `${this._getMMSSFromMillis(this.state.soundPosition)} / ${this._getMMSSFromMillis(this.state.soundDuration)}`;
        }
        return '';
      }
    
    _getRecordingTimestamp() {
        if (this.state.recordingDuration != null) {
          return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
        }
        return `${this._getMMSSFromMillis(0)}`;
    }

    onPlayPausePressed = () => {
        if (this.sound != null) {
            if (this.state.isPlaying) {
                this.sound.pauseAsync();
                console.log("PAUSED");
            } else {
                this.sound.playAsync();
                console.log("PAUSE..PLAYED");
            }
        }
    }

    _onStopPressed = () => {
        if (this.sound != null) {
          this.sound.stopAsync();
        }
      };

    _onRecordPressed = () => {
        
        console.log("RECORD PRESSED");
        if (this.state.isRecording) {
          console.log("IS RECORDING STATE", this.state.isRecording);
          this._stopRecordingAndEnablePlayback();
        } else {
          console.log("IS RECORDING STATE", this.state.isRecording);
          this._stopPlaybackAndBeginRecording();
        //   this.activateFakeResponse()
        }
    };

    _startRecording = async () => {
        let recording = new Audio.Recording();
        console.log('eeeeexpo : ' , RECORDING_OPTIONS_SET_HIGH_QUALITY)
        console.log('eexpo 1 : ' , Expo.Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY)
        // await recording.prepareToRecordAsync(Expo.Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recording.prepareToRecordAsync(RECORDING_OPTIONS_SET_HIGH_QUALITY);
            
        recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);


        recording.startAsync();
        setTimeout(() => {

            if(this.state.isRecording) {
                this._sendAudioInIntervals(recording)
                .then( res => {
                    console.log('res = ' , res)

                    //if success, call _startRecording again
                })
            }


        }, 3000 )
    }

    _sendAudioInIntervals = async (recording) => {
        await recording.stopAndUnloadAsync();

        //call _record and send audio in intervals
        let uri = recording.getURI();
        // let { sound, status } = await this.recording.createNewLoadedSound(
        //     {
        //         progressUpdateIntervalMillis: 500,
        //         positionMillis: 0,
        //         shouldPlay: false,
        //         rate: 1.0,
        //         shouldCorrectPitch: false,
        //         volume: 1.0,
        //         isMuted: false,
        //         isLooping: false,
        //       }
        // )

        console.log("called")

        setTimeout(() => {
            this.uploadAudioAsync(uri)
        }, 100)
        // .then( res => console.log('any res = ' , res))
        // .catch( err => console.log("error getting response " , err))
        // .then( res => {
        //     console.log('res send api =',  res.data)

        //     //if Success, call _startRecording again
        // })
        // .catch( err => console.log("send api error" , err))

        return true;
    }
    
    _stopPlaybackAndBeginRecording = async () => {
        console.log("STOPPED PLAYBACK AND STARTING TO RECORD...");
        this.setState({
            isLoading: true,
        });
        if (this.sound !== null) {
            await this.sound.unloadAsync();
            this.sound.setOnPlaybackStatusUpdate(null);
            this.sound = null;
        }
        if (this.recording !== null) {
            this.recording.setOnRecordingStatusUpdate(null);
            this.recording = null;
        }

        const recording = new Audio.Recording();
        console.log("RECORDING", recording);
        this._startRecording();
        // await recording.prepareToRecordAsync(Expo.Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        // recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

        // this.recording = recording;
        // await this.recording.startAsync(); // Will call callback to update the screen.
        this.setState({
            isLoading: false,
        });
    }

    _stopRecordingAndEnablePlayback = async () => {
        console.log("STOPPED RECORDING AND ENABLING PLAYBACK");
        this.setState({
            isLoading: true,
            isRecordingDone: true
        });
        await this.recording.stopAndUnloadAsync();
        let uri = this.recording.getURI();
        console.log("new uri  = " , uri)
        const { sound, status } = await this.recording.createNewLoadedSound(
            {
            isLooping: true,
            isMuted: this.state.muted,
            volume: this.state.volume,
            rate: this.state.rate,
            shouldCorrectPitch: this.state.shouldCorrectPitch,
            },
            this._updateScreenForSoundStatus
        );
        console.log()
        console.log("SOUND AND STATUS", sound, status);
        this.sound = sound;
        this.setState({
            isLoading: false,
        });
    }

    _updateScreenForSoundStatus = (status) => {
        console.log("UPDATING SCREEN FOR SOUND STATUS", status);
        if (status.isLoaded) {
          this.setState({
            soundDuration: status.durationMillis,
            soundPosition: status.positionMillis,
            shouldPlay: status.shouldPlay,
            isPlaying: status.isPlaying,
            rate: status.rate,
            muted: status.isMuted,
            volume: status.volume,
            shouldCorrectPitch: status.shouldCorrectPitch,
            isPlaybackAllowed: true,
          });
        } else {
          this.setState({
            soundDuration: null,
            soundPosition: null,
            isPlaybackAllowed: false,
          });
          if (status.error) {
            Alert(`FATAL PLAYER ERROR: ${status.error}`);
          }
        }
      };

    _updateScreenForRecordingStatus = (status) => {
        console.log("UPDATING SCREEN FOR RECORDING STATUS", status);
        if (status.canRecord) {
          this.setState({
            isRecording: status.isRecording,
            recordingDuration: status.durationMillis,
          });
        } else if (status.isDoneRecording) {
          this.setState({
            isRecording: false,
            recordingDuration: status.durationMillis,
          });
        }
    };

    getBase64 = (img, callback) => {
        console.log("ran base 64")
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);

        console.log('data = ' , reader.readAsDataURL(img))
    }

    getData = (audioFile, callback) => {
        let reader = new FileReader();
        reader.onload = function(event) {
            let data = event.target.result.split(','),
            decodedImageData = Base64.btoa(data[1]);
            // console.log('any decoded image data = "  ' , decodedImageData)
            callback(decodedImageData);
        }

        // console.log("uri or audio file = " , audioFile)
        reader.readAsDataURL(audioFile);
    }

    test = (uri) => {
        // FileSystem.readAsStringAsync(uri)
        // .then( res => console.log('neww file = ' , res))


        // FileSystem.getInfoAsync(uri, data => )
        console.log('btoa = ' , Base64.btoa(uri))
        return Base64.btoa(uri);
            // .then( res => console.log('info ' = res) )
        // console.log("new file = " , newFile)
    }

    uploadAudioAsync = async (uri) => {
        console.log("Uploading " + uri);
        console.log('type of ' , typeof uri)
        // let apiUrl = 'https://8gpu2xeyl7.execute-api.ap-southeast-1.amazonaws.com/api/v1/submit-audio-all-types';
        let apiUrl = 'http://api.teezee.sg:8080/api/cart/orbital';
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
      
        let formData = new FormData();
        formData.append('file', {
          uri,
          name: `recording.${fileType}`,
          type: `audio/x-${fileType}`,
        });

        let source = uri;
        let data = this.getData(uri);
        console.log('data = ' , data)

        const base64Audio = this.test( data )

        // .then( res => console.log('neww file = ' , res))
        let testData = this.getData(uri);

        // console.log('base64audio = ' , base64Audio);
        // let options = {
        //   method: 'POST',
        //   body: {
        //       "audio": base64Audio,
        //   },
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'multipart/form-data',
        //   },
        // };
      
        // console.log("POSTing " + uri + " to " + apiUrl);
        // fetch(apiUrl, options)
        // .then( res => console.log("new res = " , res ))
        // // .then( blob => console.log("blob = " , blob))
        // .catch( err => console.log('catch err ' , err))

        axios({
            url: 'http://api.teezee.sg:8080/api/cart/orbital', 
            // url: 'https://8gpu2xeyl7.execute-api.ap-southeast-1.amazonaws.com/api/v1/submit-audio-all-types',
            method: 'post',
            data: {
                audio: formData
            }
        })
        .then(res => console.log("res.DATA = " , res))
        .catch( err => console.log("error rrrr = " , err))
        // axios.post( 'https://8gpu2xeyl7.execute-api.ap-southeast-1.amazonaws.com/api/v1/submit-audio-all-types' ,
        //     // url: 'https://8gpu2xeyl7.execute-api.ap-southeast-1.amazonaws.com/api/v1/submit-audio-all-types',
        //     // method: 'post',
        //     // method: 'get',
        //     // withCredentials: true,
        //     {audio: formData}
        //     // data: {
        //     //     formData
        //     // }
        // )
        // .then( res => console.log("any repsonse = " , res))
        // .catch( err => console.log('catch err ' , err))

        // axios
        // .then( res => console.log("any response from server" ))
        // return true

      }
      

}

export default SessionContent;