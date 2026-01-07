export function ShareMenu() {
  return (
    <div className="share-box-circle">
      <div className="share-box-inner">
        <input className="share-menu-toggle" id="share-menu-circle" type="checkbox" />
        <label htmlFor="share-menu-circle">
          <div className="fa fa-share-alt"></div>
        </label>
        <ul className="share-menu">
          <li className="share-menu-item">
            <a
              className="fa fa-facebook"
              href="https://www.facebook.com/westernwhererecords"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            ></a>
          </li>
          <li className="share-menu-item">
            <a
              className="fa fa-twitter"
              href="https://twitter.com/WesternWhereRec"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            ></a>
          </li>
          <li className="share-menu-item">
            <a
              className="fa fa-instagram"
              href="https://instagram.com/westernwhere/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            ></a>
          </li>
        </ul>
      </div>
    </div>
  )
}
