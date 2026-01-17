import { useAudioPlayer, Track } from '../hooks/useAudioPlayer.tsx'
import { usePageScroll } from '../hooks/usePageScroll.tsx'
import recordSvg from '../assets/img/ww-record.svg'
import sleeveWebp from '../assets/img/ww-sleeve.webp'

interface RecordPlayerProps {
  defaultTrack: Track
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <polygon points="5,3 19,12 5,21" fill="currentColor" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24">
      <rect x="5" y="3" width="4" height="18" fill="currentColor" />
      <rect x="15" y="3" width="4" height="18" fill="currentColor" />
    </svg>
  )
}

export function RecordPlayer({ defaultTrack }: RecordPlayerProps) {
  const { isPlaying, currentTime, duration, currentTrack, playPause } = useAudioPlayer()
  const { dismissWelcome } = usePageScroll()

  const progress = duration > 0 ? currentTime / duration : 0
  const circumference = 2 * Math.PI * 70
  const strokeDashoffset = circumference * (1 - progress)

  const handlePlayPause = () => {
    const trackToPlay = currentTrack || defaultTrack
    playPause(trackToPlay)
  }

  const handleScrollDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    dismissWelcome()
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  return (
    <div className="record-container" onClick={handlePlayPause}>
      <img className="rc-sleeve" src={sleeveWebp} alt="" />
      <img
        id="ww-record"
        className={isPlaying ? 'play' : ''}
        src={recordSvg}
        alt=""
      />
      <div className={`rc-progress ${!isPlaying ? 'hidden' : ''}`}>
        <svg viewBox="0 0 160 160" width="160" height="160">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="rgba(0,0,0,0.7)"
            strokeWidth="20"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="20"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 80 80)"
            style={{ transition: isPlaying ? 'stroke-dashoffset 0.25s linear' : 'none' }}
          />
        </svg>
      </div>
      <div className="rc-player">
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </div>
      <div className="scroll-lure" onClick={handleScrollDown}></div>
    </div>
  )
}
