import React, { useEffect, useMemo, useState } from "react"
import { useMainPage } from "../../../../context/main-page-context"

function ListItem({ index, isLast }) {
    const {
        isLoading,
        changeIsLoading,
        isInfinite,
        changeIsInfinite,
        tracks,
        showBlocks,
        target,
        hasTracksIsPending,
        changeHasMore
    } = useMainPage()

    const tracksArray = useMemo(() => {
        if (tracks.length === 0 || showBlocks === 0) {
            return []
        }

        console.log(`tracksArray ${index} сработал и прошёл условие`)
        // console.log(`tracks: ${JSON.stringify(tracks)}`)

        const current = index * showBlocks * 4
        // return tracks.slice(current, current + target)
        const array = tracks.slice(current, current + target)

        console.log(`tracksArray ${index}: ${JSON.stringify(array[0]?.id)}-${JSON.stringify(array[array.length - 1]?.id)}`)

        return array
    }, [tracks, showBlocks, target])

    useEffect(() => {
        if (!isLast) return;

        changeIsLoading(true)

        const timer = setTimeout(() => {
            changeIsLoading(false)
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [isLast, changeIsLoading])

    return (
        <div
            islast={isLast}
            style={{
                width: 300,
                height: 300,
                backgroundColor: 'red',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap'
            }}
        >
            {isLoading && isLast && (<p>Загрузка...</p>)}
            {tracksArray.length === 0 && (<div>tracksArray.length === 0</div>)}
            {tracksArray.length > 0 && (<div>tracksArray.length больше 0</div>)}
            Index: {index}
            {tracksArray.map((track, index) => (
                <p key={index}>Я трек {track.id}</p>
            ))}
        </div>
    )
}

export default React.memo(ListItem)