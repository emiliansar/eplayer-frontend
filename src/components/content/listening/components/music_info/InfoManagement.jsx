import { useQuery } from '@tanstack/react-query'
import { useMusic } from '../../../../../context/music-context'
import style from '../../ContentListening.module.scss'
import { authorService } from '../../../../../services/author.service'
import { useEffect } from 'react'
import ManagementInfo from './ManagementInfo'
import ManagementMenu from './ManagementMenu'

export default function InfoManagement() {
    const { currentTrack } = useMusic()

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
        <div
            className={style.ListenMusicInfo__Content__Management}
        >
            <ManagementInfo />
            <ManagementMenu />
        </div>
    )
}