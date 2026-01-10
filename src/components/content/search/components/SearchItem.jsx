import { Link } from 'react-router'
import style from '../ContentSearch.module.scss'
// import audioDefaultpreviewImg from '../../../../assets/images/audioDefaultpreview.jpeg'
// import moreHorizImg from '../../../../assets/images/moreHoriz.svg'
import { useQuery } from '@tanstack/react-query'
import { authorService } from '@/services/author.service'
import { useEffect } from 'react'
import { Popover } from 'antd';
// import PopoverCurrTrack from '../../../assistants/popovers/PopoverCurrTrack';
import PopoverMusic from '@/components/assistants/popovers/PopoverMusic'
import { useMusic } from '@/context/music-context'

export default function SearchItem({ result }) {

    const { currentTrackId } = useMusic()

    const {
        data: dataAuthor,
        refetch: refetchAuthor
    } = useQuery({
        queryKey: ['get author by id ', result.authorId],
        queryFn: () => authorService.getAuthor(result.authorId),
        retry: 0,
        enabled: false
    })

    useEffect(() => {
        if (result.dataAuthor) {
            refetchAuthor()
        }
    }, [result])

    useEffect(() => {
        console.log(dataAuthor)
    }, [dataAuthor])

    return (
        <div className={style.SearchItem}>
            <div
                className={style.SearchItem__Content}
            >
                <Link
                    to={`/listen?m=${result.id}`}
                    className={style.SearchItem__Preview}
                >
                    <img
                    style={{
                        width: 100
                    }}
                        src={result.preview ? `/api/images/${result.preview}` : '/assets/images/audioDefaultpreview.jpeg'}
                        alt="Абложка"
                    />
                    <div
                        className={`${style.SearchItem__Preview__Active} ${
                            currentTrackId !== result.id ? style.SearchItem__Preview__DisActive : null
                        }`}
                    >
                        <div className={style.SearchItem__Preview__Active__Circle}></div>
                    </div>
                </Link>
                <div className={style.SearchItem__Info}>
                    <Link
                        to={`/listen?m=${result.id}`}
                        className={style.SearchItem__Info__Title}
                    >
                        {result.title}
                    </Link>
                    <Link
                        to={`/author?id=${result.author?.id}`}
                        className={style.SearchItem__Info__Author}
                    >
                        {result.author?.name}
                    </Link>
                </div>
            </div>
            <div className={style.SearchItem__Action}>
                <Popover
                    content={<PopoverMusic musicId={result.id} />}
                    title=""
                    trigger="click"
                    color="#2e2e2e"
                >
                    <button
                        className={style.SearchItem__Action__Btn}
                    >
                        <img src='/assets/images/moreHoriz.svg' />
                    </button>
                </Popover>
            </div>
        </div>
    )
}