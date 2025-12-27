import { useQuery } from "@tanstack/react-query"
import { musicService } from "../../../../services/music.service"
import { useCallback, useEffect, useRef, useState } from "react"
import style from '../appContent.module.scss'
import { authorService } from "../../../../services/author.service"
import audioDefaultpreview from '../../../../assets/images/audioDefaultpreview.jpeg'
import playlistDefaultPreview from '../../../../assets/images/playlistDefaultPreview.jpeg'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import arrowBack from '../../../../assets/images/arrowBack.svg'
import arrowForward from '../../../../assets/images/arrowForward.svg'
import { Link } from "react-router"
import { useMusic } from "../../../../context/music-context"
import ContentTop from "./ContentTop"


export default function ContentNext({
    setHasMore,
    itemCount
}) {
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

    // tfa - take from audio
    // tfp - take from playlists
    const [tfaList, setTfaList] = useState([])
    const [tfpList, setTfpList] = useState([])
    const [authors, setAuthors] = useState({})

    // const { changeOrderPlayback } = useMusic()

    const swiper = useSwiper()
    const audioSwiperRef = useRef(null)
    const plSwiperRef = useRef(null)

    const [countSlides, setCountSlides] = useState(0)

    const {
        isLoading: isLoadingTakeFromA,
        data: dataTakeFromA,
        isError: isErrorTakeFromA,
        error: errorTakeFromA,
        isSuccess: isSuccessTakeFromA
    } = useQuery({
        queryKey: ["query audio next from: ", itemCount+16],
        queryFn: () => musicService.getTakeFromA(itemCount+16)
    })

    const {
        isLoading: isLoadingTakeFromP,
        data: dataTakeFromP,
        isError: isErrorTakeFromP,
        error: errorTakeFromP,
        isSuccess: isSuccessTakeFromP
    } = useQuery({
        queryKey: ["query playlists next from: ", itemCount+8],
        queryFn: () => musicService.getTakeFromP(itemCount+8)
    })

    useEffect(() => {
        if (
            !dataTakeFromA
            || dataTakeFromA?.audioList.length === 0
            || !dataTakeFromP
            || dataTakeFromP?.playlistList.length === 0
        ) return;

        if (
            !dataTakeFromA
            || dataTakeFromA?.audioList.length < 16
            || !dataTakeFromP
            || dataTakeFromP?.playlistList.length < 8
        ) return setHasMore(false);

        setTfaList(dataTakeFromA.audioList)
        setTfpList(dataTakeFromP.playlistList)
        // changeOrderPlayback(dataTakeFromA.audioList)
        // console.log('dataTakeFromA.audioList:')
        // console.log(dataTakeFromA.audioList)
        // console.log('dataTakeFromP.audioList:')
        // console.log(dataTakeFromP.playlistList)
    }, [dataTakeFromA, dataTakeFromP])

    useEffect(() => {
        if (!tfaList.length) return;

        const fetchAuthors = async () => {
            const authorIds = [...new Set(tfaList.map(item => item.authorId))]

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
    }, [tfaList, authors])

    useEffect(() => {
        if (!tfpList.length) return;

        const fetchAuthors = async () => {
            const authorIds = [...new Set(tfpList.map(item => item.authorId))]

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
    }, [tfpList, authors])

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

    if (isLoadingTakeFromA || isLoadingTakeFromP) {
        return (
            <div>Загрузка...</div>
        )
    }

    if (isErrorTakeFromA) {
        return (
            <div>errorTakeFromA: {errorTakeFromA.response?.data?.message || errorTakeFromA.message}</div>
        )
    }

    if (isErrorTakeFromP) {
        return (
            <div>errorTakeFromP: {errorTakeFromP.response?.data?.message || errorTakeFromP.message}</div>
        )
    }

    return (
        <>
            <div
                className={style.AppContent__Wrapper__Block}
            >
                {/* {tfaList.length > 0 && ( */}
                {/* {true > 0 && ( */}
                <div
                    className={style.AppContent__Wrapper__Block__Audio}
                >
                    <ContentTop
                        safesSlidePrev={safesSlidePrev}
                        safesSlideNext={safesSlideNext}
                        itemCount={itemCount}
                    />
                    <Swiper
                        ref={audioSwiperRef}
                        style={{ width: '100%' }}
                        slidesPerView={4}
                        direction="horizontal"
                        navigation={{
                            nextEl: `.AppContent__Wrapper__Block__Audio__Top__Menu__Next__${itemCount}`,
                            prevEl: `.AppContent__Wrapper__Block__Audio__Top__Menu__Prev__${itemCount}`,
                        }}
                        onSwiper={(swiper) => {
                            audioSwiperRef.current = swiper
                        }}
                        onBeforeDestroy={() => {
                            audioSwiperRef.current = null;
                        }}
                        breakpoints={audioBreakpoints}
                    >
                        {/* {tfaList.slice(countSlides, countSlides + 4).map((item, index) => {
                            const slide = (
                                <SwiperSlide key={index}>
                                    test slide
                                    <div className={style.SwiperSlideContent}>
                                        {JSON.stringify(item)}
                                    </div>
                                </SwiperSlide>
                            )

                            setCountSlides(prev => prev + 4)

                            return slide;
                        })} */}
                        <SwiperSlide>
                            <div className={style.SwiperSlideContent}>
                                {tfaList.slice(0, 4).map((item, index) => {
                                    const author = authors[item.authorId];

                                    return (
                                        <Link
                                            to={`/listen?m=${item.id}`}
                                            key={`${item.id}-${index}-${Date.now()}`}
                                            className={style.AppContent__Wrapper__Block__Audio__List__Item}
                                        >
                                            <div className={style.AppContent__Wrapper__Block__Audio__List__Item__Preview}>
                                                <img
                                                    src={ item.preview ?
                                                        `/api/images/${item.preview}` : audioDefaultpreview
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
                                                    <Link
                                                        to={`/author?id=${author.id}`}
                                                        className={style.AppContent__Wrapper__Block__Audio__List__Item__Text__Author}
                                                    >
                                                        {author.name}
                                                    </Link>
                                                )}
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.SwiperSlideContent}>
                                {tfaList.slice(4, 8).map((item, index) => {
                                    const author = authors[item.authorId];

                                    return (
                                        <Link
                                            to={`/listen?m=${item.id}`}
                                            key={`${item.id}-${index}-${Date.now()}`}
                                            className={style.AppContent__Wrapper__Block__Audio__List__Item}
                                        >
                                            <div className={style.AppContent__Wrapper__Block__Audio__List__Item__Preview}>
                                                <img src={ item.preview ?
                                                    `/api/images/${item.preview}` : audioDefaultpreview
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
                                        </Link>
                                    )
                                })}
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.SwiperSlideContent}>
                                {tfaList.slice(8, 12).map((item, index) => {
                                    const author = authors[item.authorId];

                                    return (
                                        <Link
                                            to={`/listen?m=${item.id}`}
                                            key={`${item.id}-${index}-${Date.now()}`}
                                            className={style.AppContent__Wrapper__Block__Audio__List__Item}
                                        >
                                            <div className={style.AppContent__Wrapper__Block__Audio__List__Item__Preview}>
                                                <img
                                                    src={ item.preview ?
                                                        `/api/images/${item.preview}` : audioDefaultpreview
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
                                        </Link>
                                    )
                                })}
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className={style.SwiperSlideContent}>
                                {tfaList.slice(12, 16).map((item, index) => {
                                    const author = authors[item.authorId];

                                    return (
                                        <Link
                                            to={`/listen?m=${item.id}`}
                                            key={`${item.id}-${index}-${Date.now()}`}
                                            className={style.AppContent__Wrapper__Block__Audio__List__Item}
                                        >
                                            <div className={style.AppContent__Wrapper__Block__Audio__List__Item__Preview}>
                                                <img
                                                    src={ item.preview ?
                                                        `/api/images/${item.preview}` : audioDefaultpreview
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
                                        </Link>
                                    )
                                })}
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
                {/* )} */}
                { tfpList.length > 0 && (
                    <div
                        className={style.AppContent__Wrapper__Block__Playlist}
                    >
                        <div className={style.AppContent__Wrapper__Block__Playlist__Top}>
                                <p className={style.AppContent__Wrapper__Block__Playlist__Top__Title}>
                                    Плейлисты
                                </p>
                                <div className={style.AppContent__Wrapper__Block__Playlist__Top__Menu}>
                                    <button
                                        className={`${style.AppContent__Wrapper__Block__Playlist__Top__Menu__Prev}__${itemCount}`}
                                        type="button"
                                        onClick={safesPLPrev}
                                    >
                                        <img src={arrowBack} alt="Назад" />
                                    </button>
                                    <button
                                        className={`${style.AppContent__Wrapper__Block__Playlist__Top__Menu__Next}__${itemCount}`}
                                        type="button"
                                        onClick={safesPLNext}
                                    >
                                        <img src={arrowForward} alt="Вперёд" />
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
                                    nextEl: `.AppContent__Wrapper__Block__Playlist__Top__Menu__Next__${itemCount}`,
                                    prevEl: `.AppContent__Wrapper__Block__Playlist__Top__Menu__Prev__${itemCount}`,
                                }}
                                onSwiper={(swiper) => {
                                    plSwiperRef.current = swiper
                                }}
                                onBeforeDestroy={() => {
                                    plSwiperRef.current = null;
                                }}
                                breakpoints={plBreakpoints}
                            >
                            {tfpList.map((playlist, index) =>{
                                const author = authors[playlist.authorId];

                                return (
                                    <SwiperSlide
                                        key={`${playlist.id}-${index}-${Date.now()}`}
                                    >
                                        <Link
                                            to={`/listen?m=${playlist.musicList[0]}&p=${playlist.id}`}
                                            className={style.AppContent__Wrapper__Block__Playlist__List__Item}
                                        >
                                            <div className={style.AppContent__Wrapper__Block__Playlist__List__Item__Preview}>
                                                <img src={playlist.preview || playlistDefaultPreview} alt={playlist.title} />
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
                                        </Link>
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