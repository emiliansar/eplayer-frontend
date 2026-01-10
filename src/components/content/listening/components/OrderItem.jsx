import { useQuery } from "@tanstack/react-query"
import { musicService } from "@/services/music.service"
// import audioDefaultpreview from '../../../../assets/images/audioDefaultpreview.jpeg'
import { authorService } from "@/services/author.service"
import { useEffect } from "react"
import style from '../ContentListening.module.scss'
import { Link } from "react-router"
import { useMusic } from "@/context/music-context"

export default function OrderItem({ musicId }) {

    const { currentTrackId, currentPlaylistId, isPlaying } = useMusic()

    const {
        isLoading: isLoadingMusic,
        data: dataMusic,
        isError: isErrorMusic,
        error: errorMusic,
        isSuccess: isSuccessMusic,
        refetch: refetchMusic
    } = useQuery({
        queryKey: ['get audio by id: ', musicId],
        queryFn: () => musicService.getMetaData(musicId),
        enabled: false,
        retry: 0
    })

    const {
        isLoading: isLoadingAuthor,
        data: dataAuthor,
        isError: isErrorAuthor,
        error: errorAuthor,
        isSuccess: isSuccessAuthor,
        refetch: refetchAuthor
    }=  useQuery({
        queryKey: ['get author by id: ', dataMusic?.authorId],
        queryFn: () => authorService.getAuthor(dataMusic?.authorId),
        enabled: false,
        retry: 0
    })

    useEffect(() => {
        if (!musicId || typeof(+musicId) !== 'number')
        {
            return
        }

        refetchMusic()
    }, [musicId])

    useEffect(() => {
        if (!dataMusic?.authorId
            || typeof(dataMusic?.authorId) !== 'number'
        )
        {
            return
        }

        refetchAuthor()
    }, [dataMusic?.authorId])

    return dataMusic?.id && (
        <div className={style.orderItem}>
            <div className={style.orderItem__Preview}>
                <img
                    src={dataMusic.preview ? `/api/images/${dataMusic.preview}` : '/assets/images/audioDefaultpreview.jpeg'}
                    alt="Абложка"
                />
                { musicId === currentTrackId
                    && isPlaying
                    && (
                    <div className={style.orderItem__Preview__Active}>
                        <div className={style.orderItem__Preview__Active__Circle}></div>
                    </div>
                )}
            </div>
            <Link
                to={`/listen?m=${dataMusic.id}&p=${currentPlaylistId}`}
                className={style.orderItem__Text}
            >
                <p className={style.orderItem__Text__Title}>
                    {dataMusic.title || "Ничего..."}
                </p>
                { dataAuthor?.id && (
                    <p
                        className={style.orderItem__Text__AuthorLink}
                    >
                        {dataAuthor.name}
                    </p>
                )}
            </Link>
        </div>
    )
}