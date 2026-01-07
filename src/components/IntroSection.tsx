import { Logo } from './Logo'

export function IntroSection() {
  return (
    <section className="intro-wrapper">
      <div className="logo-container">
        <Logo />
      </div>
      <div className="content-container">
        <h1>Western Where</h1>
        <p><span>All 45's, All The Time</span></p>
      </div>
    </section>
  )
}
