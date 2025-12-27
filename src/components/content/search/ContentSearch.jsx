import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router"
import { searchService } from "../../../services/search.service"
import style from './ContentSearch.module.scss'
import { useEplayer } from "../../../context/eplayer-context"
import SearchItem from "./components/SearchItem"
import SearchLoading from "./components/SearchLoading"
import SearchNotFound from "./components/SearchNotFound"

export default function ContentSearch() {
    const {
        searchQuery
    } = useEplayer()
    const [searchParams, setSearchParams] = useSearchParams()
    const textParam = searchParams.get('text')
    const [queryText, setQueryText] = useState('')

    const {
        isLoading: isLoadingSearch,
        data: dataSearch,
        isError: isErrorSearch,
        error: errorSearch,
        isSuccess: isSuccessSearch,
        refetch: refetchSearch
    } = useQuery({
        queryKey: ['search by ', queryText],
        queryFn: () => searchService.search(queryText),
        retry: 0,
        enabled: false
    })

    useEffect(() => {
        if (textParam) {
            setQueryText(textParam.split('+').join(' '))
        }
    }, [textParam])

    useEffect(() => {
        if (queryText) {
            refetchSearch()
        }
    }, [queryText])

    useEffect(() => {
        if (dataSearch?.total) {
            console.log(dataSearch)
        }
    }, [dataSearch])

    if (isLoadingSearch) {
        return <SearchLoading />
    }

    if (isErrorSearch) {
        console.log(errorSearch);
        return <SearchError />
    }

    if (isSuccessSearch
        && dataSearch.total === 0
    ) {
        console.log(dataSearch);
        return <SearchNotFound searchQuery={searchQuery} />
    }

    return isSuccessSearch && (
        <div className={style.ContentSearch}>
            <div className={style.ContentSearch__Container}>
                <div className={style.ContentSearch__List}>
                    { dataSearch.results?.map((item, index) => (
                        <div
                            key={index}
                            className={style.ContentSearch__List__Item}
                        >
                            <SearchItem result={item} />
                        </div>
                    )) }
                </div>
            </div>
        </div>
    )
}