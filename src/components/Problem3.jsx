import { useState, useCallback, useEffect } from 'react'
import './Problem3.css'

const CODE_BEFORE = `function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(setUsers);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <input onChange={e => setFilter(e.target.value)} />
      {users.filter(u => u.name.includes(filter)).map((user, index) => (
        <div key={index} onClick={() => alert(user.id)}>
          {user.name}
        </div>
      ))}
    </div>
  );
}`

const CODE_AFTER = `const CONTAINER_STYLE = { padding: 20 };

function UserList() {
  const [filter, setFilter] = useState('');
  const { users, status, error } = useUsers();

  const handleFilterChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  }, []);

  const filteredUsers = useMemo(
    () => users.filter(u => u.name.includes(filter)),
    [users, filter]
  );

  if (status === 'loading') return <div>Loading…</div>;
  if (status === 'error') return <div>Error: {error}</div>;

  return (
    <div style={CONTAINER_STYLE}>
      <input onChange={handleFilterChange} />
      {filteredUsers.map(user => (
        <UserRow key={user.id} user={user} />
      ))}
    </div>
  );
}

function UserRow({ user }: { user: User }) {
  const handleClick = useCallback(() => {
    alert(user.id);
  }, [user.id]);
  return <div onClick={handleClick}>{user.name}</div>;
}

function useUsers() {
  const [state, setState] = useState({ users: [], status: 'idle', error: null });
  useEffect(() => {
    setState(s => ({ ...s, status: 'loading' }));
    fetch('/api/users')
      .then(res => res.json())
      .then(users => setState({ users, status: 'success', error: null }))
      .catch(err => setState(s => ({ ...s, status: 'error', error: err.message })));
  }, []);
  return state;
}`

function useLocalState(key, initial) {
  const stored = localStorage.getItem(key)
  const [value, setValue] = useState(() =>
    stored != null ? JSON.parse(stored) : initial
  )
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}

function TodoItem({ item, onToggle, onRemove }) {
  return (
    <li className={`p3-item ${item.done ? 'done' : ''}`}>
      <label className="p3-label">
        <input
          type="checkbox"
          checked={item.done}
          onChange={() => onToggle(item.id)}
        />
        <span className="p3-text">{item.text}</span>
      </label>
      <button type="button" className="p3-remove" aria-label="Remove" onClick={() => onRemove(item.id)}>×</button>
    </li>
  )
}

function AddTodoForm({ onSubmit }) {
  const [value, setValue] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim()) return
    onSubmit(value.trim())
    setValue('')
  }
  return (
    <form className="p3-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="p3-input"
        placeholder="Add a task…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className="p3-add">Add</button>
    </form>
  )
}

function TodoList() {
  const [items, setItems] = useLocalState('p3-todos', [
    { id: 1, text: 'Refactor messy component', done: true },
    { id: 2, text: 'Use clear state and effects', done: true },
    { id: 3, text: 'Avoid inline object creation in JSX', done: false },
  ])

  const addItem = useCallback((text) => {
    setItems((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((i) => i.id)) + 1 : 1
      return [...prev, { id: nextId, text, done: false }]
    })
  }, [setItems])

  const toggleItem = useCallback((id) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i))
    )
  }, [setItems])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [setItems])

  return (
    <div className="p3-todo">
      <AddTodoForm onSubmit={addItem} />
      <ul className="p3-list">
        {items.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            onToggle={toggleItem}
            onRemove={removeItem}
          />
        ))}
      </ul>
    </div>
  )
}

export default function Problem3() {
  return (
    <>
      <h2>Problem 3: Messy React — Issues & Refactor</h2>
      <p className="description">
        Task: list computational inefficiencies and anti-patterns; provide a refactored version. (React + TypeScript, functional components, hooks.)
      </p>

      <div className="p3-review">
        <h3 className="p3-h3">1. Issues & anti-patterns</h3>
        <ol className="p3-issues">
          <li>
            <strong>Inline object in JSX</strong> — e.g. <code>{'style={{ padding: 20 }}'}</code> creates a new object every render. Child re-renders unnecessarily; breaks referential equality for memo/context.
            <div className="p3-fix">→ Move to a constant outside the component or <code>useMemo</code>.</div>
          </li>
          <li>
            <strong>Inline arrow functions in JSX</strong> — e.g. <code>{'onClick={() => doSomething(id)}'}</code> creates a new function every render. Children that receive it re-render; <code>React.memo</code> on children is ineffective.
            <div className="p3-fix">→ Use <code>useCallback</code> for handlers passed to children, or pass stable callbacks (e.g. dispatch + id).</div>
          </li>
          <li>
            <strong>Wrong or missing dependency array</strong> — <code>useEffect(fn, [])</code> or <code>useEffect(fn)</code> when <code>fn</code> uses props/state can cause stale closures or unnecessary re-runs.
            <div className="p3-fix">→ List all reactive values used inside the effect, or use a lint rule (exhaustive-deps).</div>
          </li>
          <li>
            <strong>Using array index as <code>key</code></strong> — <code>{'key={index}'}</code> for dynamic lists causes wrong reuse when items are reordered/added/removed (state tied to wrong item, bugs, poor perf).
            <div className="p3-fix">→ Use a stable unique id from the data (e.g. <code>{'key={item.id}'}</code>).</div>
          </li>
          <li>
            <strong>Derived state stored in state</strong> — Storing a value that can be computed from existing state/props (e.g. filtered list from <code>users</code> + <code>filter</code>) causes duplication and sync bugs.
            <div className="p3-fix">→ Compute during render with <code>useMemo</code> if the computation is expensive, or just a variable if it’s cheap.</div>
          </li>
          <li>
            <strong>One component doing too much</strong> — Fetching, filtering, and rendering in a single component hurts readability, reuse, and testing.
            <div className="p3-fix">→ Split: custom hook for data (e.g. <code>useUsers</code>), small presentational components, keep container thin.</div>
          </li>
          <li>
            <strong>No loading/error handling</strong> — Raw <code>fetch</code> with no loading or error state gives a bad UX and no feedback on failure.
            <div className="p3-fix">→ Track <code>status</code> (idle/loading/error) and <code>error</code>; render loading UI and error message.</div>
          </li>
        </ol>

        <h3 className="p3-h3">2. Before (messy code)</h3>
        <pre className="p3-code"><code>{CODE_BEFORE}</code></pre>

        <h3 className="p3-h3">3. After (refactored)</h3>
        <pre className="p3-code"><code>{CODE_AFTER}</code></pre>

        <h3 className="p3-h3">4. Summary</h3>
        <ul className="p3-summary">
          <li>Avoid new object/function references in render when they’re passed to children or used in deps.</li>
          <li>Use <code>useCallback</code> / <code>useMemo</code> where it fixes correctness or meaningful perf (e.g. heavy computation or memoized children).</li>
          <li>Correct dependency arrays and stable keys (id, not index).</li>
          <li>Keep components small; move data-fetch and derived values into hooks and variables.</li>
        </ul>

        <h3 className="p3-h3">5. Refactored component (live)</h3>
      </div>
      <TodoList />
    </>
  )
}
