import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/services/auth.service";
import { useMutation, useQuery } from "@tanstack/react-query";

const EplayerContext = createContext({
    isAuth: false,
    dateAuth: 0,
    userId: 0,
    user: {},
    access_token: '',
    refresh_token: '',
    ctxLoading: false,
    searchQuery: ''
})

export function EplayerContextProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false)
    const [dateAuth, setDateAuth] = useState('')
    const [userId, setUserId] = useState(0)
    const [user, setUser] = useState({})
    const [access_token, setAccess_token] = useState('')
    const [refresh_token, setRefresh_token] = useState('')
    const [ctxLoading, setCtxLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    function changeUserId(state) {
        setUserId(state)
    }

    function changeRefreshToken(state) {
        console.log("changeRefresh get: " + state)
        setRefresh_token(state)
    }

    function changeAccessToken(state) {
        setAccess_token(state)
    }

    function changeIsAuth(state) {
        setIsAuth(state)
    }

    function changeDateAuth(state) {
        setDateAuth(state)
    }

    const { data, isFetching, isError, error, isSuccess, refetch} = useQuery({
        queryKey: ['get user'],
        queryFn: () => authService.user(access_token, refresh_token, changeAccessToken),
        enabled: false,
    });

    useEffect(() => {
        if (!access_token) return;

        refetch()
    }, [access_token])

    useEffect(() => {
        if (!data?.id) return;

        setUserId(data.id)
        setUser(data)
        console.log(user)
    }, [data])

    useEffect(() => {
        if (!userId) return;

        console.log('userID: ', userId)
    }, [userId])

    useEffect(() => {
        if (!user) return;

        console.log('user: ', user)
    }, [user])

    const value = {
        ctxLoading,
        isAuth,
        userId,
        user,
        dateAuth,
        access_token,
        refresh_token,
        changeIsAuth,
        changeUserId,
        changeUser: setUser,
        changeDateAuth,
        changeAccessToken,
        changeRefreshToken,
        searchQuery,
        changeSearchQuery: setSearchQuery
    }

    return (
        <EplayerContext.Provider value={value}>
            { children }
        </EplayerContext.Provider>
    )
}

export default EplayerContext

export function useEplayer() {
    return useContext(EplayerContext)
}