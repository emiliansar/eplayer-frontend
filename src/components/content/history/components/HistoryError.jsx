export default function HistoryError({ error }) {
    return (
        <div className="error">
            <p>{error.response?.message}</p>
        </div>
    )
}