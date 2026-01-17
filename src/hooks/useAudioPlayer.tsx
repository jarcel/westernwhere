import { createContext, useContext, useState, useRef, useEffect, useCallback, ReactNode } from 'react'

export interface Track {
  id: string
  title: string
  src: string
}

interface AudioPlayerContextType {
  currentTrack: Track | null
  isPlaying: boolean
  currentTime: number
  duration: number
  play: (track: Track) => void
  pause: () => void
  playPause: (track: Track) => void
  seek: (time: number) => void
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null)

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = new Audio()
    audioRef.current = audio

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleDurationChange = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('durationchange', handleDurationChange)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('durationchange', handleDurationChange)
      audio.removeEventListener('ended', handleEnded)
      audio.pause()
    }
  }, [])

  const play = useCallback((track: Track) => {
    const audio = audioRef.current
    if (!audio) return

    if (currentTrack?.id !== track.id) {
      audio.src = track.src
      audio.load()
      setCurrentTrack(track)
      setCurrentTime(0)
    }

    audio.play()
    setIsPlaying(true)
  }, [currentTrack])

  const pause = useCallback(() => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }, [])

  const playPause = useCallback((track: Track) => {
    if (isPlaying && currentTrack?.id === track.id) {
      pause()
    } else {
      play(track)
    }
  }, [isPlaying, currentTrack, play, pause])

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = time
      setCurrentTime(time)
    }
  }, [])

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        play,
        pause,
        playPause,
        seek,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext)
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider')
  }
  return context
}
