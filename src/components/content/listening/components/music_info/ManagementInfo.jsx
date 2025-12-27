import { useQuery } from "@tanstack/react-query"
import { useMusic } from "../../../../../context/music-context"
import { authorService } from "../../../../../services/author.service"
import { useEffect } from "react"
import style from '../../ContentListening.module.scss'

export default function ManagementInfo() {
    const { currentPlaylistId, currentTrack } = useMusic()

    const {
        data: dataAuthor,
        refetch: refetchAuthor
    } = useQuery({
        queryKey: ['request author by id ', currentTrack?.authorId],
        queryFn: () => authorService.getAuthor(currentTrack?.authorId),
        enabled: true,
        retry: 0
    })

    useEffect(() => {
        if (!currentTrack || !currentTrack?.authorId)
        {
            return
        }

        refetchAuthor()
    }, [currentTrack])

    return (
        <div className={style.ListenMusicInfo__Content__Management__Info}>
            <p className={style.ListenMusicInfo__Content__Management__Info__Type}>
                {
                    currentPlaylistId ? "Плейлист" : "Трек"
                }
            </p>
            <p className={style.ListenMusicInfo__Content__Management__Info__Title}>
                {currentTrack.title}
            </p>
            { dataAuthor?.id && (
                <p className={style.ListenMusicInfo__Content__Management__Info__AuthorName}>
                    {dataAuthor.name}
                </p>
            )}
        </div>
    )
}