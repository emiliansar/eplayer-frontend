import { useEffect } from "react"
import { useAuthor } from "@/context/author-context"
import { useQuery } from "@tanstack/react-query"
import { authorService } from "@/services/author.service"
import PlItem from "./PlItem"
import style from '../ContentAuthor.module.scss'
import PlNotFound from "./PlNotFound"

export default function AuthorPlaylists() {
    const { author } = useAuthor()

    const {
        isLoading: isLoadingPls,
        data: dataPls,
        isError: isErrorPls,
        error: errorPls,
        isSuccess: isSuccessPls,
        refetch: refetchPls
    } = useQuery({
        queryKey: ['get pls by author id: ', author.id],
        queryFn: () => authorService.getPls(author.id),
        retry: 0,
        enabled: false
    })

    useEffect(() => {
        if (author?.id) {
            refetchPls()
        }
    }, [author])

    useEffect(() => {
        console.log(dataPls)
    }, [dataPls])

    if (!author?.id
        || dataPls?.length === 0
    ) {
        return <PlNotFound />
    }

    return dataPls?.length > 0 && (
        <div className={style.AuthorPls}>
            <div className={style.AuthorPls__Container}>
                <ul className={style.AuthorPls__List}>
                    { dataPls?.map((item, index) => (
                        <li
                            key={index}
                            className={style.AuthorPls__List__Item}
                        >
                            <PlItem item={item} />
                            <div className={style.AuthorPls__List__Item__Back}></div>
                        </li>
                    )) }
                </ul>
            </div>
        </div>
    )
}