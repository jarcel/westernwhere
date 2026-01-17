import { AudioPlayerProvider } from './hooks/useAudioPlayer'
import { PageScrollProvider, usePageScroll } from './hooks/usePageScroll'
import { IntroSection } from './components/IntroSection'
import { ArtistSection } from './components/ArtistSection'
import { RecordPlayer } from './components/RecordPlayer'
import { MobilePlayerBar } from './components/MobilePlayerBar'
import { ShareMenu } from './components/ShareMenu'
import { ShoppingCart } from './components/ShoppingCart'

// Track data - replace src with your actual MP3 file paths
const tracks = {
  autumnWetli: {
    id: 'autumn-wetli',
    title: 'I Still Go On',
    src: '/audio/autumn-wetli-i-still-go-on.mp3',
  },
  craigBrown: {
    id: 'craig-brown',
    title: "Shoulda Been Fishin'",
    src: '/audio/craig-brown-shoulda-been-fishin.mp3',
  },
}

const artists = {
  autumnWetli: {
    id: 'autumn-wetli',
    catalogNo: '01',
    name: 'Autumn Nicole Wetli',
    title: 'I Still Go On',
    description: `Calling out from the shadows, Autumn Nicole Wetli's done-wrong heart sinks about as low as a girl can get on these two tunes of heartbreak and abandonment, though you'd never know it from how beautiful the sounds are. "I Still Go On" romps drunkenly across the bar room floor, looking back on a decietful lover with the kind of clarity that only comes after seven or eight drinks, while "It's Over" slows down the pace for a glimmering, sorrowful dirge evoking some heavy Mazzy Star vibes and featuring the ghostly backing vocals of Raw Honey songwriter Maggie Hopp. A punk at her core, Autumn's rough-edged songs get smoothed out only so much in these country-tinged jams.`,
    track: tracks.autumnWetli,
  },
  craigBrown: {
    id: 'craig-brown',
    catalogNo: '02',
    name: 'Craig Brown',
    title: "Shoulda Been Fishin'",
    description: `It took the second coldest February in Michigan history for guitar hero and secretly amazing songwriter Craig Brown to lay down these warm-blooded tunes. Somewhere between the desolate reverb trails of Bruce Springsteen's Nebraska and a Nashville dive bar band made up of stand-up comics, these songs get born. Lyrics do indeed sometimes namedrop John Cusack or bicker about who's got the better weed, but this is no novelty act. Pinpoint vocal harmonies, thunderous percussion and honey-coated guitar shredding all let us know we're getting the real deal, sometimes raw and ugly; songs about dead friends and loneliness with a joke or two to help us swallow the pill. Recorded and co-produced by Fred Thomas in Ann Arbor, Michigan in the very brutal early winter months of 2015.`,
    track: tracks.craigBrown,
  },
}

function AppContent() {
  const { isWelcome } = usePageScroll()

  return (
    <div className={isWelcome ? 'welcome' : ''}>
      <div className="page-wrapper">
        <IntroSection />
        <ArtistSection {...artists.autumnWetli} />
        <ArtistSection {...artists.craigBrown} />
      </div>
      <MobilePlayerBar />
      <RecordPlayer />
      <ShareMenu />
      <ShoppingCart />
    </div>
  )
}

function App() {
  return (
    <AudioPlayerProvider>
      <PageScrollProvider>
        <AppContent />
      </PageScrollProvider>
    </AudioPlayerProvider>
  )
}

export default App
