import { useState } from 'react'
import { BrowserRouter, NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  Activity,
  Award,
  Book,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Database,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  FileImage,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  MoveDown,
  MoveUp,
  Play,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  Sparkles,
  Target,
  Trash2,
  Upload,
  Users,
  X,
  AlertCircle
} from 'lucide-react'
import { StorageService, SUPPORTED_GRADES } from './services/storageService'
import './index.css'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { label: 'Curriculum & Chapters', icon: BookOpen, path: '/chapters' },
  { label: 'Assignments & Exercises', icon: Edit3, path: '/exercises' },
  { label: 'Periodic Tests', icon: Target, path: '/periodic-tests' },
  { label: 'Study Material', icon: Book, path: '/study-material' },
  { label: 'Results & Marks', icon: Award, path: '/results' },
  { label: 'Students', icon: Users, path: '/students' },
  { label: 'Visual Content', icon: FileImage, path: '/visual-content' },
]

function Badge({ children, tone = 'neutral' }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

function Avatar({ initials, tone = 'coral' }) {
  return <span className={`avatar avatar-${tone}`}>{initials}</span>
}

function Button({ children, variant = 'primary', icon: Icon, onClick, type = 'button', className = '', disabled = false }) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`button button-${variant} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {Icon && <Icon size={16} strokeWidth={2.2} />}
      {children}
    </button>
  )
}

function IconButton({ label, children, onClick, className = '' }) {
  return (
    <button aria-label={label} title={label} className={`icon-button ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

function Modal({ title, onClose, children, maxWidth = '580px' }) {
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="modal" style={{ maxWidth, width: '100%' }} onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <IconButton label="Close" onClick={onClose}>
            <X size={18} />
          </IconButton>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

function Toast({ message, onClose }) {
  return (
    <div className="toast">
      <span className="toast-check">✓</span>
      <span>{message}</span>
      <button onClick={onClose}>
        <X size={15} />
      </button>
    </div>
  )
}

function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel} maxWidth="420px">
      <div className="delete-confirm-box">
        <strong>⚠️ Please Confirm</strong>
        <p style={{ margin: 0 }}>{message}</p>
      </div>
      <div className="modal-actions">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirm Delete
        </Button>
      </div>
    </Modal>
  )
}

function Table({ headers, children }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, detail, tone = 'coral' }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}>
        <Icon size={20} />
      </div>
      <div className="stat-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{detail}</small>
      </div>
      <span className="stat-kicker">Academic Platform</span>
    </div>
  )
}

function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <label className="search-bar">
      <Search size={17} />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{ border: 0, background: 'transparent', cursor: 'pointer', padding: 0 }}
        >
          <X size={15} color="var(--muted)" />
        </button>
      )}
    </label>
  )
}

/* ========================================================
   STUDENT LEARNING READER (GRADE 1, CHAPTER 1)
   ======================================================== */
