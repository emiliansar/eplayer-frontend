import { useEffect, useState } from "react"
import { useMainPage } from "../../../../context/main-page-context"
import { useInView } from "react-intersection-observer"
import ListItem from "./ListItem"

export default function ContentList() {
    const [nextCount, setNextCount] = useState([1])
    const {
        tracks,
        isLoading,
        hasMore,
        isInfinite,
        changeBlocksCount,
        isCanOn,
        showBlocks,
        target
    } = useMainPage()
    const [ref, inView] = useInView({ threshold: 0.5 })

    useEffect(() => {
        if (showBlocks === 0 || target === 0) return

        if (hasMore && isCanOn && !isLoading) {
            setNextCount(prev => [...prev, prev.length + 1]);
        }

        // const totalBlocks = Math.ceil(tracks.length / (showBlocks * 4))
        // const newCount = Array.from({ length: totalBlocks }, (_, i) => i + 1)

        // setNextCount(newCount)
    }, [tracks, showBlocks, target])

    // useEffect(() => {
    //     if (inView && !isLoading && hasMore && isCanOn) {
    //         changeBlocksCount(prev => prev + 1)
    //         // setNextCount(prev => [...prev, prev.length + 1])
    //     }
    // }, [inView, isLoading, hasMore, isCanOn])

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 10
            }}
        >
            {isLoading && (<div>Загрузка...</div>)}
            {nextCount.map((next, index) => (
                <div
                    key={index}
                    ref={index === nextCount.length - 1 ? ref : null}
                    data-block={`nextCount item: ${index}`}
                >
                    <ListItem
                        index={index}
                        isLast={index === nextCount.length - 1 ? true : false}
                    />
                </div>
            ))}
            {!hasMore && tracks.length > 0 && (
                <div
                    style={{
                        textAlign: 'center',
                        padding: 20
                    }}
                >
                    Все данные загружены
                </div>
            )}
        </div>
    )
}