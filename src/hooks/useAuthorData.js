function useAuthorData({authorId}) {
    return useQuery({
        queryKey: ["author", authorId],
        queryFn: () => authorServices.getAuthor(authorId)
    })
}