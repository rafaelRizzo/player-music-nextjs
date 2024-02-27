export function CardTrackDetails({ nameTrack, authorTracker }) {
    return (
        <>
            <div className="card-music-name text-2xl font-semibold text-zinc-700 dark:text-zinc-200">{nameTrack}</div>
            <div className="card-music-author text-zinc-500 dark:text-zinc-400 font-light">{authorTracker}</div>
        </>
    )
}