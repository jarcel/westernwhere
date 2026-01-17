import { useAudioPlayer } from '../hooks/useAudioPlayer.tsx'

export function MobilePlayerBar() {
  const { currentTrack, isPlaying, currentTime, duration, seek } = useAudioPlayer()

  const progress = duration > 0 ? currentTime / duration : 0

  const handleSeek = (e: React.MouseEvent<HTMLProgressElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    const newTime = percentage * duration
    seek(newTime)
  }

  return (
    <div className="mobile-bar">
      <div className={`track-info ${isPlaying ? 'visible' : ''}`}>
        <span>Now Playing</span> {currentTrack ? `${currentTrack.artist} - "${currentTrack.title}"` : ''}
      </div>
      <div className="progress-bar" onClick={handleSeek}>
        <div
          className="progress-fill"
          style={{
            width: `${progress * 100}%`,
            transition: isPlaying ? 'width 0.25s linear' : 'none'
          }}
        />
      </div>
    </div>
  )
}
