import { ConfigProvider, Popover, Slider } from 'antd'
import style from './control.module.scss'
import arrowPrev from '../../assets/images/arrowPrev.svg'
import arrowNext from '../../assets/images/arrowNext.svg'
import doubleArrow from '../../assets/images/doubleArrow-ReplayOff.svg'
import repeat from '../../assets/images/repeat-ReplayPlaylist.svg'
import repeatOne from '../../assets/images/repeatOne-ReplayOne.svg'
import repeatOneOn from '../../assets/images/repeatOneOn-EndAfterCurrent.svg'
import playBtn from '../../assets/images/PlayBtn.svg'
import pauseBtn from '../../assets/images/PauseBtn.svg'
import { useNavigate } from 'react-router'
import { useCallback, useEffect } from 'react'
import ListenOrderMini from './components/ListenOrderMini'
import audioDefaultpreview from '../../assets/images/audioDefaultpreview.jpeg'
import { useQuery } from '@tanstack/react-query'
import moreHoriz from '../../assets/images/moreHoriz.svg'
import volumeImg from '../../assets/images/volume.svg'
import volumeOffImg from '../../assets/images/volumeOff.svg'
import ControlPopover from './components/ControlPopover'
import { useMusic } from '../../context/music-context'
import { authorService } from '../../services/author.service'
import { volumeSliderTokens } from './settings/sliderTokens'
import PopoverCurrTrack from '../assistants/popovers/PopoverCurrTrack'

