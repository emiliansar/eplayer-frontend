import { useQuery } from "@tanstack/react-query"
import { musicService } from "../../../services/music.service"
import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import style from './contentHistory.module.scss'
import audioDefaultPreview from '../../../assets/images/audioDefaultPreview.jpeg'
import { useEffect } from "react"
import { Link } from "react-router"
import HistoryLoading from "./components/HistoryLoading"
import { authorService } from "../../../services/author.service"
import { someService } from "../../../services/some.service"

export default function HistoryItem({ story }) {
    // console.log("HistoryItem story: ", story)
    const {
        isLoading,
        data,
        error,
        isError,
        refetch
    } = useQuery({
        queryKey: [`get music by id: ${story?.musicId}`],
        queryFn: () => musicService.getMetaData(story?.musicId),
        enabled: !!story?.musicId,
        retry: 0,
    })

    const {
        isLoading: isLoadingAuthor,
        data: dataAuthor,
        isError: isErrorAuthor,
        error: errorAuthor,
        refetch: refetchAuthor
    } = useQuery({
        queryKey: ['get author by id ', story?.authorId],
        queryFn: () => authorService.getAuthor(story?.authorId),
        enabled: !!story?.authorId,
        retry: 0
    })

    if (isLoading) {
        return <HistoryLoading />
    }

    if (!data?.id) {
        return null;
    }

    return (
        <div
            className={style.ContentHistory__Container__List__Item}
        >
            <Link
                to={`/listen?m=${data.id}`}
                className={style.ContentHistory__Container__List__Item__Preview}
            >
                <img
                    src={data.preview ? `/api/images/${ data.preview }` : audioDefaultPreview}
                    alt="Обложка"
                />
            </Link>

            <div className={style.ContentHistory__Container__List__Item__Text}>
                <Link
                    to={`/listen?m=${data.id}`}
                    className={style.ContentHistory__Container__List__Item__Text__Title}
                >
                    {data.title}
                </Link>
                <div className={style.ContentHistory__Container__List__Item__Text__Desc}>
                    { dataAuthor?.id && (
                        <Link
                            to={`/author?id=${dataAuthor?.id}`}
                            className={style.ContentHistory__Container__List__Item__Text__Desc__Author}
                        >
                            {dataAuthor.name}
                        </Link>
                    )}
                    <p className={style.ContentHistory__Container__List__Item__Text__Desc__Time}>
                        {someService.timeDiff(story?.listenAt)}
                    </p>
                </div>
            </div>
        </div>
    )
}