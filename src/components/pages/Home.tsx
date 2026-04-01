import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { jobsData } from '@/lib/jobsData';
import { BottomNavigation } from '../navigation/BottomNavigation';
import {
  Search,
  MapPin,
  Calendar,
  Star,
  Shield,
  FileText,
  Clipboard,
  FileCheck,
  FolderOpen,
  Bell,
  Clock,
  Monitor,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  HardHat,
} from 'lucide-react';

// ── Win2k styled sub-components ──────────────────────────────

function TitlebarBtns() {
  return (
    <div className="flex gap-0.5 ml-auto flex-shrink-0">
      <span className="win-titlebar-btn">─</span>
      <span className="win-titlebar-btn">□</span>
      <span className="win-titlebar-btn font-bold">✕</span>
    </div>
  );
}

function WinWindow({
  title,
  icon,
  children,
  className = '',
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`win-window ${className}`}>
      <div className="win-titlebar">
        {icon && <span className="text-xs">{icon}</span>}
        <span className="flex-1 truncate">{title}</span>
        <TitlebarBtns />
      </div>
      {children}
    </div>
  );
}

// Status badge
function StatusBadge({ status }: { status: string }) {
  const colorMap: Record<string, string> = {
    Installation: 'background:#0000AA;color:#fff',
    Inspection: 'background:#006600;color:#fff',
    Awarded: 'background:#316AC5;color:#fff',
    Complete: 'background:#006600;color:#fff',
    Pending: 'background:#888;color:#fff',
  };
  const style = colorMap[status] || 'background:#888;color:#fff';
  return (
    <span
      className="win-badge"
      style={{ ...(Object.fromEntries(style.split(';').filter(Boolean).map(s => s.split(':') as [string, string]))) }}
    >
      {status}
    </span>
  );
}