export default function ListenControl() {
    const {
        audioRef,
        currentTrackId,
        changeCurrentTrackId,
        currentTrack,
        isPlaying,
        playlist,
        currentPlaylistId,
        currentTime,
        changeCurrentTime,
        duration,
        play,
        pause,
        seek,
        isSeeking,
        startSeek,
        endSeek,
        prevItem,
        handlePrevItem,
        nextItem,
        handleNextItem,
        speed,
        changeSpeed,
        replay,
        changeReplay,
        volume,
        changeVolume
    } = useMusic()

    const navigate =  useNavigate()

    const {
        isLoading: isLoadingAuthor,
        data: dataAuthor,
        isError: isErrorAuthor,
        error: errorAuthor,
        isSuccess: isSuccessAuthor,
        refetch: refetchAuthor
    }=  useQuery({
        queryKey: ['get author by id: ', currentTrack.authorId],
        queryFn: () => authorService.getAuthor(currentTrack.authorId),
        enabled: false,
        retry: 0
    })

    const handleEnded = useCallback(() => {
        pause()

        const musicList = playlist.musicList

        if (!Array.isArray(musicList) || musicList.length === 0)
        {
            return
        }

        const currentIndex = musicList.findIndex(item => item === currentTrackId)
        const nextItem = musicList[currentIndex + 1]

        if ((currentIndex+1) === musicList.length && replay === 'replay-playlist') {
            return changeCurrentTrackId(musicList[0])
        }

        if (replay === 'replay-one') {
            audioRef.current.currentTime = 0
            audioRef.current.play()
            return
        }

        if ( replay === 'end-after-one' || !nextItem)
        {
            return
        }

        // navigate(`/listen?m=${nextItem}&p=${currentPlaylistId}`)
        changeCurrentTrackId(nextItem)
    }, [pause, playlist, currentTrackId, currentPlaylistId, replay])

    useEffect(() => {
        const audio = audioRef.current
        if (!audio)
        {
            return
        }

        if (audio) {
            audio.addEventListener("ended", handleEnded)
        }

        return () => {
            audio.removeEventListener("ended", handleEnded)
        }
    }, [audioRef, handleEnded])

    useEffect(() => {
        if (currentTrack.id) {
            refetchAuthor()
        }
    }, [currentTrack])

    const handleSeek = (newValue) => {
        seek(newValue)
    }

    const handlePlayPause= () => {
        if (isPlaying)
        {
            pause()
        } else {
            play()
        }
    }

    if ('mediaSession' in navigator) {
        // Устанавливаем обработчики для кнопок в шторке уведомлений
        navigator.mediaSession.setActionHandler('play', function() {
            console.log('Play from notification');
            handlePlayPause();
        });

        navigator.mediaSession.setActionHandler('pause', function() {
            console.log('Pause from notification');
            handlePlayPause();
        });

        navigator.mediaSession.setActionHandler('previoustrack', function() {
            console.log('Previous track from notification');
            handlePrevItem();
        });

        navigator.mediaSession.setActionHandler('nexttrack', function() {
            console.log('Next track from notification');
            handleNextItem();
        });

        // Обновляем метаданные для отображения в уведомлении
        navigator.mediaSession.metadata = new MediaMetadata({
            title: 'Название трека',
            artist: 'Исполнитель',
            album: 'Альбом',
            artwork: [
                { src: `/api/images/${currentTrack.preview}`, sizes: '96x96' },
            ]
        });
    }

    if (!currentTrack || Object.keys(currentTrack).length === 0) {
        return null;
    }

    const formatterTime = (time) => {
        if (isNaN(time) || time === 0) return "0:00"

        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        const formattedSeconds = seconds.toString().padStart(2, "0")

        return `${minutes}:${formattedSeconds}`
    }

    const handleVolume = () => {
        if (volume === 0) {
            changeVolume(100)
        } else {
            changeVolume(0)
        }
    }

    const isMobileDevice = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    const sliderContent = () => {
        return (
            <div
                style={{
                    width: 50,
                    height: 200,
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <ConfigProvider
                    theme={{
                        token: volumeSliderTokens,
                        components: {
                            Slider: volumeSliderTokens,
                        },
                    }}
                >
                    <Slider
                        min={0}
                        max={100}
                        defaultValue={0}
                        vertical
                        onChange={changeVolume}
                        disabled={false}
                        value={typeof volume === 'number' ? (volume * 100) : 0}
                    />
                </ConfigProvider>
            </div>
        )
    }

    return (
        <div className={style.ListenControl}>
            <ListenOrderMini />
            <div className={style.ListenControl__Wrapper}>
                <div className={style.ListenControl__Container}>
                    <div className={style.ListenControl__TimeSlider}>
                        <ConfigProvider
                            theme={{
                                components: {
                                    Slider: volumeSliderTokens,
                                },
                            }}
                        >
                            <Slider
                                min={0}
                                max={duration}
                                defaultValue={0}
                                value={typeof currentTime === 'number' ? currentTime : 0}
                                onChange={handleSeek}
                                disabled={!duration}
                                tooltip={{
                                    formatter: (currentTime) => formatterTime(currentTime)
                                }}
                            />
                        </ConfigProvider>
                    </div>
                    <div className={style.ListenControl__Panel}>
                        <div className={style.ListenControl__Panel__Info}>
                            <div className={style.ListenControl__Panel__Info__Preview}>
                                <img
                                    src={currentTrack.preview ? `/api/images/${currentTrack.preview}`
                                                                 : audioDefaultpreview
                                    }
                                />
                            </div>
                            <div className={style.ListenControl__Panel__Info__Text}>
                                <p className={style.AudioTitle}>
                                    {currentTrack.title}
                                </p>
                                { dataAuthor?.id && (
                                    <p className={style.AudioAuthor}>
                                        {dataAuthor.name}
                                    </p>
                                )}
                            </div>
                            <div className={style.ListenControl__Panel__Info__Menu}>
                                <Popover
                                    content={<PopoverCurrTrack />}
                                    trigger="click"
                                    color="#2e2e2e"
                                >
                                    <button
                                        className={style.ListenControl__Panel__Info__Menu__Btn}
                                    >
                                        <img src={moreHoriz} />
                                    </button>
                                </Popover>
                            </div>
                        </div>
                        <div className={style.ListenControl__Panel__Mngmt}>
                            <div className={style.ListenControl__Panel__Mngmt__Basic}>
                                <button
                                    onClick={handlePrevItem}
                                    className={style.ListenControl__Panel__Mngmt__Basic__PrevNext}
                                >
                                    <img src={arrowPrev} />
                                </button>
                                <button
                                    onClick={handlePlayPause}
                                    className={style.ListenControl__Panel__Mngmt__Basic__PlayPause}
                                >
                                    <img src={
                                        isPlaying ? pauseBtn : playBtn
                                    } />
                                </button>
                                <button
                                    onClick={handleNextItem}
                                    className={style.ListenControl__Panel__Mngmt__Basic__PrevNext}
                                >
                                    <img src={arrowNext} />
                                </button>
                            </div>
                        </div>
                        { isMobileDevice && (
                            <div className={style.ListenControl__Panel__Volume}>
                                <div className={style.ListenControl__Panel__Volume__Other}>
                                    <button
                                        onClick={changeReplay}
                                        className={style.ListenControl__Panel__Volume__Other__BtnReplay}
                                    >
                                        {replay === 'off' && (<img src={doubleArrow} alt="Повтор" />)}
                                        {replay === 'replay-playlist' && (<img src={repeat} alt="Повтор" />)}
                                        {replay === 'replay-one' && (<img src={repeatOne} alt="Повтор" />)}
                                        {replay === 'end-after-one' && (<img src={repeatOneOn} alt="Повтор" />)}
                                    </button>
                                </div>
                                <Popover
                                    content={sliderContent}
                                    trigger="hover"
                                    color="#2e2e2e"
                                >
                                    <button
                                        onClick={handleVolume}
                                        className={style.ListenControl__Panel__Volume__Btn}
                                    >
                                        <img src={volume ? volumeImg : volumeOffImg} />
                                    </button>
                                </Popover>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

        // <div className={style.Layout__Sub__Outlet__ListenControl}>
        //     <ListenOrderMini />
        //     <div className={style.ListenControl}>
        //         <div className={style.ListenControl__Container}>
        //             <div className={style.ListenControl__Wrapper}>
        //                 <div className={style.ListenControl__PlayTime}>
        //                     <span className={style.ListenControl__PlayTime__Info}>
        //                         {formatterTime(currentTime)}
        //                     </span>
        //                     <div className={style.ListenControl__PlayTime__Slider}>
        //                         <Slider
        //                             min={0}
        //                             max={duration}
        //                             defaultValue={0}
        //                             value={typeof currentTime === 'number' ? currentTime : 0}
        //                             onChange={handleSeek}
        //                             // onChange={handleSliderChange}
        //                             // onChangeComplete={handleSliderAfterChange}
        //                             disabled={!duration}
        //                             tooltip={{
        //                                 formatter: (currentTime) => formatterTime(currentTime)
        //                             }}
        //                         />
        //                     </div>
        //                     <span className={style.ListenControl__PlayTime__Info}>
        //                         {formatterTime(duration)}
        //                     </span>
        //                 </div>
        //                 <div className={style.ListenControl__PlayButtons}>
        //                     <button
        //                         // disabled={prevItem}
        //                         onClick={handlePrevItem}
        //                         className={style.ListenControl__PlayButtons__PrevNext}
        //                     >
        //                         <img src={arrowPrev} />
        //                     </button>
        //                     <button
        //                         onClick={handlePlayPause}
        //                         className={style.ListenControl__PlayButtons__PlayPause}
        //                     >
        //                         <img src={
        //                             isPlaying ? playBtn : pauseBtn
        //                         } />
        //                     </button>
        //                     <button
        //                         // disabled={nextItem}
        //                         onClick={handleNextItem}
        //                         className={style.ListenControl__PlayButtons__PrevNext}
        //                     >
        //                         <img src={arrowNext} />
        //                     </button>

        //                     <button
        //                         onClick={changeReplay}
        //                         className={style.ListenMusicInfo__Content__Management__Menu__BtnReplay}
        //                     >
        //                         {replay === 'off' && (<img src={doubleArrow} alt="Повтор" />)}
        //                         {replay === 'replay-playlist' && (<img src={repeat} alt="Повтор" />)}
        //                         {replay === 'replay-one' && (<img src={repeatOne} alt="Повтор" />)}
        //                         {replay === 'end-after-one' && (<img src={repeatOneOn} alt="Повтор" />)}
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}