function StudentChapterReader({ chapter, onBackToAdmin }) {
  const [currentSectionIdx, setCurrentSectionIdx] = useState(0)

  // Section 1 Activity State (O/I)
  const [oiAnswers, setOiAnswers] = useState({})
  const [oiSubmitted, setOiSubmitted] = useState(false)

  // Section 5 Exercises State
  const [mcqAnswers, setMcqAnswers] = useState({})
  const [matchAnswers, setMatchAnswers] = useState({})
  const [fillAnswers, setFillAnswers] = useState({})
  const [missingLetters, setMissingLetters] = useState({})
  const [exSubmitted, setExSubmitted] = useState(false)

  // Section 6 Lab Checklist State
  const [labChecklist, setLabChecklist] = useState({})

  if (!chapter) {
    return (
      <div className="student-reader-wrapper" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2>No published content available for Grade 1.</h2>
        <p>Please switch back to Admin View to publish Chapter 1.</p>
        <Button onClick={onBackToAdmin}>Return to Admin View</Button>
      </div>
    )
  }

  const sections = chapter.sections || []
  const currentSec = sections[currentSectionIdx] || sections[0]

  function handleOiSelect(itemId, val) {
    setOiAnswers({ ...oiAnswers, [itemId]: val })
  }

  return (
    <div className="student-reader-wrapper">
      {/* Top Banner with Role Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="tag tag-chapter" style={{ fontWeight: 800, fontSize: '11px' }}>
            STUDENT LEARNING SPACE
          </span>
          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Grade 1</span>
        </div>
        <button className="role-switch-badge" onClick={onBackToAdmin} title="Switch back to Administrator management">
          <Settings size={14} />
          <span>Switch to Admin Panel</span>
        </button>
      </div>

      {/* Chapter Hero */}
      <div className="reader-hero">
        <span className="reader-hero-kicker">GRADE 1 · CHAPTER {chapter.number}</span>
        <h1>{chapter.title}</h1>
        <p>{chapter.description}</p>
      </div>

      {/* Section Stepper Navigation */}
      <div className="reader-nav-stepper">
        {sections.map((sec, idx) => (
          <button
            key={sec.id || idx}
            className={`reader-step-btn ${idx === currentSectionIdx ? 'active' : ''}`}
            onClick={() => setCurrentSectionIdx(idx)}
          >
            <span className="reader-step-num">{idx + 1}</span>
            <span>{sec.title}</span>
          </button>
        ))}
      </div>

      {/* Render Current Section */}
      {currentSectionIdx === 0 && (
        <div className="section-content-card">
          <div className="section-header">
            <div>
              <span className="tag tag-chapter" style={{ marginBottom: '6px' }}>
                SECTION 1
              </span>
              <h2>{currentSec.title}</h2>
            </div>
          </div>

          <div className="definition-box">
            <strong>Definition:</strong>
            <p style={{ margin: '6px 0 0' }}>{currentSec.definition}</p>
          </div>

          <h3 style={{ margin: '0 0 14px', font: "700 16px 'Manrope'", color: 'var(--ink)' }}>
            Examples of Machines
          </h3>
          <div className="examples-grid">
            {currentSec.examples?.map((ex, i) => (
              <div key={i} className="example-item">
                <div className="example-icon">{ex.icon}</div>
                <div>
                  <strong>{ex.name}</strong>
                  <p>{ex.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="fact-banner">
            <span style={{ fontSize: '20px' }}>💡</span>
            <span>
              <strong>Textbook Fact:</strong> {currentSec.fact}
            </span>
          </div>

          {currentSec.activity && (
            <div className="activity-card">
              <h3>{currentSec.activity.title}</h3>
              <p>{currentSec.activity.instruction}</p>

              <div className="oi-grid">
                {currentSec.activity.items.map((item) => {
                  const userVal = oiAnswers[item.id]
                  const isCorrect = userVal === item.expected
                  return (
                    <div key={item.id} className="oi-item">
                      <div>
                        <strong>{item.name}</strong>
                        {oiSubmitted && (
                          <small style={{ display: 'block', color: isCorrect ? '#258f87' : '#c53030' }}>
                            {isCorrect ? '✓ Correct' : `Expected: ${item.expected} (${item.label})`}
                          </small>
                        )}
                      </div>
                      <div className="oi-selector">
                        <button
                          type="button"
                          className={`oi-btn ${userVal === 'O' ? 'selected-o' : ''}`}
                          onClick={() => handleOiSelect(item.id, 'O')}
                          title="Outside the house"
                        >
                          O
                        </button>
                        <button
                          type="button"
                          className={`oi-btn ${userVal === 'I' ? 'selected-i' : ''}`}
                          onClick={() => handleOiSelect(item.id, 'I')}
                          title="Inside the house"
                        >
                          I
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div style={{ marginTop: '16px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Button
                  variant="primary"
                  onClick={() => setOiSubmitted(true)}
                  disabled={Object.keys(oiAnswers).length === 0}
                >
                  Check Answers
                </Button>
                {oiSubmitted && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setOiAnswers({})
                      setOiSubmitted(false)
                    }}
                  >
                    Reset Activity
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {currentSectionIdx === 1 && (
        <div className="section-content-card">
          <div className="section-header">
            <div>
              <span className="tag tag-chapter" style={{ marginBottom: '6px' }}>
                SECTION 2
              </span>
              <h2>{currentSec.title}</h2>
            </div>
          </div>
          <p style={{ fontSize: '15px', color: '#445660', marginBottom: '22px' }}>{currentSec.intro}</p>
          <div className="examples-grid">
            {currentSec.examples?.map((ex, i) => (
              <div key={i} className="example-item">
                <div className="example-icon">{ex.icon}</div>
                <div>
                  <strong>{ex.name}</strong>
                  <p>{ex.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentSectionIdx === 2 && (
        <div className="section-content-card">
          <div className="section-header">
            <div>
              <span className="tag tag-chapter" style={{ marginBottom: '6px' }}>
                SECTION 3
              </span>
              <h2>{currentSec.title}</h2>
            </div>
          </div>
          <div
            className="definition-box"
            style={{ borderLeftColor: '#7950f2', background: '#f8f6fc', whiteSpace: 'pre-line' }}
          >
            {currentSec.textbookQuote}
          </div>
          <h3 style={{ margin: '0 0 12px', font: "700 16px 'Manrope'", color: 'var(--ink)' }}>
            Key Points for Grade 1
          </h3>
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8, fontSize: '14px', color: '#445660' }}>
            {currentSec.points?.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </div>
      )}

      {currentSectionIdx === 3 && (
        <div className="section-content-card">
          <div className="section-header">
            <div>
              <span className="tag tag-chapter" style={{ marginBottom: '6px' }}>
                SECTION 4
              </span>
              <h2>{currentSec.title}</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gap: '20px' }}>
            {currentSec.types?.map((t, i) => (
              <div key={i} style={{ border: '1px solid var(--line)', borderRadius: '12px', padding: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '26px' }}>{t.icon}</span>
                  <h3 style={{ margin: 0, font: "700 17px 'Manrope'", color: 'var(--ink)' }}>{t.name}</h3>
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.7, fontSize: '13px', color: '#495a64' }}>
                  {t.points?.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                </ul>
                {t.items && (
                  <div style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
                    {t.items.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: '#f8fafb',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                        }}
                      >
                        <span>{sub.icon}</span>
                        <span>{sub.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {currentSectionIdx === 4 && (
        <div className="section-content-card">
          <div className="section-header">
            <div>
              <span className="tag tag-chapter" style={{ marginBottom: '6px' }}>
                SECTION 5
              </span>
              <h2>{currentSec.title}</h2>
            </div>
            <span className="tag">Pages 9 & 10</span>
          </div>

          {/* Exercise 1: Tick Correct Option */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ font: "700 16px 'Manrope'", color: 'var(--ink)', marginBottom: '14px' }}>
              Exercise 1: Tick the Correct Option
            </h3>
            {currentSec.exercises?.[0]?.questions?.map((q) => {
              const selected = mcqAnswers[q.id]
              const isCorrect = selected === q.correct
              return (
                <div
                  key={q.id}
                  style={{
                    background: '#fbfcfd',
                    border: '1px solid var(--line)',
                    borderRadius: '10px',
                    padding: '16px',
                    marginBottom: '12px',
                  }}
                >
                  <strong style={{ display: 'block', fontSize: '13px', marginBottom: '10px', color: 'var(--ink)' }}>
                    {q.question}
                  </strong>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {q.options.map((opt) => (
                      <label
                        key={opt.key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 12px',
                          borderRadius: '6px',
                          background: selected === opt.key ? '#eaf6f4' : '#fff',
                          border: selected === opt.key ? '1px solid var(--teal)' : '1px solid #e2e8ec',
                          cursor: 'pointer',
                          fontSize: '13px',
                        }}
                      >
                        <input
                          type="radio"
                          name={q.id}
                          checked={selected === opt.key}
                          onChange={() => setMcqAnswers({ ...mcqAnswers, [q.id]: opt.key })}
                        />
                        <span>{opt.text}</span>
                      </label>
                    ))}
                  </div>
                  {exSubmitted && (
                    <div style={{ marginTop: '8px', fontSize: '11px', fontWeight: 700 }}>
                      {isCorrect ? (
                        <span style={{ color: '#258f87' }}>✓ Correct!</span>
                      ) : (
                        <span style={{ color: '#c53030' }}>Incorrect. Correct is ({q.correct})</span>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Exercise 2: Match the Following */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ font: "700 16px 'Manrope'", color: 'var(--ink)', marginBottom: '14px' }}>
              Exercise 2: Match the Following
            </h3>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Object</th>
                    <th>Select Description</th>
                    {exSubmitted && <th>Result</th>}
                  </tr>
                </thead>
                <tbody>
                  {currentSec.exercises?.[1]?.pairs?.map((pair) => {
                    const userMatch = matchAnswers[pair.id]
                    const isCorrect = userMatch === pair.matchKey
                    return (
                      <tr key={pair.id}>
                        <td>
                          <strong>{pair.object}</strong>
                        </td>
                        <td>
                          <select
                            value={userMatch || ''}
                            onChange={(e) => setMatchAnswers({ ...matchAnswers, [pair.id]: e.target.value })}
                            className="fill-blank-select"
                          >
                            <option value="">-- Choose matching description --</option>
                            {currentSec.exercises?.[1]?.options?.map((opt) => (
                              <option key={opt.key} value={opt.key}>
                                {opt.text}
                              </option>
                            ))}
                          </select>
                        </td>
                        {exSubmitted && (
                          <td>
                            <Badge tone={isCorrect ? 'success' : 'warning'}>
                              {isCorrect ? '✓ Match' : `Key: (${pair.matchKey})`}
                            </Badge>
                          </td>
                        )}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Exercise 3: Fill in Blanks */}
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ font: "700 16px 'Manrope'", color: 'var(--ink)', marginBottom: '8px' }}>
              Exercise 3: Fill in the Blanks
            </h3>
            <div className="word-bank-box">
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--ink)' }}>Word Bank:</span>
              {currentSec.exercises?.[2]?.wordBank?.map((w) => (
                <span key={w} className="word-bank-tag">
                  {w}
                </span>
              ))}
            </div>

            {currentSec.exercises?.[2]?.questions?.map((q) => {
              const userVal = fillAnswers[q.id]
              const isCorrect = userVal === q.answer
              return (
                <div key={q.id} className="fill-blank-item">
                  <span style={{ flex: 1 }}>{q.sentence}</span>
                  <select
                    value={userVal || ''}
                    onChange={(e) => setFillAnswers({ ...fillAnswers, [q.id]: e.target.value })}
                    className="fill-blank-select"
                  >
                    <option value="">-- Select word --</option>
                    {currentSec.exercises?.[2]?.wordBank?.map((w) => (
                      <option key={w} value={w}>
                        {w}
                      </option>
                    ))}
                  </select>
                  {exSubmitted && (
                    <Badge tone={isCorrect ? 'success' : 'warning'}>{isCorrect ? '✓' : q.answer}</Badge>
                  )}
                </div>
              )
            })}
          </div>

          {/* Exercise 4: Missing Letters */}
          <div style={{ marginBottom: '28px' }}>
            <h3 style={{ font: "700 16px 'Manrope'", color: 'var(--ink)', marginBottom: '14px' }}>
              Exercise 4: Fill in Missing Letters and Identify the Machines
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
              {currentSec.exercises?.[3]?.items?.map((item) => {
                const userVal = missingLetters[item.id] || ''
                const isCorrect = userVal.trim().toUpperCase() === item.answer
                return (
                  <div
                    key={item.id}
                    style={{
                      border: '1px solid var(--line)',
                      borderRadius: '10px',
                      padding: '16px',
                      background: '#fff',
                    }}
                  >
                    <span style={{ fontSize: '11px', color: 'var(--muted)', display: 'block', marginBottom: '6px' }}>
                      {item.prompt}
                    </span>
                    <strong style={{ fontSize: '16px', letterSpacing: '4px', display: 'block', margin: '8px 0' }}>
                      {item.pattern}
                    </strong>
                    <input
                      placeholder="Type word (e.g. FAN)"
                      value={userVal}
                      onChange={(e) => setMissingLetters({ ...missingLetters, [item.id]: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '6px 10px',
                        border: '1px solid var(--line)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    />
                    {exSubmitted && (
                      <div style={{ marginTop: '8px', fontSize: '11px', fontWeight: 700 }}>
                        {isCorrect ? (
                          <span style={{ color: '#258f87' }}>✓ Correct! ({item.answer})</span>
                        ) : (
                          <span style={{ color: '#c53030' }}>Answer: {item.answer}</span>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Button variant="primary" onClick={() => setExSubmitted(true)}>
              Submit & Check Answers
            </Button>
            {exSubmitted && (
              <Button
                variant="outline"
                onClick={() => {
                  setMcqAnswers({})
                  setMatchAnswers({})
                  setFillAnswers({})
                  setMissingLetters({})
                  setExSubmitted(false)
                }}
              >
                Clear Answers
              </Button>
            )}
          </div>
        </div>
      )}

      {currentSectionIdx === 5 && (
        <div className="section-content-card">
          <div className="section-header">
            <div>
              <span className="tag tag-chapter" style={{ marginBottom: '6px' }}>
                SECTION 6
              </span>
              <h2>{currentSec.title}</h2>
            </div>
            <span className="tag">Classroom Lab Activity</span>
          </div>

          <p style={{ fontSize: '15px', color: '#445660', marginBottom: '18px' }}>{currentSec.description}</p>

          <div
            style={{
              background: '#f8fafb',
              border: '1px solid #e2eaee',
              borderRadius: '10px',
              padding: '18px 22px',
              marginBottom: '24px',
            }}
          >
            <strong style={{ display: 'block', fontSize: '13px', color: 'var(--ink)', marginBottom: '8px' }}>
              📋 Rules to follow when visiting the lab:
            </strong>
            <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8, fontSize: '13px', color: '#475862' }}>
              {currentSec.rules?.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>

          <h3 style={{ margin: '0 0 14px', font: "700 16px 'Manrope'", color: 'var(--ink)' }}>
            {currentSec.checklistTitle}
          </h3>

          <div className="oi-grid">
            {currentSec.checklist?.map((item) => {
              const checked = labChecklist[item.id] || false
              return (
                <label
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: checked ? '1px solid var(--teal)' : '1px solid var(--line)',
                    background: checked ? '#f0faf8' : '#fff',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setLabChecklist({ ...labChecklist, [item.id]: e.target.checked })}
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span>{item.text}</span>
                </label>
              )
            })}
          </div>
        </div>
      )}

      {/* Stepper Footer Buttons */}
      <div className="reader-footer-pager">
        <Button
          variant="outline"
          icon={ChevronLeft}
          disabled={currentSectionIdx === 0}
          onClick={() => setCurrentSectionIdx((prev) => Math.max(0, prev - 1))}
        >
          Previous Section
        </Button>
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--muted)' }}>
          Section {currentSectionIdx + 1} of {sections.length}
        </span>
        <Button
          variant="primary"
          disabled={currentSectionIdx === sections.length - 1}
          onClick={() => setCurrentSectionIdx((prev) => Math.min(sections.length - 1, prev + 1))}
        >
          Next Section <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  )
}

/* ========================================================
   ADMIN: DASHBOARD PAGE
   ======================================================== */
function DashboardPage({ data, onOpenStudentView, onNavigate }) {
  const { chapters, students, exercises, tests, results, activities } = data

  const totalChapters = chapters.length
  const totalStudents = students.length
  const activeTests = tests.length
  const passCount = results.filter((r) => r.status === 'Passed').length

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Academic Overview</div>
          <h1>VICO Administrator Dashboard</h1>
          <p>
            Curriculum management for Grade 1. Chapter 1 is active with textbook content.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button icon={Eye} variant="outline" onClick={onOpenStudentView}>
            Open Student View
          </Button>
          <Button icon={Plus} onClick={() => onNavigate('/chapters')}>
            Manage Chapters
          </Button>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard
          icon={BookOpen}
          label="Active Chapters"
          value={totalChapters}
          detail="Grade 1 Chapter 1 active"
          tone="coral"
        />
        <StatCard
          icon={Users}
          label="Enrolled Students"
          value={totalStudents}
          detail="Active learners"
          tone="lavender"
        />
        <StatCard
          icon={Target}
          label="Periodic Tests"
          value={activeTests}
          detail="PT-1 Scheduled"
          tone="mint"
        />
        <StatCard
          icon={Award}
          label="Pass Rate"
          value={results.length > 0 ? `${Math.round((passCount / results.length) * 100)}%` : '92%'}
          detail="Chapter evaluations"
          tone="yellow"
        />
      </div>

      {/* Grade 1 Chapter 1 Spotlight Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #eaf6f4 0%, #f4eefc 100%)',
          border: '1px solid #c9e6e0',
          borderRadius: '12px',
          padding: '24px 28px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span className="tag tag-chapter" style={{ fontWeight: 800, marginBottom: '6px' }}>
            GRADE 1 TEXTBOOK CONTENT READY
          </span>
          <h2 style={{ margin: '4px 0 6px', font: "800 20px 'Manrope'", color: 'var(--ink)' }}>
            Chapter 1: The Super Machine: Computer
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#556672', maxWidth: '640px' }}>
            Contains all 6 textbook sections: What is a Machine, Types of Machines, Computer: A Smart Machine, Types of
            Computers, Chapter Exercises, and Computer Lab Activity.
          </p>
        </div>
        <Button variant="primary" icon={Eye} onClick={onOpenStudentView}>
          Open Interactive Student View
        </Button>
      </div>

      <div className="dashboard-grid">
        {/* Recent Activities */}
        <section className="panel activity-panel">
          <div className="panel-heading">
            <div>
              <h2>Recent Student Activity</h2>
              <p>Real-time progress on Grade 1 Chapter 1</p>
            </div>
            <button className="text-button" onClick={() => onNavigate('/results')}>
              View results <ChevronRight size={15} />
            </button>
          </div>
          <Table headers={['Student', 'Module / Chapter', 'Activity', 'Status', 'Time']}>
            {activities.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <div className="person">
                    <Avatar initials={item.initials} tone={idx % 2 === 0 ? 'coral' : 'lavender'} />
                    <strong>{item.student}</strong>
                  </div>
                </td>
                <td>
                  <span className="tag tag-chapter">{item.chapter}</span>
                </td>
                <td className="muted-cell">{item.activity}</td>
                <td>
                  <Badge tone={item.status === 'Completed' || item.status === 'Passed' ? 'success' : 'warning'}>
                    {item.status}
                  </Badge>
                </td>
                <td className="muted-cell">{item.date}</td>
              </tr>
            ))}
          </Table>
        </section>

        {/* Grade 1 Curriculum Scope */}
        <section className="panel overview-panel">
          <div className="panel-heading">
            <div>
              <h2>Grade 1 Curriculum Status</h2>
              <p>Active learning modules</p>
            </div>
            <button className="text-button" onClick={() => onNavigate('/chapters')}>
              View Chapters <ChevronRight size={15} />
            </button>
          </div>

          <div style={{ padding: '0 23px 20px', display: 'grid', gap: '12px' }}>
            <div
              style={{
                padding: '14px',
                borderRadius: '8px',
                background: '#f0faf8',
                border: '1px solid #c9e6e0',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ fontSize: '13px', color: 'var(--ink)' }}>Chapter 1</strong>
                <Badge tone="success">Published</Badge>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--teal)' }}>
                The Super Machine: Computer
              </span>
              <p style={{ margin: '6px 0 0', fontSize: '11px', color: 'var(--muted)' }}>
                6 Sections active: Definition, Types of Machines, Smart Machine, Types of Computers, Exercises & Lab Activity.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

/* ========================================================
   ADMIN: CURRICULUM & CHAPTERS MANAGEMENT (GRADE 1)
   ======================================================== */
function AdminChaptersPage({
  chapters,
  onSaveChapter,
  onDeleteChapter,
  onOpenReader,
  onNotify,
}) {
  const [modalChapter, setModalChapter] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [selectedChapterForSections, setSelectedChapterForSections] = useState(null)

  const gradeChapters = chapters.filter((c) => c.grade === 'Grade 1')

  function togglePublish(chap) {
    const nextStatus = chap.status === 'Published' ? 'Draft' : 'Published'
    onSaveChapter({ ...chap, status: nextStatus })
    onNotify(`${chap.title} is now ${nextStatus}.`)
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Grade 1 Curriculum</div>
          <h1>Curriculum & Chapters</h1>
          <p>
            Grade 1 educational content. Chapter 1: The Super Machine: Computer is configured with all textbook sections and exercises.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button icon={Eye} variant="outline" onClick={onOpenReader}>
            Open Student View
          </Button>
          <Button icon={Plus} onClick={() => setModalChapter({ grade: 'Grade 1', status: 'Draft' })}>
            Add Chapter
          </Button>
        </div>
      </div>

      <section className="panel table-panel">
        <div className="panel-heading">
          <div>
            <h2>
              Grade 1 Chapters <span className="count-pill">{gradeChapters.length}</span>
            </h2>
            <p>Educational chapters and lesson sections configured for Grade 1</p>
          </div>
        </div>

        {gradeChapters.length > 0 ? (
          <Table headers={['#', 'Chapter Title', 'Sections', 'Status', 'Actions']}>
            {gradeChapters.map((chap) => (
              <tr key={chap.id}>
                <td>
                  <span className="tag tag-chapter" style={{ fontWeight: 800 }}>
                    {chap.number}
                  </span>
                </td>
                <td>
                  <div className="table-title">
                    <span className="lesson-dot">
                      <BookOpen size={15} />
                    </span>
                    <div>
                      <strong style={{ fontSize: '13px' }}>{chap.title}</strong>
                      <small style={{ color: 'var(--muted)', display: 'block', maxWidth: '340px' }}>
                        {chap.description}
                      </small>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="tag">{chap.sections ? chap.sections.length : 0} Sections</span>
                </td>
                <td>
                  <button
                    onClick={() => togglePublish(chap)}
                    style={{ border: 0, background: 'transparent', cursor: 'pointer', padding: 0 }}
                    title="Click to toggle publish status"
                  >
                    <Badge tone={chap.status === 'Published' ? 'success' : 'neutral'}>{chap.status}</Badge>
                  </button>
                </td>
                <td>
                  <div className="action-group">
                    <button
                      className="text-button"
                      title="Manage Sections & Content"
                      onClick={() => setSelectedChapterForSections(chap)}
                    >
                      <Edit3 size={14} /> Sections
                    </button>
                    <IconButton label="Edit Chapter" onClick={() => setModalChapter(chap)}>
                      <Settings size={15} />
                    </IconButton>
                    <IconButton label="Delete Chapter" onClick={() => setDeleteId(chap.id)}>
                      <Trash2 size={15} color="#e04848" />
                    </IconButton>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        ) : (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <FolderKanban size={34} color="var(--muted)" style={{ margin: '0 auto 12px' }} />
            <strong style={{ display: 'block', fontSize: '14px', color: 'var(--ink)' }}>
              No chapters in {selectedGrade} yet
            </strong>
            <p style={{ margin: '6px 0 16px', fontSize: '12px', color: 'var(--muted)' }}>
              No chapters found for {selectedGrade}. You can add new chapters using the button below.
            </p>
            <Button
              icon={Plus}
              variant="outline"
              onClick={() => setModalChapter({ grade: selectedGrade, status: 'Draft' })}
            >
              Add Chapter to {selectedGrade}
            </Button>
          </div>
        )}
      </section>

      {modalChapter && (
        <ChapterFormModal
          chapter={modalChapter}
          onClose={() => setModalChapter(null)}
          onSave={(c) => {
            onSaveChapter(c)
            setModalChapter(null)
          }}
        />
      )}

      {selectedChapterForSections && (
        <SectionsManagerModal
          chapter={selectedChapterForSections}
          onClose={() => setSelectedChapterForSections(null)}
          onSaveChapter={(c) => {
            onSaveChapter(c)
            setSelectedChapterForSections(c)
          }}
          onNotify={onNotify}
        />
      )}

      {deleteId && (
        <ConfirmDialog
          title="Delete Chapter"
          message="Are you sure you want to delete this chapter? All internal sections and exercises will be removed."
          onConfirm={() => {
            onDeleteChapter(deleteId)
            setDeleteId(null)
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  )
}

function ChapterFormModal({ chapter, onClose, onSave }) {
  const isEdit = Boolean(chapter.id)
  const [form, setForm] = useState({
    id: chapter.id,
    number: chapter.number || 1,
    grade: chapter.grade || 'Grade 1',
    title: chapter.title || '',
    description: chapter.description || '',
    status: chapter.status || 'Draft',
    sections: chapter.sections || [],
  })

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return alert('Please enter chapter title.')
    onSave(form)
  }

  return (
    <Modal title={isEdit ? `Edit Chapter: ${chapter.title}` : `Add New Chapter to ${form.grade}`} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="field">
            <span>Target Grade</span>
            <select value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })}>
              {SUPPORTED_GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Chapter Number</span>
            <input
              type="number"
              min="1"
              max="30"
              value={form.number}
              onChange={(e) => setForm({ ...form, number: Number(e.target.value) })}
            />
          </label>
        </div>

        <label className="field">
          <span>Chapter Title *</span>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. The Super Machine: Computer"
          />
        </label>

        <label className="field">
          <span>Chapter Description</span>
          <textarea
            rows="3"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Brief overview of the chapter topics and learning objectives..."
          />
        </label>

        <label className="field">
          <span>Publication Status</span>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="Published">Published (Visible to Students)</option>
            <option value="Draft">Draft (Admin Only)</option>
          </select>
        </label>

        <div className="modal-actions">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" icon={Save}>
            {isEdit ? 'Save Changes' : 'Create Chapter'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}

function SectionsManagerModal({ chapter, onClose, onSaveChapter, onNotify }) {
  const [sections, setSections] = useState(chapter.sections || [])
  const [editingSec, setEditingSec] = useState(null)

  function moveSection(index, direction) {
    const targetIdx = index + direction
    if (targetIdx < 0 || targetIdx >= sections.length) return
    const reordered = [...sections]
    const temp = reordered[index]
    reordered[index] = reordered[targetIdx]
    reordered[targetIdx] = temp
    setSections(reordered)
    const updated = { ...chapter, sections: reordered }
    onSaveChapter(updated)
    onNotify('Sections reordered.')
  }

  function handleDeleteSection(secId) {
    const remaining = sections.filter((s) => s.id !== secId)
    setSections(remaining)
    const updated = { ...chapter, sections: remaining }
    onSaveChapter(updated)
    onNotify('Section removed.')
  }

  function handleSaveSectionItem(sec) {
    let updated
    const idx = sections.findIndex((s) => s.id === sec.id)
    if (idx >= 0) {
      updated = [...sections]
      updated[idx] = sec
    } else {
      updated = [...sections, { ...sec, id: `sec-${Date.now().toString().slice(-4)}` }]
    }
    setSections(updated)
    const updatedChap = { ...chapter, sections: updated }
    onSaveChapter(updatedChap)
    setEditingSec(null)
    onNotify('Section saved.')
  }

  return (
    <Modal title={`Manage Sections — ${chapter.title}`} onClose={onClose} maxWidth="680px">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <p style={{ margin: 0, fontSize: '12px', color: 'var(--muted)' }}>
          Add, edit, reorder, or remove sections in this chapter.
        </p>
        <Button
          variant="outline"
          className="button-sm"
          icon={Plus}
          onClick={() => setEditingSec({ title: '', definition: '' })}
        >
          Add Section
        </Button>
      </div>

      <div style={{ display: 'grid', gap: '10px', maxHeight: '420px', overflowY: 'auto' }}>
        {sections.map((sec, idx) => (
          <div
            key={sec.id || idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 16px',
              border: '1px solid var(--line)',
              borderRadius: '8px',
              background: '#fff',
            }}
          >
            <div>
              <span className="tag tag-chapter" style={{ marginRight: '8px' }}>
                Sec {idx + 1}
              </span>
              <strong>{sec.title}</strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <IconButton label="Move Up" onClick={() => moveSection(idx, -1)}>
                <MoveUp size={14} />
              </IconButton>
              <IconButton label="Move Down" onClick={() => moveSection(idx, 1)}>
                <MoveDown size={14} />
              </IconButton>
              <IconButton label="Edit" onClick={() => setEditingSec(sec)}>
                <Edit3 size={14} />
              </IconButton>
              <IconButton label="Delete" onClick={() => handleDeleteSection(sec.id)}>
                <Trash2 size={14} color="#e04848" />
              </IconButton>
            </div>
          </div>
        ))}
      </div>

      {editingSec && (
        <Modal title={editingSec.id ? 'Edit Section' : 'Add Section'} onClose={() => setEditingSec(null)}>
          <label className="field">
            <span>Section Title *</span>
            <input
              value={editingSec.title}
              onChange={(e) => setEditingSec({ ...editingSec, title: e.target.value })}
              placeholder="e.g. Types of Machines"
            />
          </label>
          <label className="field">
            <span>Section Content / Definition</span>
            <textarea
              rows="4"
              value={editingSec.definition || editingSec.textbookQuote || ''}
              onChange={(e) => setEditingSec({ ...editingSec, definition: e.target.value })}
              placeholder="Write section explanation here..."
            />
          </label>
          <div className="modal-actions">
            <Button variant="outline" onClick={() => setEditingSec(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => handleSaveSectionItem(editingSec)}>
              Save Section
            </Button>
          </div>
        </Modal>
      )}
    </Modal>
  )
}

/* ========================================================
   ADMIN: ASSIGNMENTS & EXERCISES PAGE
   ======================================================== */
function AdminExercisesPage({ exercises, onSaveExercise, onDeleteExercise, onNotify }) {
  const [modalEx, setModalEx] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Formative Practice</div>
          <h1>Chapter Assignments & Exercises</h1>
          <p>Manage exercise sets, question banks, matching tasks, and lab checklists.</p>
        </div>
        <Button icon={Plus} onClick={() => setModalEx({})}>
          Add Exercise Set
        </Button>
      </div>

      <div className="quiz-grid">
        {exercises.map((ex) => (
          <div className="panel quiz-card" key={ex.id}>
            <div className="quiz-icon">
              <Edit3 size={20} />
            </div>
            <div className="quiz-card-top">
              <Badge tone={ex.status === 'Published' ? 'success' : 'warning'}>{ex.status}</Badge>
              <IconButton label="Delete" onClick={() => setDeleteId(ex.id)}>
                <Trash2 size={16} color="#e04848" />
              </IconButton>
            </div>
            <h2>{ex.title}</h2>
            <p>
              <span className="tag tag-chapter">{ex.chapterTitle}</span> · {ex.grade || 'Grade 1'}
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
              {(ex.types || ['MCQs', 'Matching', 'Blanks']).map((t) => (
                <span key={t} className="tag" style={{ fontSize: '9px' }}>
                  {t}
                </span>
              ))}
            </div>

            <div className="quiz-meta">
              <span>
                <strong>{ex.questionsCount || 13}</strong> questions
              </span>
              <span>
                <strong>{ex.attempts || 0}</strong> attempts
              </span>
              <span>
                <strong>{ex.average || 88}%</strong> avg score
              </span>
            </div>

            <div className="card-actions">
              <button className="text-button" onClick={() => setModalEx(ex)}>
                Edit Exercise <ChevronRight size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalEx && (
        <Modal title={modalEx.id ? 'Edit Exercise' : 'Create Exercise'} onClose={() => setModalEx(null)}>
          <label className="field">
            <span>Exercise Title *</span>
            <input
              value={modalEx.title || ''}
              onChange={(e) => setModalEx({ ...modalEx, title: e.target.value })}
              placeholder="e.g. Chapter 1 Textbook Exercises"
            />
          </label>
          <div className="form-grid">
            <label className="field">
              <span>Grade</span>
              <select
                value={modalEx.grade || 'Grade 1'}
                onChange={(e) => setModalEx({ ...modalEx, grade: e.target.value })}
              >
                {SUPPORTED_GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Status</span>
              <select
                value={modalEx.status || 'Published'}
                onChange={(e) => setModalEx({ ...modalEx, status: e.target.value })}
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
              </select>
            </label>
          </div>
          <div className="modal-actions">
            <Button variant="outline" onClick={() => setModalEx(null)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onSaveExercise(modalEx)
                setModalEx(null)
                onNotify('Exercise saved.')
              }}
            >
              Save Exercise
            </Button>
          </div>
        </Modal>
      )}

      {deleteId && (
        <ConfirmDialog
          title="Delete Exercise"
          message="Are you sure you want to delete this exercise set?"
          onConfirm={() => {
            onDeleteExercise(deleteId)
            setDeleteId(null)
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  )
}

/* ========================================================
   ADMIN: PERIODIC TESTS MANAGEMENT
   ======================================================== */
function AdminPeriodicTestsPage({ tests, students, onSaveTest, onDeleteTest, onSaveResult, onNotify }) {
  const [modalTest, setModalTest] = useState(null)
  const [gradebookTest, setGradebookTest] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Formal Assessments</div>
          <h1>Periodic Tests Management</h1>
          <p>Schedule tests, set textbook syllabus, and grade student submissions in mark sheets.</p>
        </div>
        <Button icon={Plus} onClick={() => setModalTest({})}>
          Schedule Test
        </Button>
      </div>

      <div className="test-grid">
        {tests.map((test) => (
          <div key={test.id} className="test-card">
            <div>
              <div className="test-card-header">
                <span className="test-card-code">{test.code || 'PT'}</span>
                <Badge tone={test.status === 'Published' ? 'success' : test.status === 'Scheduled' ? 'warning' : 'neutral'}>
                  {test.status}
                </Badge>
              </div>

              <h2 className="test-card-title">{test.title}</h2>
              <p className="test-card-desc">{test.description}</p>

              <div className="test-card-syllabus">
                <strong>📚 Assigned Syllabus:</strong>
                {test.syllabus}
              </div>

              <div className="test-card-meta">
                <div>
                  <span>Date & Schedule</span>
                  <strong>{test.displayDate || 'TBA'}</strong>
                </div>
                <div>
                  <span>Duration</span>
                  <strong>{test.durationMinutes || 45} mins</strong>
                </div>
                <div>
                  <span>Total Marks</span>
                  <strong>{test.maxMarks || 25} Marks</strong>
                </div>
                <div>
                  <span>Passing Cutoff</span>
                  <strong>{test.passingMarks || 10} Marks</strong>
                </div>
              </div>
            </div>

            <div className="test-card-actions">
              <Button
                variant="primary"
                className="button-sm"
                icon={Award}
                style={{ flex: 1 }}
                onClick={() => setGradebookTest(test)}
              >
                Grade / Mark Sheet
              </Button>
              <IconButton label="Edit" onClick={() => setModalTest(test)}>
                <Edit3 size={15} />
              </IconButton>
              <IconButton label="Delete" onClick={() => setDeleteId(test.id)}>
                <Trash2 size={15} color="#e04848" />
              </IconButton>
            </div>
          </div>
        ))}
      </div>

      {modalTest && (
        <Modal title={modalTest.id ? 'Edit Test' : 'Schedule Test'} onClose={() => setModalTest(null)}>
          <label className="field">
            <span>Test Title *</span>
            <input
              value={modalTest.title || ''}
              onChange={(e) => setModalTest({ ...modalTest, title: e.target.value })}
              placeholder="e.g. Periodic Test 1"
            />
          </label>
          <label className="field">
            <span>Syllabus *</span>
            <input
              value={modalTest.syllabus || ''}
              onChange={(e) => setModalTest({ ...modalTest, syllabus: e.target.value })}
              placeholder="e.g. Grade 1 Chapter 1: The Super Machine: Computer"
            />
          </label>
          <div className="form-grid">
            <label className="field">
              <span>Schedule Date & Time</span>
              <input
                value={modalTest.displayDate || ''}
                onChange={(e) => setModalTest({ ...modalTest, displayDate: e.target.value })}
                placeholder="Nov 15, 2026 · 10:00 AM"
              />
            </label>
            <label className="field">
              <span>Max Marks</span>
              <input
                type="number"
                value={modalTest.maxMarks || 25}
                onChange={(e) => setModalTest({ ...modalTest, maxMarks: Number(e.target.value) })}
              />
            </label>
          </div>
          <div className="modal-actions">
            <Button variant="outline" onClick={() => setModalTest(null)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onSaveTest(modalTest)
                setModalTest(null)
                onNotify('Test schedule saved.')
              }}
            >
              Save Test
            </Button>
          </div>
        </Modal>
      )}

      {gradebookTest && (
        <GradebookModal
          test={gradebookTest}
          students={students}
          onClose={() => setGradebookTest(null)}
          onSaveMarks={(marksList) => {
            marksList.forEach((r) => onSaveResult(r))
            setGradebookTest(null)
            onNotify(`Saved marks for ${marksList.length} students.`)
          }}
        />
      )}

      {deleteId && (
        <ConfirmDialog
          title="Delete Test"
          message="Are you sure you want to remove this test schedule?"
          onConfirm={() => {
            onDeleteTest(deleteId)
            setDeleteId(null)
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  )
}

function GradebookModal({ test, students, onClose, onSaveMarks }) {
  const [marksMap, setMarksMap] = useState(() => {
    const map = {}
    students.forEach((s) => {
      map[s.id] = 22
    })
    return map
  })

  function handleSaveAll() {
    const payload = students.map((s) => {
      const marks = marksMap[s.id] ?? 20
      const totalMarks = test.maxMarks || 25
      return {
        studentId: s.id,
        student: s.name,
        testType: 'Periodic Test',
        assessmentName: test.title,
        chapter: test.syllabus,
        marks,
        totalMarks,
        remarks: marks >= (test.passingMarks || 10) ? 'Passed assessment.' : 'Needs revision.',
      }
    })
    onSaveMarks(payload)
  }

  return (
    <Modal title={`Mark Sheet — ${test.title}`} onClose={onClose} maxWidth="640px">
      <div className="table-wrap marksheet-table">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Student ID</th>
              <th>Marks ({test.maxMarks || 25})</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>
                  <strong>{s.name}</strong>
                </td>
                <td className="muted-cell">{s.id}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max={test.maxMarks || 25}
                    value={marksMap[s.id] ?? 0}
                    onChange={(e) => setMarksMap({ ...marksMap, [s.id]: Number(e.target.value) })}
                  />
                </td>
                <td>
                  <Badge tone={(marksMap[s.id] ?? 0) >= (test.passingMarks || 10) ? 'success' : 'warning'}>
                    {(marksMap[s.id] ?? 0) >= (test.passingMarks || 10) ? 'Passed' : 'Needs Review'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="modal-actions" style={{ marginTop: '16px' }}>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" icon={Save} onClick={handleSaveAll}>
          Save All Marks
        </Button>
      </div>
    </Modal>
  )
}

/* ========================================================
   ADMIN: STUDY MATERIAL PAGE
   ======================================================== */
function AdminStudyMaterialPage({ materials, onSaveMaterial, onDeleteMaterial, onNotify }) {
  const [modalMat, setModalMat] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Textbooks & Handouts</div>
          <h1>Study Material & Textbooks</h1>
          <p>Manage Grade 1 Unit 1 PDF textbook, lab guides, and downloadable resources.</p>
        </div>
        <Button icon={Plus} onClick={() => setModalMat({})}>
          Upload Material
        </Button>
      </div>

      <div className="material-grid">
        {materials.map((m) => (
          <div key={m.id} className="material-card">
            <div className="material-card-icon">
              <Book size={24} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="tag tag-chapter">{m.type || 'Textbook'}</span>
              <Badge tone={m.status === 'Active' ? 'success' : 'neutral'}>{m.status}</Badge>
            </div>
            <h2 className="material-card-title">{m.title}</h2>
            <p className="material-card-desc">{m.subtitle}</p>

            <div className="material-meta-row">
              <span>
                Format: <strong>{m.format || 'PDF'}</strong>
              </span>
              <span>
                Size: <strong>{m.size || '14.2 MB'}</strong>
              </span>
              <span>
                Pages: <strong>{m.pages || 10}</strong>
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
              <a
                href={m.fileUrl || '/study-material/master-coding-robotics-foundation-1.pdf'}
                target="_blank"
                rel="noreferrer"
                className="button button-primary button-sm"
                style={{ flex: 1, textDecoration: 'none' }}
              >
                <ExternalLink size={14} /> Read Online
              </a>
              <IconButton label="Edit" onClick={() => setModalMat(m)}>
                <Edit3 size={15} />
              </IconButton>
              <IconButton label="Delete" onClick={() => setDeleteId(m.id)}>
                <Trash2 size={15} color="#e04848" />
              </IconButton>
            </div>
          </div>
        ))}
      </div>

      {modalMat && (
        <Modal title={modalMat.id ? 'Edit Study Material' : 'Add Material'} onClose={() => setModalMat(null)}>
          <label className="field">
            <span>Title *</span>
            <input
              value={modalMat.title || ''}
              onChange={(e) => setModalMat({ ...modalMat, title: e.target.value })}
              placeholder="e.g. Grade 1 Chapter 1: The Super Machine: Computer"
            />
          </label>
          <label className="field">
            <span>Subtitle</span>
            <input
              value={modalMat.subtitle || ''}
              onChange={(e) => setModalMat({ ...modalMat, subtitle: e.target.value })}
              placeholder="e.g. Official textbook PDF with exercises"
            />
          </label>
          <div className="modal-actions">
            <Button variant="outline" onClick={() => setModalMat(null)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onSaveMaterial(modalMat)
                setModalMat(null)
                onNotify('Study material saved.')
              }}
            >
              Save Material
            </Button>
          </div>
        </Modal>
      )}

      {deleteId && (
        <ConfirmDialog
          title="Delete Study Material"
          message="Are you sure you want to delete this study material?"
          onConfirm={() => {
            onDeleteMaterial(deleteId)
            setDeleteId(null)
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  )
}

/* ========================================================
   ADMIN: RESULTS & MARKS PAGE
   ======================================================== */
function AdminResultsPage({ results, students, onSaveResult, onDeleteResult, onNotify }) {
  const [modalRes, setModalRes] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Academic Records</div>
          <h1>Results & Assessment Marks</h1>
          <p>Scorecards and evaluations recorded for learners.</p>
        </div>
        <Button icon={Plus} onClick={() => setModalRes({})}>
          Record Result
        </Button>
      </div>

      <section className="panel table-panel">
        <div className="panel-heading">
          <div>
            <h2>
              Recorded Results <span className="count-pill">{results.length}</span>
            </h2>
            <p>Periodic tests and exercise marks</p>
          </div>
        </div>

        <Table headers={['Student', 'Assessment', 'Category', 'Score', 'Percentage', 'Status', 'Date', 'Actions']}>
          {results.map((r) => (
            <tr key={r.id}>
              <td>
                <strong>{r.student}</strong>
              </td>
              <td>
                <div>
                  <strong>{r.assessmentName}</strong>
                  <small style={{ color: 'var(--muted)', display: 'block' }}>{r.chapter}</small>
                </div>
              </td>
              <td>
                <span className="tag">{r.testType || 'Periodic Test'}</span>
              </td>
              <td>
                <strong>{r.score}</strong>
              </td>
              <td>
                <div className="score-cell">
                  <span>{r.percentage}%</span>
                  <div className="mini-track">
                    <i style={{ width: `${r.percentage}%` }} />
                  </div>
                </div>
              </td>
              <td>
                <Badge tone={r.status === 'Passed' ? 'success' : 'warning'}>{r.status}</Badge>
              </td>
              <td className="muted-cell">{r.date}</td>
              <td>
                <IconButton label="Delete" onClick={() => setDeleteId(r.id)}>
                  <Trash2 size={15} color="#e04848" />
                </IconButton>
              </td>
            </tr>
          ))}
        </Table>
      </section>

      {modalRes && (
        <Modal title="Record Assessment Result" onClose={() => setModalRes(null)}>
          <label className="field">
            <span>Student</span>
            <select
              value={modalRes.studentId || students[0]?.id}
              onChange={(e) => {
                const s = students.find((item) => item.id === e.target.value)
                setModalRes({ ...modalRes, studentId: e.target.value, student: s ? s.name : '' })
              }}
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.id})
                </option>
              ))}
            </select>
          </label>
          <div className="form-grid">
            <label className="field">
              <span>Assessment Title</span>
              <input
                value={modalRes.assessmentName || 'Periodic Test 1'}
                onChange={(e) => setModalRes({ ...modalRes, assessmentName: e.target.value })}
              />
            </label>
            <label className="field">
              <span>Marks Obtained</span>
              <input
                type="number"
                value={modalRes.marks ?? 24}
                onChange={(e) => setModalRes({ ...modalRes, marks: Number(e.target.value) })}
              />
            </label>
          </div>
          <div className="modal-actions">
            <Button variant="outline" onClick={() => setModalRes(null)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onSaveResult(modalRes)
                setModalRes(null)
                onNotify('Result recorded.')
              }}
            >
              Save Result
            </Button>
          </div>
        </Modal>
      )}

      {deleteId && (
        <ConfirmDialog
          title="Delete Result"
          message="Are you sure you want to delete this result entry?"
          onConfirm={() => {
            onDeleteResult(deleteId)
            setDeleteId(null)
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  )
}

/* ========================================================
   ADMIN: STUDENTS DIRECTORY PAGE
   ======================================================== */
function AdminStudentsPage({ students, onSaveStudent, onDeleteStudent, onNotify }) {
  const [modalStudent, setModalStudent] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  function handleExportCSV() {
    const headers = ['Student ID,Name,Email,Grade,Status']
    const rows = students.map((s) => `"${s.id}","${s.name}","${s.email}","${s.grade}","${s.status}"`)
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n')
    const encoded = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encoded)
    link.setAttribute('download', `vico_students_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    onNotify('Exported students CSV.')
  }

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Learner Accounts</div>
          <h1>Student Directory</h1>
          <p>Manage student profiles and monitor Grade 1 Chapter 1 progress.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline" icon={Download} onClick={handleExportCSV}>
            Export CSV
          </Button>
          <Button icon={Plus} onClick={() => setModalStudent({})}>
            Add Student
          </Button>
        </div>
      </div>

      <section className="panel table-panel">
        <div className="panel-heading">
          <div>
            <h2>
              Enrolled Students <span className="count-pill">{students.length}</span>
            </h2>
            <p>Active learners in the platform</p>
          </div>
        </div>

        <Table headers={['Student', 'Student ID', 'Grade', 'Enrolled', 'Status', 'Actions']}>
          {students.map((s) => (
            <tr key={s.id}>
              <td>
                <div className="person">
                  <Avatar initials={s.initials} tone={s.color} />
                  <div>
                    <strong>{s.name}</strong>
                    <small>{s.email}</small>
                  </div>
                </div>
              </td>
              <td className="muted-cell">{s.id}</td>
              <td>
                <span className="tag">{s.grade}</span>
              </td>
              <td className="muted-cell">{s.enrolled}</td>
              <td>
                <Badge tone={s.status === 'Active' ? 'success' : 'neutral'}>{s.status}</Badge>
              </td>
              <td>
                <div className="action-group">
                  <IconButton label="Edit Student" onClick={() => setModalStudent(s)}>
                    <Edit3 size={15} />
                  </IconButton>
                  <IconButton label="Delete Student" onClick={() => setDeleteId(s.id)}>
                    <Trash2 size={15} color="#e04848" />
                  </IconButton>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </section>

      {modalStudent && (
        <Modal title={modalStudent.id ? 'Edit Student' : 'Enroll Student'} onClose={() => setModalStudent(null)}>
          <label className="field">
            <span>Student Name *</span>
            <input
              value={modalStudent.name || ''}
              onChange={(e) => setModalStudent({ ...modalStudent, name: e.target.value })}
              placeholder="e.g. Rahul Sharma"
            />
          </label>
          <label className="field">
            <span>Email Address</span>
            <input
              value={modalStudent.email || ''}
              onChange={(e) => setModalStudent({ ...modalStudent, email: e.target.value })}
              placeholder="student@example.com"
            />
          </label>
          <label className="field">
            <span>Grade</span>
            <select
              value={modalStudent.grade || 'Grade 1'}
              onChange={(e) => setModalStudent({ ...modalStudent, grade: e.target.value })}
            >
              {SUPPORTED_GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>
          <div className="modal-actions">
            <Button variant="outline" onClick={() => setModalStudent(null)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onSaveStudent(modalStudent)
                setModalStudent(null)
              }}
            >
              Save Student
            </Button>
          </div>
        </Modal>
      )}

      {deleteId && (
        <ConfirmDialog
          title="Delete Student"
          message="Are you sure you want to delete this student account?"
          onConfirm={() => {
            onDeleteStudent(deleteId)
            setDeleteId(null)
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  )
}

/* ========================================================
   ADMIN: VISUAL CONTENT PAGE
   ======================================================== */
function AdminVisualContentPage({ assets, onSaveAsset, onDeleteAsset, onNotify }) {
  const [modalAsset, setModalAsset] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">Media Assets</div>
          <h1>Visual Content & Diagrams</h1>
          <p>Textbook illustrations, animations, and diagrams for lessons.</p>
        </div>
        <Button icon={Plus} onClick={() => setModalAsset({})}>
          Upload Asset
        </Button>
      </div>

      <div className="asset-grid">
        {assets.map((asset) => (
          <div className="asset-card" key={asset.id}>
            <div className={`asset-preview asset-${asset.tone || 'coral'}`}>
              <span>{asset.icon || 'A'}</span>
            </div>
            <div className="asset-info">
              <div>
                <strong>{asset.name}</strong>
                <Badge tone="neutral">{asset.type}</Badge>
              </div>
              <span>{asset.chapter}</span>
              <small>
                {asset.size} · {asset.date}
              </small>
            </div>
            <IconButton label="Delete" onClick={() => setDeleteId(asset.id)}>
              <Trash2 size={16} color="#e04848" />
            </IconButton>
          </div>
        ))}
      </div>

      {modalAsset && (
        <Modal title="Upload Visual Asset" onClose={() => setModalAsset(null)}>
          <label className="field">
            <span>File Name *</span>
            <input
              value={modalAsset.name || ''}
              onChange={(e) => setModalAsset({ ...modalAsset, name: e.target.value })}
              placeholder="e.g. desktop-vs-laptop.png"
            />
          </label>
          <div className="modal-actions">
            <Button variant="outline" onClick={() => setModalAsset(null)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                onSaveAsset(modalAsset)
                setModalAsset(null)
                onNotify('Asset added.')
              }}
            >
              Save Asset
            </Button>
          </div>
        </Modal>
      )}

      {deleteId && (
        <ConfirmDialog
          title="Delete Asset"
          message="Are you sure you want to delete this media asset?"
          onConfirm={() => {
            onDeleteAsset(deleteId)
            setDeleteId(null)
          }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </>
  )
}



/* ========================================================
   ROOT APP LAYOUT & ROUTING
   ======================================================== */
export default function App() {
  const [chapters, setChapters] = useState(() => StorageService.getChapters())
  const [exercises, setExercises] = useState(() => StorageService.getExercises())
  const [tests, setTests] = useState(() => StorageService.getTests())
  const [materials, setMaterials] = useState(() => StorageService.getMaterials())
  const [students, setStudents] = useState(() => StorageService.getStudents())
  const [results, setResults] = useState(() => StorageService.getResults())
  const [assets, setAssets] = useState(() => StorageService.getAssets())
  const [activities, setActivities] = useState(() => StorageService.getActivities())

  const [selectedGrade, setSelectedGrade] = useState('Grade 1')
  const [userMode, setUserMode] = useState(() => StorageService.getUserMode()) // 'admin' or 'student'
  const [toast, setToast] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  function handleSaveChapter(chap) {
    const updated = StorageService.saveChapter(chap)
    setChapters(updated)
    showToast('Chapter saved.')
  }

  function handleDeleteChapter(id) {
    const updated = StorageService.deleteChapter(id)
    setChapters(updated)
    showToast('Chapter deleted.')
  }

  function handleSaveExercise(ex) {
    const updated = StorageService.saveExercise(ex)
    setExercises(updated)
    showToast('Exercise saved.')
  }

  function handleDeleteExercise(id) {
    const updated = StorageService.deleteExercise(id)
    setExercises(updated)
    showToast('Exercise deleted.')
  }

  function handleSaveTest(t) {
    const updated = StorageService.saveTest(t)
    setTests(updated)
    showToast('Test schedule saved.')
  }

  function handleDeleteTest(id) {
    const updated = StorageService.deleteTest(id)
    setTests(updated)
    showToast('Test removed.')
  }

  function handleSaveMaterial(m) {
    const updated = StorageService.saveMaterial(m)
    setMaterials(updated)
    showToast('Material saved.')
  }

  function handleDeleteMaterial(id) {
    const updated = StorageService.deleteMaterial(id)
    setMaterials(updated)
    showToast('Material removed.')
  }

  function handleSaveStudent(s) {
    const updated = StorageService.saveStudent(s)
    setStudents(updated)
    showToast('Student saved.')
  }

  function handleDeleteStudent(id) {
    const updated = StorageService.deleteStudent(id)
    setStudents(updated)
    showToast('Student deleted.')
  }

  function handleSaveResult(r) {
    const updated = StorageService.saveResult(r)
    setResults(updated)
    showToast('Result recorded.')
  }

  function handleDeleteResult(id) {
    const updated = StorageService.deleteResult(id)
    setResults(updated)
    showToast('Result deleted.')
  }

  function handleSaveAsset(a) {
    const updated = StorageService.saveAsset(a)
    setAssets(updated)
    showToast('Asset saved.')
  }

  function handleDeleteAsset(id) {
    const updated = StorageService.deleteAsset(id)
    setAssets(updated)
    showToast('Asset deleted.')
  }


  function toggleMode(mode) {
    setUserMode(mode)
    StorageService.setUserMode(mode)
  }

  const allData = {
    chapters,
    exercises,
    tests,
    materials,
    students,
    results,
    assets,
    activities,
  }

  // Published Grade 1 Chapter 1 for student experience
  const studentChapter = chapters.find((c) => c.grade === 'Grade 1' && c.number === 1 && c.status === 'Published')

  return (
    <BrowserRouter>
      {userMode === 'student' ? (
        /* ================= STUDENT VIEW ================= */
        <div style={{ minHeight: '100vh', background: '#f7f9fb', padding: '24px 20px 60px' }}>
          <StudentChapterReader chapter={studentChapter} onBackToAdmin={() => toggleMode('admin')} />
        </div>
      ) : (
        /* ================= ADMIN VIEW ================= */
        <div className="app-shell">
          <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="brand">
              <span className="brand-mark">V</span>
              <div>
                <strong>VICO</strong>
                <small>Educational Admin</small>
              </div>
              <IconButton label="Close" onClick={() => setSidebarOpen(false)}>
                <X size={18} />
              </IconButton>
            </div>

            <div className="nav-label">Academic Scope</div>
            <div style={{ padding: '0 10px 14px' }}>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  color: 'var(--teal)',
                  fontWeight: 700,
                  background: 'var(--teal-soft)',
                  padding: '5px 10px',
                  borderRadius: '6px',
                }}
              >
                <GraduationCap size={15} /> Grade 1 Space
              </span>
            </div>

            <div className="nav-label">Navigation</div>
            <nav>
              {navItems.map(({ label, icon: Icon, path }) => (
                <NavLink key={path} to={path} end={path === '/'} onClick={() => setSidebarOpen(false)}>
                  <Icon size={18} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="sidebar-bottom">
              <div
                style={{
                  background: '#f8fafb',
                  border: '1px solid #e7ecef',
                  borderRadius: '10px',
                  padding: '12px',
                  marginBottom: '10px',
                }}
              >
                <strong style={{ fontSize: '11px', color: 'var(--ink)', display: 'block' }}>Student Interface</strong>
                <p style={{ margin: '4px 0 10px', fontSize: '10px', color: 'var(--muted)' }}>
                  Preview Grade 1 Chapter 1 student learning space.
                </p>
                <button
                  type="button"
                  className="button button-primary button-sm"
                  style={{ width: '100%' }}
                  onClick={() => toggleMode('student')}
                >
                  <Eye size={14} /> Open Student View
                </button>
              </div>
            </div>
          </aside>

          <div className="main-shell">
            <header className="topbar">
              <IconButton label="Open Menu" onClick={() => setSidebarOpen(true)}>
                <Menu size={21} />
              </IconButton>

              <div className="crumb">
                <span>VICO Academic</span>
                <ChevronRight size={14} />
                <strong>Administrator Portal (Grade 1)</strong>
              </div>

              <div className="top-actions">
                <button
                  className="role-switch-badge"
                  onClick={() => toggleMode('student')}
                  title="Switch to Student Learning Mode"
                >
                  <Eye size={14} />
                  <span>Switch to Student View</span>
                </button>

                <div className="admin-profile">
                  <Avatar initials="AD" tone="mint" />
                  <div>
                    <strong>Administrator</strong>
                    <small>VICL Admin</small>
                  </div>
                </div>
              </div>
            </header>

            <main className="page-content">
              <Routes>
                <Route
                  path="/"
                  element={
                    <DashboardPage
                      data={allData}
                      onOpenStudentView={() => toggleMode('student')}
                      onNavigate={(path) => (window.location.href = path)}
                    />
                  }
                />
                <Route
                  path="/chapters"
                  element={
                    <AdminChaptersPage
                      chapters={chapters}
                      selectedGrade={selectedGrade}
                      onSelectGrade={setSelectedGrade}
                      onSaveChapter={handleSaveChapter}
                      onDeleteChapter={handleDeleteChapter}
                      onOpenReader={() => toggleMode('student')}
                      onNotify={showToast}
                    />
                  }
                />
                <Route
                  path="/exercises"
                  element={
                    <AdminExercisesPage
                      exercises={exercises}
                      onSaveExercise={handleSaveExercise}
                      onDeleteExercise={handleDeleteExercise}
                      onNotify={showToast}
                    />
                  }
                />
                <Route
                  path="/periodic-tests"
                  element={
                    <AdminPeriodicTestsPage
                      tests={tests}
                      students={students}
                      onSaveTest={handleSaveTest}
                      onDeleteTest={handleDeleteTest}
                      onSaveResult={handleSaveResult}
                      onNotify={showToast}
                    />
                  }
                />
                <Route
                  path="/study-material"
                  element={
                    <AdminStudyMaterialPage
                      materials={materials}
                      onSaveMaterial={handleSaveMaterial}
                      onDeleteMaterial={handleDeleteMaterial}
                      onNotify={showToast}
                    />
                  }
                />
                <Route
                  path="/results"
                  element={
                    <AdminResultsPage
                      results={results}
                      students={students}
                      onSaveResult={handleSaveResult}
                      onDeleteResult={handleDeleteResult}
                      onNotify={showToast}
                    />
                  }
                />
                <Route
                  path="/students"
                  element={
                    <AdminStudentsPage
                      students={students}
                      onSaveStudent={handleSaveStudent}
                      onDeleteStudent={handleDeleteStudent}
                      onNotify={showToast}
                    />
                  }
                />
                <Route
                  path="/visual-content"
                  element={
                    <AdminVisualContentPage
                      assets={assets}
                      onSaveAsset={handleSaveAsset}
                      onDeleteAsset={handleDeleteAsset}
                      onNotify={showToast}
                    />
                  }
                />
                <Route
                  path="*"
                  element={
                    <DashboardPage
                      data={allData}
                      onOpenStudentView={() => toggleMode('student')}
                      onNavigate={(path) => (window.location.href = path)}
                    />
                  }
                />
              </Routes>
            </main>
          </div>

          {toast && <Toast message={toast} onClose={() => setToast(null)} />}
        </div>
      )}
    </BrowserRouter>
  )
}
