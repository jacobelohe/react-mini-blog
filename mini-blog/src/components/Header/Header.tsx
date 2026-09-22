import { memo } from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        {'<Dev'} <span className="header__logo-accent">Insights/</span>{'>'}
      </div>
      <nav className="header__nav">
        <a href="#new-post" className="header__nav-link">
          New Post
        </a>
      </nav>
    </header>
  );
}

// Wrapped in React.memo since Header receives no props and never needs to
// re-render when its parent (App) re-renders for unrelated reasons.
export default memo(Header);
