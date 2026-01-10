import { useEffect, useState } from "react"
import { useAuthor } from "@/context/author-context"
import { useQuery } from "@tanstack/react-query";
import { authorService } from "@/services/author.service";
import style from '../ContentAuthor.module.scss'
import TrackItem from "./TrackItem";
import TrackNotFound from "./TrackNotFound";

export default function AuthorTracks() {
    const { author } = useAuthor()

    const {
        isLoading: isLoadingTracks,
        data: dataTracks,
        isError: isErrorTracks,
        error: errorTracks,
        isSuccess: isSuccessTracks,
        refetch: refetchTracks
    } = useQuery({
        queryKey: ['get music by author id: ', author.id],
        queryFn: () => authorService.getMusic(author.id),
        retry: 5,
        enabled: false
    })

    useEffect(() => {
        if (author?.id) {
            refetchTracks()
        }
    }, [author])

    useEffect(() => {
        if (dataTracks) {
            console.log(dataTracks)
        }
    }, [dataTracks])

    if (!author?.id
        || dataTracks?.length === 0
    ) {
        return <TrackNotFound />
    }

    return dataTracks?.length > 0 && (
        <div className={style.AuthorTracks}>
            <div className={style.AuthorTracks__Container}>
                <ul className={style.AuthorTracks__List}>
                    { dataTracks?.map((item, index) => (
                        <li
                            key={index}
                            className={style.AuthorTracks__List__Item}
                        >
                            <TrackItem item={item} />
                            <div className={style.AuthorTracks__List__Item__Back}></div>
                        </li>
                    )) }
                </ul>
            </div>
        </div>
    )
}