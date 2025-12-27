import { useEplayer } from "../../../context/eplayer-context";
import style from './appContent.module.scss'
import ContentSubscribe from "./components/ContentSubscribe";
import ContentNext from "./components/ContentNext";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component'
import { useInView } from 'react-intersection-observer'

export default function AppContent() {
    const {isAuth, userId} = useEplayer()
    const [nextCount, setNextCount] = useState([1])
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    const [ref, inView] = useInView({ threshold: 0.5 })

    useEffect(() => {
        if (inView && !isLoading && hasMore) {
            setIsLoading(true)
            setTimeout(() => {
                setNextCount(prev => [...prev, prev.length + 1])
                setIsLoading(false)
            }, 2000)
        }
    }, [inView, isLoading])

    return (
        <div className={style.AppContent}>
            <div className={style.AppContent__Container}>
                <div className={style.AppContent__Wrapper}>
                    { isAuth && <ContentSubscribe /> }
                    <div
                        className={style.AppContent__Wrapper__NextScroll}
                    >
                        {nextCount.map((next, index) => (
                            <div
                                key={next}
                                key-value={index}
                                ref={index === nextCount.length - 1 ? ref : null}
                                className={style.AppContent__Wrapper__NextScroll__Item}
                            >
                                <ContentNext
                                    setHasMore={setHasMore}
                                    itemCount={index}
                                />
                            </div>
                        ))}
                        {isLoading && <div>Загрука...</div>}
                        {!hasMore && <div>Упс... Вы всё прослушали</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}