import { musicService } from "../services/music.service";

export const useAosQuery = (quantityTake, access_token, refresh_token, changeAccessToken) => {
  return {
        isLoading: isAosMoreLoading,
        data: aosMoreData,
        isError: isAosMoreError,
        error: aosMoreError,
        isFetching: isAosMoreFetching,
        isSuccess: isAosMoreSuccess,
        refetch: aosMoreRefetch
    } = useQuery({
        queryKey: ['audioMoreRefetch: ', quantityTake],
        queryFn: () => musicService.getAudioMore(quantityTake, access_token, refresh_token ,changeAccessToken),
        enabled: quantityTake,
  });
};

export const usePosQuery = (quantityTake, access_token, refresh_token, changeAccessToken) => {
  return {
        isLoading: isPosMoreLoading,
        data: posMoreData,
        isError: isPosMoreError,
        error: posMoreError,
        isFetching: isPosMoreFetching,
        isSuccess: isPosMoreSuccess,
        refetch: posMoreRefetch
    } = useQuery({
        queryKey: ['playlistsMoreRefetch: ', quantityTake],
        queryFn: () => musicService.getPlaylistsMore(quantityTake, access_token, refresh_token ,changeAccessToken),
        enabled: quantityTake,
  });
};