import { useState } from 'react'
import Problem1 from './components/Problem1'
import Problem2 from './components/Problem2'
import Problem3 from './components/Problem3'
import './App.css'

const TABS = [
  { id: 1, label: 'Problem 1 – Sum to n', Panel: Problem1 },
  { id: 2, label: 'Problem 2 – Fancy Form', Panel: Problem2 },
  { id: 3, label: 'Problem 3 – React', Panel: Problem3 },
]

export default function App() {
  const [active, setActive] = useState(1)

  return (
    <div className="app">
      <header className="header">
        <h1 className="app-title">99Tech Code Challenge</h1>
        <nav className="tabs" role="tablist">
          {TABS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={`tab ${active === id ? 'active' : ''}`}
              role="tab"
              aria-selected={active === id}
              aria-controls={`panel-${id}`}
              onClick={() => setActive(id)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>

      <main className="main">
        {TABS.map(({ id, Panel }) => (
          <section
            key={id}
            id={`panel-${id}`}
            className={`panel ${active === id ? 'active' : ''}`}
            role="tabpanel"
            aria-labelledby={`tab-${id}`}
            hidden={active !== id}
          >
            <Panel />
          </section>
        ))}
      </main>
    </div>
  )
}
