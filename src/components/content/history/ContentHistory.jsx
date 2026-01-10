import { useEffect, useState } from "react"
import { useEplayer } from "@/context/eplayer-context"
import PleaseAuth from "@/components/errors/PleaseAuth"
import { useQuery } from "@tanstack/react-query"
import { userService } from "@/services/user.service"
// import { LoadingOutlined } from '@ant-design/icons';
// import { Spin } from 'antd';
import style from './contentHistory.module.scss'
import HistoryItem from "./HistoryItem"
import HistoryLoading from "./components/HistoryLoading"
import HistoryError from "./components/HistoryError"
import HistoryNotFound from "./components/HistoryNotFound"

export default function ContentHistory() {
    const {
        isAuth,
        userId,
        access_token,
        refresh_token,
        changeAccessToken
    } = useEplayer()
    const [arrayStory, setArrayStory] = useState([])

    const {
        isLoading,
        data,
        isError,
        error,
        refetch,
        isSuccess
    } = useQuery({
        queryKey: ["history: ", userId],
        queryFn: () => userService.getHistory(access_token, refresh_token, changeAccessToken),
        enabled: false,
    })

    useEffect(() => {
        if (!data) return;

        setArrayStory(
            data.sort((a, b) => new Date(b.listenAt) - new Date(a.listenAt))
        )
    }, [isSuccess])

    useEffect(() => {
        refetch()
    }, [])

    if (!isAuth) {
        return <PleaseAuth />
    }

    if (isLoading) {
        return <HistoryLoading />
    }

    if (isError) {
        return <HistoryError error={error} />
    }

    if (data?.length === 0) {
        return <HistoryNotFound />
    }

    return (
        <>
            <div className={style.ContentHistory}>
                <div className={style.ContentHistory__Container}>
                    <p className={style.ContentHistory__Container__Title}>
                        История прослушивания
                    </p>
                    <div
                        className={style.ContentHistory__Container__List}
                        style={{color: '#fff'}}
                    >
                        {arrayStory.map((item, index) => (
                            <HistoryItem
                                key={index}
                                story={item}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}