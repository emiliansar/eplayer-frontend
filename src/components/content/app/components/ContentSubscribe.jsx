import { useCallback, useEffect, useRef, useState } from "react"
import { useQuery } from "@tanstack/react-query"
// import audioDefaultPreview from '../../../../assets/images/audioDefaultPreview.jpeg'
// import playlistDefaultPreview from '../../../../assets/images/playlistDefaultPreview.jpeg'
import PleaseAuth from '@/components/errors/PleaseAuth'
// import { useAosQuery, usePosQuery } from "../../hooks/useAosPosQuery"
import style from '../appContent.module.scss'
// import audioDefaultpreview from '../../../../assets/images/audioDefaultpreview.jpeg'
import { Swiper, SwiperSlide, useSwiper } from "swiper/react"
// import arrowBack from '../../../../assets/images/arrowBack.svg'
// import arrowForward from '../../../../assets/images/arrowForward.svg'
import { useEplayer } from "@/context/eplayer-context"
import { userService } from "@/services/user.service"
import { musicService } from "@/services/music.service"
import { authorService } from "@/services/author.service"

export default function ContentSubscribe({ setIsShowCS }) {
    const [audioBreakpoints, setAudioBreakpoints] = useState({
                                0: {
                                    slidesPerView: 1.1,
                                    spaceBetween: 10,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                420: {
                                    slidesPerView: 1.1,
                                    spaceBetween: 10,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                460: {
                                    slidesPerView: 1.3,
                                    spaceBetween: 10,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                500: {
                                    slidesPerView: 1.5,
                                    spaceBetween: 10,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                540: {
                                    slidesPerView: 1.6,
                                    spaceBetween: 10,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                620: {
                                    slidesPerView: 1.7,
                                    spaceBetween: 10,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                720: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                840: {
                                    slidesPerView: 2.3,
                                    spaceBetween: 10,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                920: {
                                    slidesPerView: 2.6,
                                    spaceBetween: 30,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                960: {
                                    slidesPerView: 2,
                                    spaceBetween: 10,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                1040: {
                                    slidesPerView: 2.3,
                                    spaceBetween: 10,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                1120: {
                                    slidesPerView: 2.6,
                                    spaceBetween: 10,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                1200: {
                                    slidesPerView: 2.6,
                                    spaceBetween: 20,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                1240: {
                                    slidesPerView: 3,
                                    spaceBetween: 10,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                1320: {
                                    slidesPerView: 3.3,
                                    spaceBetween: 10,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                1400: {
                                    slidesPerView: 3.3,
                                    spaceBetween: 5,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                1440: {
                                    slidesPerView: 3.6,
                                    spaceBetween: 20,
                                    slidesOffsetBefore: 10,
                                    slidesOffsetAfter: 30
                                },
                                1560: {
                                    slidesPerView: 4,
                                    spaceBetween: 20,
                                    draggable: false
                                },
                                1640: {
                                    slidesPerView: 4,
                                    spaceBetween: 30,
                                    draggable: false
                                }
    })

    const [plBreakpoints, setPLBreakpoints] = useState({
                                    0: {
                                        slidesPerView: 1.6,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    380: {
                                        slidesPerView: 2,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    420: {
                                        slidesPerView: 2.3,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    500: {
                                        slidesPerView: 2.6,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    540: {
                                        slidesPerView: 3,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    700: {
                                        slidesPerView: 2.6,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    800: {
                                        slidesPerView: 3,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    840: {
                                        slidesPerView: 3.3,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    920: {
                                        slidesPerView: 3.6,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    960: {
                                        slidesPerView: 3,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    1040: {
                                        slidesPerView: 3.3,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    1120: {
                                        slidesPerView: 3.6,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    1200: {
                                        slidesPerView: 4,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    1240: {
                                        slidesPerView: 4.3,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    1320: {
                                        slidesPerView: 4.6,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    1400: {
                                        slidesPerView: 5,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    1480: {
                                        slidesPerView: 5.3,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    1560: {
                                        slidesPerView: 5.6,
                                        slidesOffsetBefore: 10,
                                        slidesOffsetAfter: 30,
                                    },
                                    1640: {
                                        slidesPerView: 6
                                    },
    })

    // aos - audio on subscriptions
    // pos - playlists on subscriptions
    const [aosList, setAosList] = useState([])
    const [posList, setPosList] = useState([])
    const [authors, setAuthors] = useState({})

    const swiper = useSwiper()
    const audioSwiperRef = useRef(null)
    const plSwiperRef = useRef(null)

    const {isAuth, userId, access_token, refresh_token, changeAccessToken} = useEplayer()
    const {isLoading: isSubLoading, data: subList, isError: isSubError, error: subError, isFetching: isSubFetching, isSuccess: isSubSuccess, refetch: subRefetch} = useQuery({
        queryKey: ['subscriptionsRefetch'],
        queryFn: () => userService.getSubscriptions(access_token, refresh_token, changeAccessToken),
        enabled: false,
        retry: false,
    })
    // Aos - audio on sub
    const {isLoading: isAosLoading, data: aosData, isError: isAosError, error: aosError, isFetching: isAosFetching, isSuccess: isAosSuccess, refetch: aosRefetch} = useQuery({
        queryKey: ['audioOnSubsRefetch'],
        // queryFn: () => console.log("aosRefetch subList: ", subList),
        queryFn: () => musicService.getAudioOnSub(subList, access_token, refresh_token, changeAccessToken),
        enabled: false,
        retry: 1,
    })
    // pos - playlists on sub
    const {isLoading: isPosLoading, data: posData, isError: isPosError, error: posError, isFetching: isPosFetching, isSuccess: isPosSuccess, refetch: posRefetch} = useQuery({
        queryKey: ['playlistsOnSubsRefetch'],
        queryFn: () => musicService.getPlaylistsOnSub(subList, access_token, refresh_token, changeAccessToken),
        enabled: false,
        retry: 1,
    })
    
    useEffect(() => {
        if (!userId || isSubFetching) return;

        subRefetch()
    }, [userId])

    useEffect(() => {
        if (subList?.length === 0 || isAosFetching || isPosFetching) return;
        if (!isSubSuccess) return;

        aosRefetch()
        posRefetch()
    }, [subList])

    useEffect(() => {
        if (!aosData || aosData?.audioList.length === 0 || !posData || posData?.playlistList.length === 0) return;

        setAosList(aosData.audioList)
        setPosList(posData.playlistList)
    }, [aosData, posData])

    useEffect(() => {
            if (!aosList.length) return;

            const fetchAuthors = async () => {
                const authorIds = [...new Set(aosList.map(item => item.authorId))]

                for (const authorId of authorIds) {
                    if (!authors[authorId]) {
                        try {
                            const authorData = await authorService.getAuthor(authorId)
                            setAuthors(prev => ({
                                ...prev,
                                [authorId]: authorData
                            }))
                        } catch (error) {
                            console.log('Ошибка загрузки автора ', authorId, ': ', error);
                        }
                    }
                }
            }

            fetchAuthors()
    }, [aosList, authors])

    useEffect(() => {
        if (!posList.length) return;

        const fetchAuthors = async () => {
            const authorIds = [...new Set(posList.map(item => item.authorId))]

            for (const authorId of authorIds) {
                if (!authors[authorId]) {
                    try {
                        const authorData = await authorService.getAuthor(authorId)
                        setAuthors(prev => ({
                            ...prev,
                            [authorId]: authorData
                        }))
                    } catch (error) {
                        console.log('Ошибка загрузки автора ', authorId, ': ', error);
                    }
                }
            }
        }

        fetchAuthors()
    }, [posList, authors])

    const safesSlidePrev = useCallback(() => {
            if (audioSwiperRef.current && !audioSwiperRef.current.destroyed) {
                audioSwiperRef.current.slidePrev()
            }
        })

        const safesSlideNext = useCallback(() => {
            if (audioSwiperRef.current && !audioSwiperRef.current.destroyed) {
                audioSwiperRef.current.slideNext()
            }
        }, [])

        const safesPLPrev = useCallback(() => {
            if (plSwiperRef.current && !plSwiperRef.current.destroyed) {
                plSwiperRef.current.slidePrev()
            }
        })

        const safesPLNext = useCallback(() => {
            if (plSwiperRef.current && !plSwiperRef.current.destroyed) {
                plSwiperRef.current.slideNext()
            }
        }, [])


    if (!isAuth) {
        return <PleaseAuth />
    }

    if (isSubLoading || isAosLoading || isPosLoading) {
        return (
            <div>Загрузка...</div>
        )
    }

    if (isSubError && isSubSuccess) {
        return (
            <div>isSubError: {subError.response?.data?.message || subError.message}</div>
        )
    }

    if (isAosError && isAosSuccess) {
        return (
            <div>isAosError: {aosError.response?.data?.message || aosError.message}</div>
        )
    }

    if (isPosError && isPosSuccess) {
        return (
            <div>isPosError: {posError.response?.data?.message || posError.message}</div>
        )
    }

    return (
        <>
            <div
                className={style.AppContent__Wrapper__Block}
            >
                {aosList.length > 0 && (
                    <div
                        className={style.AppContent__Wrapper__Block__Audio}
                    >
                        <div className={style.AppContent__Wrapper__Block__Audio__Top}>
                            <p className={style.AppContent__Wrapper__Block__Audio__Top__Title}>
                                Музыка
                            </p>
                            <div className={style.AppContent__Wrapper__Block__Audio__Top__Menu}>
                                <button
                                    className={`${style.AppContent__Wrapper__Block__Audio__Top__Menu__Prev}__Subs`}
                                    type="button"
                                    onClick={safesSlidePrev}
                                >
                                    <img src='/assets/images/arrowBack.svg' alt="Назад" />
                                </button>
                                <button
                                    className={`${style.AppContent__Wrapper__Block__Audio__Top__Menu__Next}__Subs`}
                                    type="button"
                                    onClick={safesSlideNext}
                                >
                                    <img src='/assets/images/arrowForward.svg' alt="Вперёд" />
                                </button>
                            </div>
                        </div>
                        <Swiper
                            ref={audioSwiperRef}
                            style={{ width: '100%' }}
                            slidesPerView={4}
                            direction="horizontal"
                            navigation={{
                                nextEl: `.AppContent__Wrapper__Block__Audio__Top__Menu__Next__Subs`,
                                prevEl: `.AppContent__Wrapper__Block__Audio__Top__Menu__Prev__Subs`,
                            }}
                            onSwiper={(swiper) => {
                                audioSwiperRef.current = swiper
                            }}
                            onBeforeDestroy={() => {
                                audioSwiperRef.current = null;
                            }}
                            breakpoints={audioBreakpoints}
                        >
                            <SwiperSlide>
                                <div className={style.SwiperSlideContent}>
                                    {aosList.slice(0, 4).map((item, index) => {
                                        const author = authors[item.authorId];

                                        return (
                                            <div
                                                key={`${item.id}-${index}-${Date.now()}`}
                                                className={style.AppContent__Wrapper__Block__Audio__List__Item}
                                            >
                                                <div className={style.AppContent__Wrapper__Block__Audio__List__Item__Preview}>
                                                    <img
                                                        src={ item.preview ?
                                                            `/api/images/${item.preview}` : '/assets/images/audioDefaultpreview.jpeg'
                                                        }
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className={style.AppContent__Wrapper__Block__Audio__List__Item__Text}>
                                                    <p
                                                        className={style.AppContent__Wrapper__Block__Audio__List__Item__Text__Title}
                                                    >
                                                        {item.title}
                                                    </p>
                                                    { author && (
                                                        <p className={style.AppContent__Wrapper__Block__Audio__List__Item__Text__Author}>
                                                            {author.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={style.SwiperSlideContent}>
                                    {aosList.slice(4, 8).map((item, index) => {
                                        const author = authors[item.authorId];

                                        return (
                                            <div
                                                key={`${item.id}-${index}-${Date.now()}`}
                                                className={style.AppContent__Wrapper__Block__Audio__List__Item}
                                            >
                                                <div className={style.AppContent__Wrapper__Block__Audio__List__Item__Preview}>
                                                    <img src={ item.preview ?
                                                        `/api/images/${item.preview}` : '/assets/images/audioDefaultpreview.jpeg'
                                                        }
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className={style.AppContent__Wrapper__Block__Audio__List__Item__Text}>
                                                    <p
                                                        className={style.AppContent__Wrapper__Block__Audio__List__Item__Text__Title}
                                                    >
                                                        {item.title}
                                                    </p>
                                                    { author && (
                                                        <p className={style.AppContent__Wrapper__Block__Audio__List__Item__Text__Author}>
                                                            {author.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={style.SwiperSlideContent}>
                                    {aosList.slice(8, 12).map((item, index) => {
                                        const author = authors[item.authorId];

                                        return (
                                            <div
                                                key={`${item.id}-${index}-${Date.now()}`}
                                                className={style.AppContent__Wrapper__Block__Audio__List__Item}
                                            >
                                                <div className={style.AppContent__Wrapper__Block__Audio__List__Item__Preview}>
                                                    <img
                                                        src={ item.preview ?
                                                            `/api/images/${item.preview}` : '/assets/images/audioDefaultpreview.jpeg'
                                                        }
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className={style.AppContent__Wrapper__Block__Audio__List__Item__Text}>
                                                    <p
                                                        className={style.AppContent__Wrapper__Block__Audio__List__Item__Text__Title}
                                                    >
                                                        {item.title}
                                                    </p>
                                                    { author && (
                                                        <p className={style.AppContent__Wrapper__Block__Audio__List__Item__Text__Author}>
                                                            {author.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={style.SwiperSlideContent}>
                                    {aosList.slice(12, 16).map((item, index) => {
                                        const author = authors[item.authorId];

                                        return (
                                            <div
                                                key={`${item.id}-${index}-${Date.now()}`}
                                                className={style.AppContent__Wrapper__Block__Audio__List__Item}
                                            >
                                                <div className={style.AppContent__Wrapper__Block__Audio__List__Item__Preview}>
                                                    <img
                                                        src={ item.preview ?
                                                            `/api/images/${item.preview}` : '/assets/images/audioDefaultpreview.jpeg'
                                                        }
                                                        alt={item.title}
                                                    />
                                                </div>
                                                <div className={style.AppContent__Wrapper__Block__Audio__List__Item__Text}>
                                                    <p
                                                        className={style.AppContent__Wrapper__Block__Audio__List__Item__Text__Title}
                                                    >
                                                        {item.title}
                                                    </p>
                                                    { author && (
                                                        <p className={style.AppContent__Wrapper__Block__Audio__List__Item__Text__Author}>
                                                            {author.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                )}
                { posList.length > 0 && (
                    <div
                        className={style.AppContent__Wrapper__Block__Playlist}
                    >
                        <div className={style.AppContent__Wrapper__Block__Playlist__Top}>
                                <p className={style.AppContent__Wrapper__Block__Playlist__Top__Title}>
                                    Плейлисты
                                </p>
                                <div className={style.AppContent__Wrapper__Block__Playlist__Top__Menu}>
                                    <button
                                        className={`${style.AppContent__Wrapper__Block__Playlist__Top__Menu__Prev}__Subs`}
                                        type="button"
                                        onClick={safesPLPrev}
                                    >
                                        <img src='/assets/images/arrowBack.svg' alt="Назад" />
                                    </button>
                                    <button
                                        className={`${style.AppContent__Wrapper__Block__Playlist__Top__Menu__Next}__Subs`}
                                        type="button"
                                        onClick={safesPLNext}
                                    >
                                        <img src='/assets/images/arrowForward.svg' alt="Вперёд" />
                                    </button>
                                </div>
                        </div>
                        <Swiper
                                ref={plSwiperRef}
                                style={{ width: '100%' }}
                                slidesPerView={6}
                                spaceBetween={10}
                                direction="horizontal"
                                navigation={{
                                    nextEl: `.AppContent__Wrapper__Block__Playlist__Top__Menu__Next__Subs`,
                                    prevEl: `.AppContent__Wrapper__Block__Playlist__Top__Menu__Prev__Subs`,
                                }}
                                onSwiper={(swiper) => {
                                    plSwiperRef.current = swiper
                                }}
                                onBeforeDestroy={() => {
                                    plSwiperRef.current = null;
                                }}
                                breakpoints={plBreakpoints}
                            >
                            {posList.map((playlist, index) =>{
                                const author = authors[playlist.authorId];

                                return (
                                    <SwiperSlide
                                        key={`${playlist.id}-${index}-${Date.now()}`}
                                    >
                                        <div
                                            className={style.AppContent__Wrapper__Block__Playlist__List__Item}
                                        >
                                            <div className={style.AppContent__Wrapper__Block__Playlist__List__Item__Preview}>
                                                <img src={playlist.preview || '/assets/images/playlistDefaultPreview.jpeg'} alt={playlist.title} />
                                            </div>
                                            <div className={style.AppContent__Wrapper__Block__Playlist__List__Item__Text}>
                                                <p className={style.AppContent__Wrapper__Block__Playlist__List__Item__Text__Name}>
                                                    {playlist.name}
                                                </p>
                                                { author && (
                                                    <p className={style.AppContent__Wrapper__Block__Audio__List__Item__Text__Author}>
                                                        {author.name}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                )}
            </div>
        </>
    )
}