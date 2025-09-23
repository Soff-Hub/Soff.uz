// ** React Imports
import { createContext, useState } from 'react'

// ** Defaults
const defaultProvider = {
    wavesurferObj: null,
    playing: false,
    setPlaying: () => { },
    playing2: false,
    setPlaying2: () => { },
    setWavesurferObjFn: () => { },
    playerVisible: false,
    setPlayerVisible: () => { },
    wavesurferObj2: null,
    setWavesurferObj2: () => { },
    setAudioData: () => { },
    audioData: {}
}

const AudioContext = createContext(defaultProvider)

const AudioProvider = ({ children }) => {
    const [wavesurferObj, setWavesurferObj] = useState(defaultProvider.wavesurferObj);
    const [wavesurferObj2, setWavesurferObj2] = useState(defaultProvider.wavesurferObj);
    const [playing, setPlaying] = useState(defaultProvider.playing);
    const [playing2, setPlaying2] = useState(!defaultProvider.playing);
    const [playerVisible, setPlayerVisible] = useState(false)
    const [audioData, setAudioData] = useState({})

    const setWavesurferObjFn = (data) => {
        setPlaying(false);
        setWavesurferObj(data);
    }

    wavesurferObj?.on('finish', () => {
        setPlaying(false)
    });


    const values = {
        wavesurferObj,
        setWavesurferObjFn: setWavesurferObjFn,
        wavesurferObj2,
        setWavesurferObj2,
        playing,
        setPlaying: setPlaying,
        playing2,
        setPlaying2: setPlaying2,
        playerVisible,
        setPlayerVisible,
        audioData,
        setAudioData
    };

    return <AudioContext.Provider value={values}>{children}</AudioContext.Provider>;
}

export { AudioContext, AudioProvider }
