import { useMutation } from "@tanstack/react-query";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { musicService } from "../services/music.service";

const MainPageContext = createContext()

export const MainPageContextProvider = ({ children }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [tracks, setTracks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [blocksCount, setBlocksCount] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const [lastBlockHasData, setLastBlockHasData] = useState(false)

    // TODO 1) Вычисление showBlocks с шириной экрана
    const [showBlocks, setShowBlocks] = useState(0)

    const skip = useMemo(() => {
        if (showBlocks > 0 && blocksCount > 0) {
            return (blocksCount - 1) * showBlocks * 4
        }
    }, [blocksCount, showBlocks])

    const target = useMemo(() => {
        if (showBlocks > 0) {
            return showBlocks * 4
        }
    }, [showBlocks])

    const hasTracksIsPending = useRef(false)

    const [isCanOn, setIsCanOn] = useState(true)

    useEffect(() => {
        if (width >= 1640) return setShowBlocks(4)
        if (width >= 1280) return setShowBlocks(3)
        if (width >= 860) return setShowBlocks(2)
        if (width >= 560) return setShowBlocks(1)
    }, [width])

    // TODO 2) Запросы на сервер со skip и target

    const {
        mutate: tracksMutate,
        isPending: tracksIsPending
    } = useMutation({
        mutationKey: [`new ${target} from ${skip}`],
        mutationFn: () => musicService.getTakeFromA(skip, target),
        onSuccess: (data) => {
            if (data.audioList.length === 0) {
                setHasMore(false)
            } else {
                setTracks(prev => ([...new Set([...prev, ...data.audioList])]))
            }

            hasTracksIsPending.current = false
        },
        onError: (err) => {
            console.log("MainPageContext Error: ", err)
            hasTracksIsPending.current = false
        }
    })

    useEffect(() => {
        if (showBlocks === 0 || tracks.length === 0) return

        const lastBlockIndex = blocksCount - 1
        const lastBlockStart = lastBlockIndex * showBlocks * 4
        const lastBlockData = tracks.slice(lastBlockStart, lastBlockStart + target)

        if (lastBlockData.length === 0 && !hasTracksIsPending.current) {
            setHasMore(false)
        } else if (lastBlockData.length > 0) {
            setHasMore(true)
        }
    }, [tracks, blocksCount, showBlocks, target])

    useEffect(() => {
        if (showBlocks === 0) return
        if (!hasMore) return
        if (tracks.length > skip) return
        if (tracksIsPending) return
        if (hasTracksIsPending.current) return

        if (tracks.length <= skip && !tracksIsPending) {
            hasTracksIsPending.current = true
            tracksMutate()
        }
    }, [blocksCount, hasMore])

    useEffect(() => {
        console.log(tracks)
    }, [tracks])

    const changeIsLoading = useCallback((value) => {
        setIsLoading(value)
    }, [])

    const changeHasMore = useCallback((value) => {
        setHasMore(value)
    }, [])

    const changeIsCanOn = useCallback((value) => {
        setIsCanOn(prev => !prev)
    }, [])

    if (showBlocks === 0) {
        return null
    }

    const value = {
        tracks,
        // isInfinite,
        // changeIsInfinite,
        hasMore,
        changeHasMore,
        isLoading,
        changeIsLoading,
        blocksCount,
        changeBlocksCount: setBlocksCount,
        showBlocks,
        skip,
        target,
        isCanOn,
        changeIsCanOn,
        hasTracksIsPending
    }

    return (
        <MainPageContext.Provider value={value}>
            { children }
        </MainPageContext.Provider>
    )
}

export const useMainPage = () => {
    const context = useContext(MainPageContext);

    if (!context) {
        throw new Error("useMainPage must be used within a MainPageProvider")
    }

    return context;
}