import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { authorService } from "../services/author.service";

const AuthorContext = createContext()

export const AuthorContextProvider = ({ children }) => {
    const [authorId, setAuthorId] = useState(0)
    const [author, setAuthor] = useState({})

    const {
        isLoading: isLoadingAuthor,
        data: dataAuthor,
        isError: isErrorAuthor,
        error: errorAuthor,
        isSuccess: isSuccessAuthor,
        refetch: refetchAuthor
    } = useQuery({
        queryKey: ['get author by id: ', authorId],
        queryFn: () => authorService.getAuthor(authorId),
        retry: 5,
        enabled: false
    })

    useEffect(() => {
        if (authorId && authorId !== 0 && !isNaN(authorId)) {
            refetchAuthor()
            console.log(authorId)
        }
    }, [authorId])

    useEffect(() => {
        if (dataAuthor
            && dataAuthor.id !== 0
        ) {
            setAuthor(dataAuthor)
            console.log(dataAuthor)
        }
    }, [dataAuthor])

    const value = {
        authorId,
        changeAuthorId: setAuthorId,
        author,
    }

    return (
        <AuthorContext.Provider value={value}>
            { children }
        </AuthorContext.Provider>
    )
}

export const useAuthor = () => {
    const context = useContext(AuthorContext)
    if (!context) {
        throw new Error('useAuthor must be used within a AuthorProvider')
    }

    return context
}