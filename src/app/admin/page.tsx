'use client';

import React, { useState, useEffect } from 'react';
import {
  Lock,
  Search,
  Download,
  Users,
  CheckCircle2,
  XCircle,
  Calendar,
  LogOut,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { RSVPRecord, RSVPStats } from '@/lib/db';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);
  const [stats, setStats] = useState<RSVPStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'both' | 'engagement' | 'wedding' | 'declined'>('all');
  const [selectedRSVP, setSelectedRSVP] = useState<RSVPRecord | null>(null);

  // Fetch RSVPs from protected API
  const fetchRSVPs = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams();
      if (search) query.set('search', search);
      if (filter !== 'all') query.set('filter', filter);

      const res = await fetch(`/api/admin/rsvps?${query.toString()}`);
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setRsvps(data.rsvps);
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Error fetching RSVPs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Check auth status on load
  useEffect(() => {
    fetchRSVPs();
  }, [filter]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setLoginError(data.error || 'Incorrect password.');
        setIsLoggingIn(false);
        return;
      }

      setIsAuthenticated(true);
      setPassword('');
      fetchRSVPs();
    } catch (err) {
      setLoginError('Authentication failed. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch (e) {}
    setIsAuthenticated(false);
    setRsvps([]);
    setStats(null);
  };

  const handleExportCSV = () => {
    window.open('/api/admin/export', '_blank');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchRSVPs();
  };

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen w-full bg-[#10041a] flex items-center justify-center p-4">
        <div className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-b from-[#250f3d] to-[#140624] border border-champagne-400/40 shadow-2xl backdrop-blur-md text-center">
          <div className="w-16 h-16 rounded-full bg-champagne-500/20 border border-champagne-400/50 mx-auto flex items-center justify-center text-champagne-300 mb-4 shadow-lg">
            <ShieldCheck className="w-8 h-8 text-champagne-400" />
          </div>

          <span className="text-xs uppercase tracking-[0.25em] text-champagne-400 font-semibold">
            V&amp;P Invitation Admin
          </span>
          <h2 className="font-serif text-2xl font-bold text-white mt-1 mb-2">
            Administrator Access
          </h2>
          <p className="text-xs text-ivory-100/70 mb-6">
            Enter the private access key to view and manage guest RSVP records.
          </p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs text-center font-medium">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-wider text-champagne-300 font-medium mb-1.5">
                Admin Password / PIN
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-champagne-400/60" />
                <input
                  type="password"
                  required
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0e0317] border border-champagne-400/30 focus:border-champagne-400 focus:outline-none text-white text-sm transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-champagne-500 to-champagne-600 text-[#18072d] font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.01] transition-all disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoggingIn ? 'Verifying...' : 'Unlock Admin Dashboard'}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-champagne-400/15 text-[11px] text-champagne-400/50">
            Protected &bull; V&amp;P Engagement &amp; Wedding 2026
          </div>
        </div>
      </main>
    );
  }

  // AUTHENTICATED DASHBOARD
  return (
    <main className="min-h-screen w-full bg-[#10041a] text-ivory-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Navbar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-champagne-400/20 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-500/15 border border-champagne-400/30 text-champagne-300 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              V&amp;P Guest RSVP Management
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-champagne-500 to-champagne-600 text-[#18072d] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={fetchRSVPs}
              className="p-2.5 rounded-xl bg-[#1e0a35] border border-champagne-400/30 text-champagne-300 hover:text-white transition-colors"
              title="Refresh Records"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs font-medium uppercase tracking-wider hover:bg-rose-900/60 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* METRICS CARDS */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
            <div className="p-4 rounded-2xl bg-[#1e0a35]/80 border border-champagne-400/30">
              <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 font-medium block">
                Total RSVPs
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1 block">
                {stats.totalResponses}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#1e0a35]/80 border border-champagne-400/30">
              <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 font-medium block">
                Engagement Guests
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-champagne-300 mt-1 block">
                {stats.confirmedEngagementGuests}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#1e0a35]/80 border border-champagne-400/30">
              <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 font-medium block">
                Wedding Guests
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-champagne-300 mt-1 block">
                {stats.confirmedWeddingGuests}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#1e0a35]/80 border border-champagne-400/30">
              <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 font-medium block">
                Both Events
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-400 mt-1 block">
                {stats.attendingBoth}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#1e0a35]/80 border border-champagne-400/30">
              <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 font-medium block">
                Declined
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-rose-400 mt-1 block">
                {stats.declined}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#1e0a35]/80 border border-champagne-400/30">
              <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 font-medium block">
                Total Seats
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1 block">
                {stats.totalSeatsExpected}
              </span>
            </div>
          </div>
        )}

        {/* SEARCH & FILTERS BAR */}
        <div className="p-4 rounded-2xl bg-[#1a082c] border border-champagne-400/30 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-champagne-400/60" />
            <input
              type="text"
              placeholder="Search by name or mobile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0f0418] border border-champagne-400/30 text-white text-xs sm:text-sm placeholder:text-champagne-400/30 focus:border-champagne-400 focus:outline-none"
            />
          </form>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'both', label: 'Both' },
                { id: 'engagement', label: 'Engagement' },
                { id: 'wedding', label: 'Wedding' },
                { id: 'declined', label: 'Declined' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                  filter === tab.id
                    ? 'bg-champagne-500 text-[#18072d]'
                    : 'bg-[#140624] text-champagne-300 hover:bg-champagne-500/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="w-full rounded-2xl overflow-hidden border border-champagne-400/30 bg-[#160627] shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#1f0a35] text-champagne-300 uppercase tracking-wider text-[11px] border-b border-champagne-400/20">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Guest Name</th>
                  <th className="py-3.5 px-4 font-semibold">Mobile Number</th>
                  <th className="py-3.5 px-4 font-semibold">Attendance</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Seats</th>
                  <th className="py-3.5 px-4 font-semibold">Submitted</th>
                  <th className="py-3.5 px-4 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-champagne-400/10 text-ivory-100">
                {rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-champagne-400/60 font-sans italic">
                      No RSVP responses found.
                    </td>
                  </tr>
                ) : (
                  rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-champagne-500/5 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white">
                        {rsvp.fullName}
                        {rsvp.email && (
                          <span className="block text-[11px] text-ivory-100/50 font-normal">
                            {rsvp.email}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-champagne-300">
                        {rsvp.mobileNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            rsvp.attendance === 'both'
                              ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300'
                              : rsvp.attendance === 'engagement'
                              ? 'bg-champagne-500/20 border border-champagne-400/40 text-champagne-300'
                              : rsvp.attendance === 'wedding'
                              ? 'bg-lavender-500/20 border border-lavender-400/40 text-lavender-300'
                              : 'bg-rose-500/20 border border-rose-400/40 text-rose-300'
                          }`}
                        >
                          {rsvp.attendance === 'both'
                            ? 'Both Events'
                            : rsvp.attendance === 'engagement'
                            ? 'Engagement'
                            : rsvp.attendance === 'wedding'
                            ? 'Wedding'
                            : 'Declined'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold">
                        {rsvp.attendance === 'declined' ? '—' : rsvp.guestCount}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-ivory-100/60">
                        {new Date(rsvp.submittedAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => setSelectedRSVP(rsvp)}
                          className="px-2.5 py-1 rounded-lg bg-champagne-500/15 hover:bg-champagne-500/30 text-champagne-300 text-xs transition-colors"
                          title="View Message / Details"
                        >
                          <Eye className="w-3.5 h-3.5 inline mr-1" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* DETAILS MODAL */}
        {selectedRSVP && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-lg p-6 rounded-3xl bg-[#1e0a35] border border-champagne-400/40 shadow-2xl text-left">
              <div className="flex items-center justify-between pb-4 border-b border-champagne-400/20">
                <h3 className="font-serif text-xl font-bold text-white">
                  RSVP Details
                </h3>
                <button
                  onClick={() => setSelectedRSVP(null)}
                  className="w-8 h-8 rounded-full bg-black/40 text-champagne-300 hover:text-white flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 my-6 text-sm">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 block">
                    Guest Name
                  </span>
                  <p className="font-bold text-white text-base">{selectedRSVP.fullName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 block">
                      Mobile Number
                    </span>
                    <p className="font-mono text-champagne-200">{selectedRSVP.mobileNumber}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 block">
                      Email Address
                    </span>
                    <p className="text-ivory-100/80">{selectedRSVP.email || '—'}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 block">
                      Attendance
                    </span>
                    <p className="font-semibold text-champagne-300 capitalize">{selectedRSVP.attendance}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 block">
                      Guest Count
                    </span>
                    <p className="font-bold text-white">
                      {selectedRSVP.attendance === 'declined' ? '0' : selectedRSVP.guestCount}
                    </p>
                  </div>
                </div>

                {selectedRSVP.message && (
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-champagne-400/80 block mb-1">
                      Message / Blessing
                    </span>
                    <div className="p-3 rounded-xl bg-black/40 border border-champagne-400/20 italic text-xs sm:text-sm text-ivory-100/90 leading-relaxed">
                      "{selectedRSVP.message}"
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-champagne-400/20 flex justify-end">
                <button
                  onClick={() => setSelectedRSVP(null)}
                  className="px-5 py-2 rounded-xl bg-champagne-500 text-[#18072d] font-bold text-xs uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
