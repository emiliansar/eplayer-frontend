import { useMainPage } from "../../../../context/main-page-context"

export default function Test() {
    const {
        tracks,
        blocksCount,
        changeBlocksCount,
        isCanOn,
        changeIsCanOn
    } = useMainPage()

    return (
        <>
            <div>
                <p>Test...</p>
                <p>Количество: {blocksCount}</p>
                <p>Длина tracks: {tracks.length}</p>
                <button
                    onClick={changeIsCanOn}
                >
                    {isCanOn ? "Выключить" : "Включить"} добавление блоков
                </button>
                <br />
                <button
                    onClick={() => changeBlocksCount(prev => prev + 1)}
                >
                    Увеличить количесвто
                </button>
            </div>
        </>
    )
}