export function Home() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem('favorite_jobs') || '[]'); } catch { return []; }
  });
  const [activeTab, setActiveTab] = useState<'inProgress' | 'pending' | 'complete' | 'favorites'>('inProgress');

  const getJobStatus = (jobId: string, defaultStatus: string) =>
    localStorage.getItem(`job_status_${jobId}`) || defaultStatus;

  const toggleFavorite = (jobId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFavorites(prev => {
      const next = prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId];
      localStorage.setItem('favorite_jobs', JSON.stringify(next));
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const getGreeting = () => {
    const hour = new Date().getHours();
    const name = 'Chris';
    if (hour < 12) return t('goodMorning').replace('{name}', name);
    if (hour < 17) return t('goodAfternoon').replace('{name}', name);
    return t('goodEvening').replace('{name}', name);
  };

  const jobs = jobsData.map(job => ({ ...job, status: getJobStatus(job.id, job.status) }));
  const sections = {
    pending: jobs.filter(j => j.status === 'Pending'),
    inProgress: jobs.filter(j => ['Installation', 'Inspection', 'Awarded'].includes(j.status)),
    complete: jobs.filter(j => j.status === 'Complete'),
    favorites: jobs.filter(j => isFavorite(j.id)),
  };

  const filteredJobs = (list: typeof jobs) =>
    searchQuery
      ? list.filter(j =>
          j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : list;

  const currentList = filteredJobs(sections[activeTab]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const docShortcuts = [
    { icon: <Shield size={24} />, label: t('safetyDataSheets') || 'Safety Data Sheets' },
    { icon: <FileText size={24} />, label: t('productDataSheets') || 'Product Data Sheets' },
    { icon: <Clipboard size={24} />, label: t('assemblyLetters') || 'Assembly Letters' },
    { icon: <FileCheck size={24} />, label: t('warranty') || 'Warranty' },
    { icon: <FolderOpen size={24} />, label: t('otherDocuments') || 'Other Documents' },
  ];

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: '#008080', fontFamily: 'Tahoma, Arial, sans-serif' }}
    >
      {/* ── Menubar / App titlebar ── */}
      <div
        style={{
          background: '#D4D0C8',
          borderBottom: '2px solid',
          borderColor: '#fff #888 #888 #fff',
          flexShrink: 0,
        }}
      >
        {/* Title row */}
        <div className="win-titlebar" style={{ margin: '4px 4px 0' }}>
          <HardHat size={14} />
          <span className="flex-1">RoofPro Contractor — Dashboard</span>
          <TitlebarBtns />
        </div>
        {/* Menu row */}
        <div
          style={{
            display: 'flex',
            gap: 0,
            padding: '1px 4px',
            fontSize: 11,
            fontFamily: 'Tahoma, Arial, sans-serif',
          }}
        >
          {['File', 'Edit', 'View', 'Jobs', 'Documents', 'Tools', 'Help'].map(m => (
            <button
              key={m}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '1px 6px',
                fontSize: 11,
                fontFamily: 'Tahoma, Arial, sans-serif',
                cursor: 'pointer',
                color: '#000',
              }}
              className="hover:bg-[#316AC5] hover:text-white"
            >
              {m}
            </button>
          ))}
        </div>
        {/* Toolbar row */}
        <div className="win-toolbar">
          <button className="win-btn" style={{ minWidth: 48 }} onClick={() => navigate('/home')}>
            ← Back
          </button>
          <button className="win-btn" style={{ minWidth: 48 }}>
            → Fwd
          </button>
          <div className="win-sep" />
          <button className="win-btn" onClick={() => navigate('/search')}>
            🔍 Search
          </button>
          <button className="win-btn" onClick={() => navigate('/messages')}>
            ✉ Messages
          </button>
          <button className="win-btn" onClick={() => navigate('/profile')}>
            👤 Profile
          </button>
          <div className="win-sep" />
          {/* Address bar */}
          <form onSubmit={handleSearch} className="flex items-center gap-1 flex-1" style={{ minWidth: 0 }}>
            <span style={{ fontSize: 11, whiteSpace: 'nowrap', color: '#000' }}>Address:</span>
            <input
              className="win-input flex-1"
              style={{ height: 20 }}
              placeholder="Search jobs, locations..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="win-btn" style={{ minWidth: 36 }}>
              Go
            </button>
          </form>
          <div className="win-sep" />
          <button
            className="win-toolbar-btn"
            style={{ width: 28, height: 22 }}
            onClick={() => navigate('/messages')}
            title="Notifications"
          >
            <Bell size={14} />
          </button>
        </div>
      </div>

      {/* ── Main content area ── */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ background: '#D4D0C8', padding: '4px', display: 'flex', flexDirection: 'column', gap: 4 }}
      >
        {/* Greeting + Alert row */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
          {/* Greeting window */}
          <WinWindow
            title="User Info"
            icon={<Monitor size={12} />}
            className="flex-1"
          >
            <div style={{ padding: '4px 8px', fontSize: 11, background: '#D4D0C8' }}>
              <div style={{ fontWeight: 'bold', fontSize: 12 }}>{getGreeting()}</div>
              <div style={{ color: '#444', marginTop: 2 }}>
                📍 Location: Chicago, IL &nbsp;|&nbsp; 🌤 72°F &nbsp;|&nbsp;
                <span style={{ color: '#316AC5', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                  View Profile
                </span>
              </div>
            </div>
          </WinWindow>

          {/* Alert window */}
          <WinWindow
            title="⚠ System Alert"
            icon={<AlertTriangle size={12} />}
            className="flex-1"
          >
            <div
              style={{
                padding: '4px 8px',
                fontSize: 11,
                background: '#FFFFC0',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 6,
              }}
            >
              <Clock size={14} style={{ flexShrink: 0, marginTop: 1, color: '#0000AA' }} />
              <div>
                <strong>Inspection Reminder:</strong> You have an upcoming inspection scheduled. Please review the job details and prepare all required documentation.
              </div>
            </div>
          </WinWindow>
        </div>

        {/* Document shortcuts */}
        <WinWindow title="My Documents — Quick Access" icon={<FolderOpen size={12} />}>
          <div
            style={{
              padding: '6px 8px',
              background: '#D4D0C8',
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            {docShortcuts.map(doc => (
              <button
                key={doc.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 6px',
                  width: 70,
                  fontSize: 9,
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  textAlign: 'center',
                  color: '#000',
                }}
                className="hover:bg-[#316AC5] hover:text-white"
              >
                <span style={{ fontSize: 24 }}>{doc.icon}</span>
                <span style={{ lineHeight: 1.2 }}>{doc.label}</span>
              </button>
            ))}
          </div>
        </WinWindow>

        {/* Jobs Explorer window */}
        <WinWindow
          title="Jobs Explorer"
          icon={<Wrench size={12} />}
          className="flex-1"
        >
          {/* Tabs (styled as Win2k tab control) */}
          <div
            style={{
              display: 'flex',
              borderBottom: '2px solid #888',
              padding: '2px 4px 0',
              background: '#D4D0C8',
              gap: 2,
            }}
          >
            {(
              [
                { key: 'inProgress', label: `In Progress (${sections.inProgress.length})` },
                { key: 'pending', label: `Pending (${sections.pending.length})` },
                { key: 'complete', label: `Complete (${sections.complete.length})` },
                { key: 'favorites', label: `★ Favorites (${sections.favorites.length})` },
              ] as const
            ).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '2px 10px',
                  fontSize: 11,
                  fontFamily: 'Tahoma, Arial, sans-serif',
                  background: activeTab === tab.key ? '#D4D0C8' : '#C0C0C0',
                  border: '2px solid',
                  borderColor:
                    activeTab === tab.key ? '#fff #888 #D4D0C8 #fff' : '#888 #888 #888 #888',
                  borderBottom: activeTab === tab.key ? '2px solid #D4D0C8' : '2px solid #888',
                  cursor: 'pointer',
                  marginBottom: activeTab === tab.key ? -2 : 0,
                  zIndex: activeTab === tab.key ? 1 : 0,
                  position: 'relative',
                  color: '#000',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Listview header */}
          <div style={{ background: '#D4D0C8', padding: '0 2px' }}>
            <table className="win-listview">
              <thead>
                <tr>
                  <th style={{ width: 24 }}></th>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th style={{ width: 48 }}>★</th>
                  <th style={{ width: 60 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentList.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '12px', color: '#666', background: '#fff' }}>
                      No jobs found.
                    </td>
                  </tr>
                ) : (
                  currentList.map(job => (
                    <tr
                      key={job.id}
                      className={selectedJobId === job.id ? 'selected' : ''}
                      onClick={() => setSelectedJobId(job.id)}
                      onDoubleClick={() => navigate(`/job/${job.id}`)}
                      style={{ cursor: 'default' }}
                    >
                      <td>
                        <Wrench size={12} style={{ color: '#316AC5' }} />
                      </td>
                      <td style={{ fontWeight: 'bold' }}>{job.title}</td>
                      <td>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <MapPin size={10} />
                          {job.location}
                        </span>
                      </td>
                      <td>
                        <StatusBadge status={job.status} />
                      </td>
                      <td>
                        {job.dueDate ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Calendar size={10} />
                            {new Date(job.dueDate).toLocaleDateString()}
                          </span>
                        ) : job.completedDate ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CheckCircle2 size={10} style={{ color: '#006600' }} />
                            {new Date(job.completedDate).toLocaleDateString()}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td>
                        <button
                          onClick={e => toggleFavorite(job.id, e)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: 12,
                            color: isFavorite(job.id) ? '#FFD700' : '#888',
                          }}
                          title={isFavorite(job.id) ? 'Remove favorite' : 'Add favorite'}
                        >
                          {isFavorite(job.id) ? '★' : '☆'}
                        </button>
                      </td>
                      <td>
                        <button
                          className="win-btn"
                          style={{ minWidth: 50, height: 18, fontSize: 10 }}
                          onClick={e => { e.stopPropagation(); navigate(`/job/${job.id}`); }}
                        >
                          Open
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Properties panel for selected job */}
          {selectedJobId && (() => {
            const job = jobs.find(j => j.id === selectedJobId);
            if (!job) return null;
            return (
              <div
                style={{
                  margin: '4px',
                  padding: '4px 8px',
                  background: '#FFFFFF',
                  borderTop: '2px solid #888',
                  fontSize: 11,
                  display: 'flex',
                  gap: 16,
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <span><strong>Selected:</strong> {job.title}</span>
                <span><MapPin size={10} style={{ display: 'inline' }} /> {job.location}</span>
                <span><strong>Status:</strong> {job.status}</span>
                {job.dueDate && <span><strong>Due:</strong> {new Date(job.dueDate).toLocaleDateString()}</span>}
                <button
                  className="win-btn"
                  style={{ minWidth: 80, marginLeft: 'auto' }}
                  onClick={() => navigate(`/job/${selectedJobId}`)}
                >
                  Open Job <ChevronRight size={10} style={{ display: 'inline' }} />
                </button>
              </div>
            );
          })()}
        </WinWindow>
      </div>

      {/* ── Status bar ── */}
      <div className="win-statusbar" style={{ flexShrink: 0 }}>
        <div className="win-statusbar-panel" style={{ flex: 1 }}>
          {currentList.length} object(s)
        </div>
        <div className="win-statusbar-panel">
          {sections.inProgress.length} In Progress
        </div>
        <div className="win-statusbar-panel">
          {sections.complete.length} Completed
        </div>
        <div className="win-statusbar-panel" style={{ marginLeft: 'auto' }}>
          🔒 Connected
        </div>
      </div>

      {/* ── Win2k Taskbar / Bottom Nav ── */}
      <BottomNavigation />
    </div>
  );
}
