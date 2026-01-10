import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import style from '../control.module.scss'
// import audioDefaultpreview from '../../../assets/images/audioDefaultpreview.jpeg'
import { useMusic } from "@/context/music-context"
import { musicService } from "@/services/music.service"
import { authorService } from "@/services/author.service"

export default function OrderMiniItem({ musicId }) {

    const { currentPlaylistId, currentTrackId, changeCurrentTrackId, isPlaying } = useMusic()

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
        <button
            onClick={() => changeCurrentTrackId(musicId)}
            className={style.OrderMiniItem}
        >
            <div className={style.OrderMiniItem__Preview}>
                <img
                    src={dataMusic.preview ? `/api/images/${dataMusic.preview}` : '/assets/images/audioDefaultpreview.jpeg'}
                    alt="Абложка"
                    style={{
                        width: 50
                    }}
                />
                { (musicId === currentTrackId)
                    && isPlaying
                    && (
                    <div className={style.OrderMiniItem__Preview__Active}>
                        <div className={style.OrderMiniItem__Preview__Active__Circle}></div>
                    </div>
                )}
            </div>
            <div
                className={style.OrderMiniItem__Text}
            >
                <p className={style.OrderMiniItem__Text__Title}>
                    {dataMusic.title || "Ничего..."}
                </p>
                { dataAuthor?.id && (
                    <p
                        className={style.OrderMiniItem__Text__Author}
                    >
                        {dataAuthor.name}
                    </p>
                )}
            </div>
        </button>
    )
}