import style from './appAuth.module.scss'
import { Outlet } from "react-router"
import { message } from "antd"

export default function AppAuth() {
    const [messageApi, contextHolder] = message.useMessage();
    const success = (text) => {
        messageApi.open({
            type: 'success',
            content: text,
        });
    };
    const error = (text) => {
        messageApi.open({
            type: 'error',
            content: text,
        });
    };

    return (
        <>
            { contextHolder }
            <div className={style.AppAuth}>
                <Outlet context={{ success, error }} />
            </div>
        </>
    )
}


























































// const [isLoading, setIsLoading] = useState(true)
    // setTimeout(() => {
    //     setIsLoading(false)
    // }, 5000)


    // const [stateError, setStateError] = useState('')
    // const {ctxLoading, access_token, refresh_token, changeAccessToken} = useEplayer();

    // const {isLoading, refetch, data, isFetching, isError, error} = useQuery({
    //     queryKey: ['profile', access_token],
    //     queryFn: () => authService.profile(access_token, refresh_token, changeAccessToken),
    //     enabled: false,
    //     retry: false
    // })

    // useEffect(() => {
    //     if (isError) {
    //         setStateError(error.response?.data?.message || error.message)
    //     }
    // }, [isError, error])