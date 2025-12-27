import { useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { musicService } from "../services/music.service";
import { useEplayer } from "./eplayer-context";

const MusicContext = createContext()

export const MusicContextProvider = ({ children }) => {
    const { userId, user } = useEplayer()

    const [error, setError] = useState({})
    const [replay, setReplay] = useState('off')

    const [playlist, setPlaylist] = useState({})
    const [currentPlaylistId, setCurrentPlaylistId] = useState(0)

    const audioRef = useRef(null)

    const [currentTrackId, setCurrentTrackId] = useState(0)
    const [currentTrack, setCurrentTrack] = useState({})
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [speed, setSpeed] = useState(1.0)
    const [volume, setVolume] = useState(1)

    const [currentIndex, setCurrentIndex] = useState(false)
    const [nextItem, setNextItem] = useState(false)
    const [prevItem, setPrevItem] = useState(false)

    const [isSeeking, setIsSeeking] = useState(false)
    const [wasPlayingBeforeSeek, setWasPlayingBeforeSeek] = useState(false)

    const {
        isLoading: isLoadingPlaylist,
        data: dataPlaylist,
        isError: isErrorPlaylist,
        error: errorPlaylist,
        isSuccess: isSuccessPlaylist,
        refetch: refetchPlaylist
    } = useQuery({
        queryKey: ['get playlist by id: ', currentPlaylistId],
        queryFn: () => musicService.getPlaylistData(currentPlaylistId),
        enabled: false,
        retry: 0
    })

    const {
        isLoading: isLoadingMusic,
        data: dataMusic,
        isError: isErrorMusic,
        error: errorMusic,
        isSuccess: isSuccessMusic,
        refetch: refetchMusic
    } = useQuery({
        queryKey: ['get music by id'],
        queryFn: () => musicService.getMetaData(currentTrackId),
        enabled: false,
        retry: 0
    })

    useEffect(() => {
        if (isErrorMusic) {
            setError(errorMusic)
            console.log(errorMusic)
        }
    }, [isErrorMusic])

    useEffect(() => {
        if (!dataPlaylist || Object.keys(dataPlaylist).length === 0)
        {
            return
        }

        setPlaylist(dataPlaylist)
    }, [dataPlaylist])

    useEffect(() => {
        if (isNaN(currentPlaylistId)
            || currentPlaylistId === 0
        )
        {
            return
        }

        refetchPlaylist()
    }, [currentPlaylistId])

    const changePlaylistId = (playlistId) => {
        setCurrentPlaylistId(playlistId)
        console.log("setCurrentPlaylistId: ", playlistId)
    }

    const changePlaylist = (newState) => {
        setPlaylist(newState)
    }

    const findCurrentIndex = useCallback(() => {
        const index = playlist.musicList?.findIndex(item => item === currentTrackId)
        setCurrentIndex(index)
    }, [playlist, currentTrackId, currentIndex])

    const findPrevNextIndex = useCallback(() => {
        if (typeof(currentIndex) === 'boolean'
            || isNaN(currentIndex)
        ) return;
        const prev = playlist.musicList[currentIndex - 1]
        const next = playlist.musicList[currentIndex + 1]

        setPrevItem(prev)
        setNextItem(next)
    }, [currentIndex, prevItem, nextItem, playlist])

    useEffect(() => {
        if (!currentTrackId || isNaN(currentTrackId) || currentTrackId === 0) return

        setError(null)
        refetchMusic()

        if (!currentPlaylistId) return;

        findCurrentIndex()
    }, [currentTrackId])

    useEffect(() => {
        console.log("currentTrackId изменился: ", currentTrackId)
    }, [currentTrackId])

    useEffect(() => {
        findPrevNextIndex()
    }, [currentIndex])

    useEffect(() => {
        console.log('currentIndex: ', currentIndex)
        console.log('nextItem: ', nextItem)
        console.log('prevItem: ', prevItem)
    }, [currentIndex, nextItem, prevItem])

    useEffect(() => {
        if (!isNaN(dataMusic?.id)) {
            setCurrentTrack(dataMusic)
        }
    }, [dataMusic])

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
    }

    const handleLoadedMetaData = () => {
        setDuration(audioRef.current.duration)
        audioRef.current.play()
    }

    const play = async () => {
        if (!audioRef.current)
        {
            return
        }

        try {
            await audioRef.current.play()
            setIsPlaying(true)
        } catch (error) {
            console.error("Play error: ", error)
            setIsPlaying(false)
        }
    }

    const pause = () => {
        if (!audioRef.current)
        {
            return
        }

        audioRef.current.pause()
        setIsPlaying(false)
    }

    const handlePlayPause = () => {
        if (isPlaying) {
            pause()
        } else {
            play()
        }
    }

    const seek = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time
        }
    }

    const startSeek = () => {
        setWasPlayingBeforeSeek(isPlaying)
        setIsSeeking(true)
        pause()
    }

    const endSeek = (time) => {
        setIsSeeking(false)
        seek(time)

        if (wasPlayingBeforeSeek) {
            setTimeout(() => play(), 100)
        }
    }

    const handlePrevItem = useCallback(() => {
        console.log('Кнопка Prev нажата!')
        if (typeof(prevItem) === 'boolean') return

        setCurrentTrackId(prevItem)
    }, [prevItem])

    const handleNextItem = useCallback(() => {
        console.log('Кнопка Next нажата!')
        if (typeof(nextItem) === 'boolean') return

        setCurrentTrackId(nextItem)
    }, [nextItem])

    const changeReplay = useCallback(() => {
        setReplay(prev => {
            if (prev === 'off') return 'replay-playlist'
            if (prev === 'replay-playlist') return 'replay-one'
            if (prev === 'replay-one') return 'end-after-one'
            return 'off'
        })
    }, [replay])

    const delOrderPlayback = () => {
        if (typeof(currentPlaylistId) !== 'number'
            || currentPlaylistId === 0
        ) {
            setPlaylist({})
        }
    }

    const changeVolume = (state) => {
        setVolume(state / 100)
        audioRef.current.volume = state / 100
    }

    const changeSpeed = () => {
        if (audioRef.current) {
            if (speed === 0.5) {
                setSpeed(1.0)
            }

            if (speed === 1.0) {
                setSpeed(1.5)
            }

            if (speed === 1.5) {
                setSpeed(2.0)
            }

            if (speed === 2.0) {
                setSpeed(0.5)
            }
        }
    }

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        audio.playbackRate = speed
    }, [speed])

    const value = {
        error,
        playlist,
        prevItem,
        handlePrevItem,
        nextItem,
        handleNextItem,
        changePlaylistId,
        changePlaylist,
        currentPlaylistId,
        audioRef,
        currentTrack,
        currentTrackId,
        changeCurrentTrackId: setCurrentTrackId,
        isPlaying,
        currentTime,
        duration,
        speed,
        changeSpeed,
        replay,
        changeReplay: setReplay,
        play,
        pause,
        handlePlayPause,
        seek,
        isSeeking,
        startSeek,
        endSeek,
        changeReplay,
        delOrderPlayback,
        volume,
        changeVolume
    }

    return (
        <MusicContext.Provider value={value}>
            {children}
            <audio
                ref={audioRef}
                src={`/api/music/${currentTrack?.path}?id=${user?.id}`}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetaData}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
        </MusicContext.Provider>
    )
}

export const useMusic = () => {
    const context = useContext(MusicContext);
    if (!context)
    {
        throw new Error('useMusic must be used within a MusicProvider')
    }

    return context;
}