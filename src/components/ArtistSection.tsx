import { useAudioPlayer } from '../hooks/useAudioPlayer'

interface Track {
  id: string
  title: string
  src: string
}

interface ArtistSectionProps {
  id: string
  catalogNo: string
  name: string
  title: string
  description: string
  track: Track
}

export function ArtistSection({
  id,
  catalogNo,
  name,
  title,
  description,
  track,
}: ArtistSectionProps) {
  const { currentTrack, isPlaying, playPause } = useAudioPlayer()
  const isCurrentTrack = currentTrack?.id === track.id
  const isThisPlaying = isPlaying && isCurrentTrack

  return (
    <section id={id} className="artist">
      <div className="content">
        <span className="cat-no">WW &diams; {catalogNo}</span>
        <h2>{name}</h2>
        <h3>&ldquo;{title}&rdquo;</h3>
        <p>{description}</p>
        <div>
          <button
            onClick={() => playPause(track)}
            className={isThisPlaying ? 'playing' : ''}
          >
            <span>{isThisPlaying ? 'Now Playing' : 'Listen'}</span>
          </button>
          <button className="sold-out" disabled>
            <span>Sold Out</span>
          </button>
        </div>
      </div>
    </section>
  )
}
