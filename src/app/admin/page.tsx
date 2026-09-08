"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard, BedDouble, Calendar, MessageSquare,
  BarChart2, Tag, LogOut, Menu, X, Plus, Pencil, Trash2,
  Check, ChevronDown, ChevronUp, Save,
} from "lucide-react";
import { signOut } from "next-auth/react";

// ─── Types ───────────────────────────────────────────────
type BookingStatus = "Confirmed" | "Pending" | "Cancelled";
 
interface Booking {
  id: string;
  ref: string;
  guest: string;
  room: string;
  roomNumber: string;
  checkin: string;
  checkout: string;
  amount: string;
  status: BookingStatus;
  phone: string;
  email: string;
}
 
interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  occupancy: string;
  status: "Active" | "Inactive";
  amenities: string;
}
 
interface Enquiry {
  id: string;
  name: string;
  purpose: string;
  date: string;
  message: string;
  phone: string;
  email: string;
  read: boolean;
}
 
interface Discount {
  id: string;
  name: string;
  code: string;
  type: "Percentage" | "Flat";
  value: number;
  minNights: number;
  active: boolean;
  expiry: string;
}
 
// ─── Initial Data ─────────────────────────────────────────
const initBookings: Booking[] = [];
 
const initRooms: Room[] = [
  { id: "1", name: "Deluxe Room", type: "Deluxe", price: 4000, occupancy: "2 Persons", status: "Active", amenities: "WiFi, Hot Water, Room Service, Smart TV, Safe/Locker" },
  { id: "2", name: "Super Deluxe Room", type: "Super Deluxe", price: 4500, occupancy: "2 Persons", status: "Active", amenities: "WiFi, Hot Water, Balcony, Room Service, Smart TV, Safe/Locker" },
  { id: "3", name: "Executive Room", type: "Executive", price: 5000, occupancy: "2 Persons", status: "Active", amenities: "WiFi, Hot Water, AC, Balcony, Room Service, Smart TV, Safe/Locker" },
  { id: "4", name: "Family Suite", type: "Suite", price: 7500, occupancy: "4 Persons", status: "Active", amenities: "WiFi, Hot Water, AC, Balcony, Living Area, Room Service, Smart TV, Safe/Locker" },
];
 
const initEnquiries: Enquiry[] = [];
 
const initDiscounts: Discount[] = [
  { id: "1", name: "Early Bird Offer", code: "EARLY20", type: "Percentage", value: 20, minNights: 2, active: true, expiry: "2024-12-31" },
  { id: "2", name: "Long Stay Discount", code: "STAY500", type: "Flat", value: 500, minNights: 3, active: true, expiry: "2024-12-31" },
  { id: "3", name: "Diwali Special", code: "DIWALI15", type: "Percentage", value: 15, minNights: 1, active: false, expiry: "2024-11-05" },
];
 
// ─── Helpers ─────────────────────────────────────────────
const statusStyle: Record<BookingStatus, string> = {
  Confirmed: "bg-forest/10 text-forest",
  Pending: "bg-gold/20 text-charcoal-mid",
  Cancelled: "bg-red-50 text-red-600",
};
 
const emptyRoom: Omit<Room, "id"> = {
  name: "", type: "Deluxe", price: 0, occupancy: "2 Persons", status: "Active", amenities: "",
};
 
const emptyDiscount: Omit<Discount, "id"> = {
  name: "", code: "", type: "Percentage", value: 0, minNights: 1, active: true, expiry: "",
};
 
// ─── Sub-components ───────────────────────────────────────
 
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 bg-charcoal/60 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-light">
          <h3 className="font-playfair text-lg text-charcoal">{title}</h3>
          <button onClick={onClose} className="text-text-muted hover:text-charcoal transition-colors">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
 
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block font-hind text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}
 
const inputClass = "w-full border border-stone bg-ivory px-3 py-2.5 text-sm text-charcoal outline-none focus:border-saffron transition-colors font-hind";
 
// ─── Main Component ───────────────────────────────────────
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
 
  // Data state
  const [bookings, setBookings] = useState<Booking[]>(initBookings);
  const [rooms, setRooms] = useState<Room[]>(initRooms);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initEnquiries);
  const [discounts, setDiscounts] = useState<Discount[]>(initDiscounts);
 
  // Modal state
  const [roomModal, setRoomModal] = useState<{ open: boolean; data: Omit<Room, "id"> & { id?: string } }>({
    open: false, data: { ...emptyRoom },
  });
  const [discountModal, setDiscountModal] = useState<{ open: boolean; data: Omit<Discount, "id"> & { id?: string } }>({
    open: false, data: { ...emptyDiscount },
  });
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [expandedEnquiry, setExpandedEnquiry] = useState<string | null>(null);
  const [bookingFilter, setBookingFilter] = useState("All");
  const [bookingSearch, setBookingSearch] = useState("");

  // Fetch real bookings from DB
  useEffect(() => {
    fetch("/api/admin/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (data.bookings) {
          const mapped = data.bookings.map((b: any) => ({
            id: b.id,
            ref: b.bookingRef,
            guest: b.guestName,
            room: b.roomName,
            checkin: new Date(b.checkIn).toISOString().split("T")[0],
            checkout: new Date(b.checkOut).toISOString().split("T")[0],
            amount: "₹" + (b.totalAmount / 100).toLocaleString("en-IN"),
            roomNumber: b.roomNumber ?? "—",
            status: b.status as BookingStatus,
            phone: b.guestPhone,
            email: b.guestEmail,
          }));
          setBookings(mapped);
        }
      })
      .catch(console.error);
    fetch("/api/enquiries")
      .then((res) => res.json())
      .then((data) => {
        if (data.enquiries) {
          const mapped = data.enquiries.map((e: any) => ({
            id: e.id,
            name: e.name,
            purpose: e.purpose,
            date: new Date(e.createdAt).toISOString().split("T")[0],
            message: e.message,
            phone: e.phone,
            email: e.email,
            read: e.isRead,
          }));
          setEnquiries(mapped);
        }
      })
      .catch(console.error);
    fetch("/api/discounts")
      .then((res) => res.json())
      .then((data) => {
        if (data.discounts) {
          const mapped = data.discounts.map((d: any) => ({
            id: d.id,
            name: d.name,
            code: d.code,
            type: d.type as "Percentage" | "Flat",
            value: d.value,
            minNights: d.minNights,
            active: d.active,
            expiry: d.expiry ? new Date(d.expiry).toISOString().split("T")[0] : "",
          }));
          setDiscounts(mapped);
        }
      })
      .catch(console.error);
    fetch("/api/rooms")
    .then((res) => res.json())
    .then((data) => {
      if (data.rooms) {
        const mapped = data.rooms.map((r: any) => ({
          id: r.id,
          name: r.name,
          type: r.type,
          price: r.pricePerNight,
          occupancy: `${r.maxOccupancy} Persons`,
          status: r.isActive ? "Active" : "Inactive",
          amenities: r.amenities.join(", "),
        }));
        setRooms(mapped);
      }
    })
    .catch(console.error);
  }, []);
 
  // ── Room actions
  const openAddRoom = () => setRoomModal({ open: true, data: { ...emptyRoom } });
  const openEditRoom = (r: Room) => setRoomModal({ open: true, data: { ...r } });
  const closeRoomModal = () => setRoomModal({ open: false, data: { ...emptyRoom } });
 
  const saveRoom = async () => {
    if (!roomModal.data.name || !roomModal.data.price) return;
    try {
      const method = roomModal.data.id ? "PATCH" : "POST";
      const res = await fetch("/api/rooms", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: roomModal.data.id,
          name: roomModal.data.name,
          type: roomModal.data.type.toUpperCase().replace(" ", "_"),
          pricePerNight: roomModal.data.price,
          maxOccupancy: parseInt(roomModal.data.occupancy),
          amenities: roomModal.data.amenities,
          status: roomModal.data.status,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error ?? "Failed to save room");
        return;
      }
      if (roomModal.data.id) {
        setRooms((prev) => prev.map((r) => r.id === roomModal.data.id ? { ...roomModal.data, id: roomModal.data.id! } : r));
      } else {
        setRooms((prev) => [...prev, {
          id: data.room.id,
          name: data.room.name,
          type: data.room.type,
          price: data.room.pricePerNight,
          occupancy: `${data.room.maxOccupancy} Persons`,
          status: data.room.isActive ? "Active" : "Inactive",
          amenities: data.room.amenities.join(", "),
        }]);
      }
      closeRoomModal();
    } catch {
      alert("Network error. Try again.");
    }
  };
 
  const deleteRoom = async (id: string) => {
    if (!confirm("Delete this room?")) return;
    setRooms((prev) => prev.filter((r) => r.id !== id));
    await fetch("/api/rooms", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };
 
  const toggleRoomStatus = async (id: string) => {
    const room = rooms.find((r) => r.id === id);
    if (!room) return;
    const newStatus = room.status === "Active" ? "Inactive" : "Active";
    setRooms((prev) => prev.map((r) => r.id === id ? { ...r, status: newStatus } : r));
    await fetch("/api/rooms", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isActive: newStatus === "Active" }),
    });
  };

// ── Manual Booking state
  const [manualBookingOpen, setManualBookingOpen] = useState(false);
  const [manualBooking, setManualBooking] = useState({
    name: "", phone: "", email: "", room: "deluxe",
    checkin: "", checkout: "", guests: "1",
    amount: "", paymentMethod: "Cash", specialRequests: "",
  });
  const [manualBookingMsg, setManualBookingMsg] = useState("");
  const [manualBookingLoading, setManualBookingLoading] = useState(false);
 
  // ── Booking actions
  const updateBookingStatus = async (id: string, status: BookingStatus) => {
    const prev = bookings;
    setBookings((b) => b.map((x) => x.id === id ? { ...x, status } : x));
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error("Failed");
    } catch {
      setBookings(prev); // rollback on failure
      alert("Failed to update booking status. Please try again.");
    }
  };
 
  const filteredBookings = bookings.filter((b) => {
    const matchStatus = bookingFilter === "All" || b.status === bookingFilter;
    const matchSearch = b.guest.toLowerCase().includes(bookingSearch.toLowerCase()) || b.ref.toLowerCase().includes(bookingSearch.toLowerCase());
    return matchStatus && matchSearch;
  });
 
  // ── Enquiry actions
  const markRead = async (id: string) => {
    setEnquiries((prev) => prev.map((e) => e.id === id ? { ...e, read: true } : e));
    await fetch("/api/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isRead: true }),
    });
  };

  const deleteEnquiry = async (id: string) => {
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    await fetch("/api/enquiries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };
 
  // ── Discount actions
  const openAddDiscount = () => setDiscountModal({ open: true, data: { ...emptyDiscount } });
  const openEditDiscount = (d: Discount) => setDiscountModal({ open: true, data: { ...d } });
  const closeDiscountModal = () => setDiscountModal({ open: false, data: { ...emptyDiscount } });
 
  const saveDiscount = async () => {
    if (!discountModal.data.name || !discountModal.data.code) return;
    try {
      const method = discountModal.data.id ? "PATCH" : "POST";
      const res = await fetch("/api/discounts", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discountModal.data),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error ?? "Failed to save discount");
        return;
      }
      if (discountModal.data.id) {
        setDiscounts((prev) => prev.map((d) => d.id === discountModal.data.id ? { ...discountModal.data, id: discountModal.data.id! } : d));
      } else {
        setDiscounts((prev) => [...prev, { ...data.discount, expiry: data.discount.expiry ? new Date(data.discount.expiry).toISOString().split("T")[0] : "" }]);
      }
      closeDiscountModal();
    } catch {
      alert("Network error. Try again.");
    }
  };
 
  const toggleDiscount = async (id: string) => {
    const discount = discounts.find((d) => d.id === id);
    if (!discount) return;
    setDiscounts((prev) => prev.map((d) => d.id === id ? { ...d, active: !d.active } : d));
    await fetch("/api/discounts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active: !discount.active }),
    });
  };
 
  const deleteDiscount = async (id: string) => {
    if (!confirm("Delete this discount?")) return;
    setDiscounts((prev) => prev.filter((d) => d.id !== id));
    await fetch("/api/discounts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  };
 
  // ── Stats
  const confirmed = bookings.filter((b) => b.status === "Confirmed").length;
  const pending = bookings.filter((b) => b.status === "Pending").length;
  const unread = enquiries.filter((e) => !e.read).length;
 
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
    { id: "bookings", label: "Bookings", icon: <Calendar size={16} /> },
    { id: "rooms", label: "Rooms", icon: <BedDouble size={16} /> },
    { id: "enquiries", label: "Enquiries", icon: <MessageSquare size={16} /> },
    { id: "discounts", label: "Discounts", icon: <Tag size={16} /> },
    { id: "analytics", label: "Analytics", icon: <BarChart2 size={16} /> },
  ];

  const handleManualBooking = async () => {
    setManualBookingLoading(true);
    setManualBookingMsg("");
    try {
      const res = await fetch("/api/bookings/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: manualBooking.room,
          checkin: manualBooking.checkin,
          checkout: manualBooking.checkout,
          guests: manualBooking.guests,
          name: manualBooking.name,
          email: manualBooking.email,
          phone: manualBooking.phone,
          amount: manualBooking.amount,
          paymentMethod: manualBooking.paymentMethod,
          specialRequests: manualBooking.specialRequests,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setManualBookingMsg(data.error ?? "Something went wrong.");
      } else {
        setManualBookingMsg(`Booking confirmed! Ref: ${data.bookingRef} · Room ${data.roomNumber}`);
        setManualBooking({ name: "", phone: "", email: "", room: "deluxe", checkin: "", checkout: "", guests: "1", amount: "", paymentMethod: "Cash", specialRequests: "" });
      }
    } catch {
      setManualBookingMsg("Network error. Try again.");
    }
    setManualBookingLoading(false);
  };
 
  return (
    <div className="flex h-screen bg-ivory overflow-hidden font-hind">
 
      {/* ── Sidebar */}
      <aside className={`${sidebarOpen ? "w-56" : "w-14"} bg-charcoal flex flex-col transition-all duration-300 shrink-0`}>
        <div className="p-4 border-b border-white/10 flex items-center gap-3 min-h-[68px]">
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="font-playfair text-sm text-white leading-none truncate">Shubharambh</p>
              <p className="font-hind text-[9px] text-white/40 tracking-widest uppercase mt-0.5">Admin Panel</p>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/40 hover:text-white transition-colors shrink-0">
            <Menu size={16} />
          </button>
        </div>
 
        <nav className="flex-1 py-3 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-[12px] transition-colors relative ${
                activeTab === item.id ? "bg-saffron text-white" : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="shrink-0">{item.icon}</span>
              {sidebarOpen && <span className="tracking-wide">{item.label}</span>}
            </button>
          ))}
        </nav>
 
        <div className="p-3 border-t border-white/10">
          <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full flex items-center gap-3 px-2 py-2 text-[12px] text-white/40 hover:text-white transition-colors">
            <LogOut size={16} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
 
      {/* ── Main */}
      <div className="flex-1 overflow-auto flex flex-col">
 
        {/* Top bar */}
        <header className="bg-white border-b border-stone-light px-8 py-4 flex items-center justify-between shrink-0">
          <h1 className="font-playfair text-xl text-charcoal capitalize">{activeTab}</h1>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-saffron-pale border border-saffron/20 flex items-center justify-center">
              <span className="font-playfair text-xs text-saffron font-bold">A</span>
            </div>
            <span className="font-hind text-sm text-charcoal-mid">Admin</span>
          </div>
        </header>
 
        <div className="p-6 flex-1 overflow-auto">
 
          {/* ══ DASHBOARD ══ */}
          {activeTab === "dashboard" && (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total Bookings", value: bookings.length, sub: `${confirmed} confirmed`, color: "border-l-saffron" },
                  { label: "Pending Bookings", value: pending, sub: "Awaiting confirmation", color: "border-l-gold" },
                  { label: "Active Rooms", value: rooms.filter((r) => r.status === "Active").length, sub: `${rooms.length} total rooms`, color: "border-l-forest" },
                  { label: "Unread Enquiries", value: unread, sub: "Reply within 24h", color: "border-l-charcoal-mid" },
                ].map((s) => (
                  <div key={s.label} className={`bg-white border border-stone-light border-l-4 ${s.color} p-5`}>
                    <p className="font-hind text-[11px] uppercase tracking-widest text-text-muted mb-1">{s.label}</p>
                    <p className="font-playfair text-3xl text-charcoal font-semibold">{s.value}</p>
                    <p className="font-hind text-[11px] text-text-muted mt-1">{s.sub}</p>
                  </div>
                ))}
              </div>
 
              {/* Recent bookings */}
              <div className="bg-white border border-stone-light">
                <div className="px-6 py-4 border-b border-stone-light flex items-center justify-between">
                  <h2 className="font-playfair text-lg text-charcoal">Recent Bookings</h2>
                  <button onClick={() => setActiveTab("bookings")} className="font-hind text-[11px] text-saffron uppercase tracking-wide hover:underline">
                    View All
                  </button>
                </div>
                <BookingsTable
                  bookings={bookings.slice(0, 4)}
                  onConfirm={(id) => updateBookingStatus(id, "Confirmed")}
                  onCancel={(id) => updateBookingStatus(id, "Cancelled")}
                  expanded={expandedBooking}
                  setExpanded={setExpandedBooking}
                />
              </div>
 
              {/* Active discounts summary */}
              <div className="bg-white border border-stone-light">
                <div className="px-6 py-4 border-b border-stone-light flex items-center justify-between">
                  <h2 className="font-playfair text-lg text-charcoal">Active Discounts</h2>
                  <button onClick={() => setActiveTab("discounts")} className="font-hind text-[11px] text-saffron uppercase tracking-wide hover:underline">
                    Manage
                  </button>
                </div>
                <div className="p-4 flex flex-wrap gap-3">
                  {discounts.filter((d) => d.active).map((d) => (
                    <div key={d.id} className="border border-stone-light bg-ivory px-4 py-2.5 flex items-center gap-3">
                      <span className="font-hind text-xs font-bold text-forest tracking-widest uppercase">{d.code}</span>
                      <span className="font-hind text-xs text-text-muted">
                        {d.type === "Percentage" ? `${d.value}% off` : `₹${d.value} off`}
                      </span>
                      <span className="font-hind text-[10px] text-stone-dark">Expires {d.expiry}</span>
                    </div>
                  ))}
                  {discounts.filter((d) => d.active).length === 0 && (
                    <p className="font-hind text-sm text-text-muted p-2">No active discounts.</p>
                  )}
                </div>
              </div>
            </div>
          )}
 
          {/* ══ BOOKINGS ══ */}
          {activeTab === "bookings" && (
            <div className="bg-white border border-stone-light">
              <div className="px-6 py-4 border-b border-stone-light flex flex-wrap items-center gap-3">
                <h2 className="font-playfair text-lg text-charcoal mr-auto">All Bookings</h2>
                <button
                  onClick={() => setManualBookingOpen(true)}
                  className="btn-primary flex items-center gap-2 text-sm py-2 px-4"
                >
                  <Plus size={14} /> Add Manual Booking
                </button>
                <input
                  type="text"
                  placeholder="Search guest or ref..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="border border-stone-light bg-ivory px-3 py-1.5 text-sm outline-none focus:border-saffron transition-colors w-48"
                />
                <select
                  value={bookingFilter}
                  onChange={(e) => setBookingFilter(e.target.value)}
                  className="border border-stone-light bg-ivory px-3 py-1.5 text-sm outline-none focus:border-saffron transition-colors"
                >
                  <option>All</option>
                  <option>Confirmed</option>
                  <option>Pending</option>
                  <option>Cancelled</option>
                </select>
              </div>
              <BookingsTable
                bookings={filteredBookings}
                onConfirm={(id) => updateBookingStatus(id, "Confirmed")}
                onCancel={(id) => updateBookingStatus(id, "Cancelled")}
                expanded={expandedBooking}
                setExpanded={setExpandedBooking}
              />
              {filteredBookings.length === 0 && (
                <p className="text-center font-hind text-sm text-text-muted py-10">No bookings found.</p>
              )}
            </div>
          )}
 
          {/* ══ ROOMS ══ */}
          {activeTab === "rooms" && (
            <div>
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-playfair text-xl text-charcoal">Room Management</h2>
                <button onClick={openAddRoom} className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5">
                  <Plus size={15} /> Add New Room
                </button>
              </div>
 
              <div className="flex flex-col gap-4">
                {rooms.map((room) => (
                  <div key={room.id} className="bg-white border border-stone-light p-5">
                    <div className="flex flex-wrap items-center gap-4 justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-playfair text-lg text-charcoal">{room.name}</h3>
                          <span className={`font-hind text-[10px] uppercase tracking-wide px-2.5 py-0.5 ${room.status === "Active" ? "bg-forest/10 text-forest" : "bg-red-50 text-red-500"}`}>
                            {room.status}
                          </span>
                        </div>
                        <p className="font-hind text-sm text-text-muted">
                          {room.type} · {room.occupancy} · <span className="text-saffron font-semibold">₹{room.price.toLocaleString()}/night</span>
                        </p>
                        <p className="font-hind text-xs text-stone-dark mt-1">{room.amenities}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => toggleRoomStatus(room.id)}
                          className="font-hind text-[11px] border border-stone-light px-3 py-1.5 hover:border-saffron text-text-muted hover:text-saffron transition-colors"
                        >
                          {room.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => openEditRoom(room)}
                          className="flex items-center gap-1.5 font-hind text-[11px] border border-stone-light px-3 py-1.5 hover:border-forest text-text-muted hover:text-forest transition-colors"
                        >
                          <Pencil size={12} /> Edit
                        </button>
                        <button
                          onClick={() => deleteRoom(room.id)}
                          className="flex items-center gap-1.5 font-hind text-[11px] border border-red-100 px-3 py-1.5 hover:border-red-300 text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
 
          {/* ══ ENQUIRIES ══ */}
          {activeTab === "enquiries" && (
            <div className="bg-white border border-stone-light">
              <div className="px-6 py-4 border-b border-stone-light">
                <h2 className="font-playfair text-lg text-charcoal">
                  Guest Enquiries
                  {unread > 0 && (
                    <span className="ml-2 bg-saffron text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {unread} new
                    </span>
                  )}
                </h2>
              </div>
              <div className="divide-y divide-stone-light">
                {enquiries.map((e) => (
                  <div key={e.id} className={`px-6 py-5 ${!e.read ? "bg-saffron-pale/20" : ""}`}>
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-playfair text-base text-charcoal">{e.name}</span>
                        {!e.read && <span className="w-2 h-2 rounded-full bg-saffron shrink-0" />}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-hind text-[11px] text-text-muted">{e.date}</span>
                        <button onClick={() => deleteEnquiry(e.id)} className="text-red-300 hover:text-red-500 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="font-hind text-[11px] text-saffron uppercase tracking-wide mb-1">{e.purpose}</p>
                    
                    <p className="font-hind text-sm text-text-muted leading-relaxed mb-3">{e.message}</p>
 
                    {/* Expanded details */}
                    {expandedEnquiry === e.id && (
                      <div className="bg-ivory border border-stone-light p-4 mb-3 text-sm font-hind text-charcoal-mid flex flex-col gap-1">
                        <p><span className="text-text-muted">Phone:</span> {e.phone}</p>
                        <p><span className="text-text-muted">Email:</span> {e.email}</p>
                        <a
                          href={`mailto:${e.email}?subject=Re: Your enquiry — Shubharambh Hotel`}
                          className="inline-block mt-2 btn-primary text-xs py-2 px-4 w-fit"
                        >
                          Reply via Email
                        </a>
                      </div>
                    )}
 
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          setExpandedEnquiry(expandedEnquiry === e.id ? null : e.id);
                          markRead(e.id);
                        }}
                        className="font-hind text-[11px] text-forest uppercase tracking-wide hover:underline flex items-center gap-1"
                      >
                        {expandedEnquiry === e.id ? <><ChevronUp size={12} /> Hide Details</> : <><ChevronDown size={12} /> View & Reply</>}
                      </button>
                      {!e.read && (
                        <button onClick={() => markRead(e.id)} className="font-hind text-[11px] text-text-muted uppercase tracking-wide hover:text-charcoal flex items-center gap-1">
                          <Check size={12} /> Mark Read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {enquiries.length === 0 && (
                  <p className="text-center font-hind text-sm text-text-muted py-10">No enquiries yet.</p>
                )}
              </div>
            </div>
          )}
 
          {/* ══ DISCOUNTS ══ */}
          {activeTab === "discounts" && (
            <div>
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="font-playfair text-xl text-charcoal">Discount Management</h2>
                  <p className="font-hind text-sm text-text-muted mt-0.5">Create and manage promo codes and special offers</p>
                </div>
                <button onClick={openAddDiscount} className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5">
                  <Plus size={15} /> Add Discount
                </button>
              </div>
 
              <div className="flex flex-col gap-4">
                {discounts.map((d) => (
                  <div key={d.id} className={`bg-white border p-5 ${d.active ? "border-stone-light" : "border-stone-light opacity-60"}`}>
                    <div className="flex flex-wrap items-center gap-4 justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="font-hind text-[11px] font-bold tracking-[0.18em] uppercase bg-forest text-white px-3 py-1">
                            {d.code}
                          </span>
                          <h3 className="font-playfair text-base text-charcoal">{d.name}</h3>
                          <span className={`font-hind text-[10px] uppercase tracking-wide px-2 py-0.5 ${d.active ? "bg-forest/10 text-forest" : "bg-stone-light text-text-muted"}`}>
                            {d.active ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 font-hind text-sm text-text-muted">
                          <span>
                            Discount:{" "}
                            <strong className="text-saffron">
                              {d.type === "Percentage" ? `${d.value}%` : `₹${d.value}`} off
                            </strong>
                          </span>
                          <span>Min nights: <strong className="text-charcoal">{d.minNights}</strong></span>
                          <span>Type: <strong className="text-charcoal">{d.type}</strong></span>
                          <span>Expires: <strong className="text-charcoal">{d.expiry || "—"}</strong></span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => toggleDiscount(d.id)}
                          className="font-hind text-[11px] border border-stone-light px-3 py-1.5 hover:border-saffron text-text-muted hover:text-saffron transition-colors"
                        >
                          {d.active ? "Deactivate" : "Activate"}
                        </button>
                        <button
                          onClick={() => openEditDiscount(d)}
                          className="flex items-center gap-1.5 font-hind text-[11px] border border-stone-light px-3 py-1.5 hover:border-forest text-text-muted hover:text-forest transition-colors"
                        >
                          <Pencil size={12} /> Edit
                        </button>
                        <button
                          onClick={() => deleteDiscount(d.id)}
                          className="flex items-center gap-1.5 font-hind text-[11px] border border-red-100 px-3 py-1.5 hover:border-red-300 text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {discounts.length === 0 && (
                  <div className="bg-white border border-stone-light p-12 text-center">
                    <Tag size={28} className="mx-auto text-stone mb-3" />
                    <p className="font-playfair text-lg text-charcoal mb-1">No discounts yet</p>
                    <p className="font-hind text-sm text-text-muted">Click "Add Discount" to create your first promo code.</p>
                  </div>
                )}
              </div>
            </div>
          )}
 
          {/* ══ ANALYTICS ══ */}
          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-stone-light p-6">
                <h3 className="font-playfair text-lg text-charcoal mb-1">Monthly Bookings</h3>
                <p className="font-hind text-xs text-text-muted mb-5">Current year</p>
                <div className="flex items-end gap-2 h-44">
                  {Array.from({ length: 12 }, (_, i) =>
                  bookings.filter((b) => new Date(b.checkin).getMonth() === i).length).map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <span className="font-hind text-[9px] text-text-muted">{v}</span>
                      <div className="w-full bg-saffron/80 rounded-t-sm transition-all" style={{ height: `${(v / 15) * 100}%` }} />
                      <span className="font-hind text-[8px] text-text-muted">
                        {["J","F","M","A","M","J","J","A","S","O","N","D"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
 
              <div className="bg-white border border-stone-light p-6">
                <h3 className="font-playfair text-lg text-charcoal mb-1">Bookings by Room</h3>
                <p className="font-hind text-xs text-text-muted mb-5">All time</p>
                <div className="flex flex-col gap-4">
                  {rooms.map((r, i) => {
                    const count = bookings.filter((b) => b.room === r.name).length;
                    const pct = bookings.length > 0 ? Math.round((count / bookings.length) * 100) : 0;
                    return (
                      <div key={r.id}>
                        <div className="flex justify-between mb-1">
                          <span className="font-hind text-xs text-charcoal-mid">{r.name}</span>
                          <span className="font-hind text-xs text-text-muted">{pct}%</span>
                        </div>
                        <div className="h-2 bg-stone-light w-full">
                          <div className="h-2 bg-saffron transition-all" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
 
              <div className="bg-white border border-stone-light p-6">
                <h3 className="font-playfair text-lg text-charcoal mb-5">Booking Status Breakdown</h3>
                <div className="flex flex-col gap-3">
                  {(["Confirmed", "Pending", "Cancelled"] as BookingStatus[]).map((s) => {
                    const count = bookings.filter((b) => b.status === s).length;
                    const pct = bookings.length > 0 ? Math.round((count / bookings.length) * 100) : 0;
                    return (
                      <div key={s} className="flex items-center gap-4">
                        <span className={`font-hind text-[10px] uppercase tracking-wide px-2 py-0.5 w-24 text-center ${statusStyle[s]}`}>{s}</span>
                        <div className="flex-1 h-2 bg-stone-light">
                          <div className={`h-2 ${s === "Confirmed" ? "bg-forest" : s === "Pending" ? "bg-gold" : "bg-red-400"}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="font-hind text-sm text-charcoal-mid w-12 text-right">{count} ({pct}%)</span>
                      </div>
                    );
                  })}
                </div>
              </div>
 
              <div className="bg-white border border-stone-light p-6">
                <h3 className="font-playfair text-lg text-charcoal mb-5">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Total Rooms", value: rooms.length },
                    { label: "Active Rooms", value: rooms.filter((r) => r.status === "Active").length },
                    { label: "Active Discounts", value: discounts.filter((d) => d.active).length },
                    { label: "Total Enquiries", value: enquiries.length },
                  ].map((s) => (
                    <div key={s.label} className="border border-stone-light p-4 text-center">
                      <span className="font-playfair text-2xl text-saffron font-semibold block">{s.value}</span>
                      <span className="font-hind text-[11px] text-text-muted uppercase tracking-wide">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Manual Booking Modal */}
      {manualBookingOpen && (
        <Modal title="Add Manual Booking" onClose={() => { setManualBookingOpen(false); setManualBookingMsg(""); }}>
        <Field label="Guest Name *">
          <input className={inputClass} value={manualBooking.name} onChange={(e) => setManualBooking({ ...manualBooking, name: e.target.value })} placeholder="Full name" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Phone *">
            <input className={inputClass} value={manualBooking.phone} onChange={(e) => setManualBooking({ ...manualBooking, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
          </Field>
          <Field label="Email">
            <input className={inputClass} value={manualBooking.email} onChange={(e) => setManualBooking({ ...manualBooking, email: e.target.value })} placeholder="guest@email.com" />
          </Field>
        </div>
        <Field label="Room Category *">
          <select className={inputClass} value={manualBooking.room} onChange={(e) => setManualBooking({ ...manualBooking, room: e.target.value })}>
            <option value="deluxe">Deluxe Room</option>
            <option value="super-deluxe">Super Deluxe Room</option>
            <option value="executive">Executive Room</option>
            <option value="family-suite">Family Suite</option>
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Check In *">
            <input type="date" className={inputClass} value={manualBooking.checkin} onChange={(e) => setManualBooking({ ...manualBooking, checkin: e.target.value })} />
          </Field>
          <Field label="Check Out *">
            <input type="date" className={inputClass} value={manualBooking.checkout} onChange={(e) => setManualBooking({ ...manualBooking, checkout: e.target.value })} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Guests">
            <select className={inputClass} value={manualBooking.guests} onChange={(e) => setManualBooking({ ...manualBooking, guests: e.target.value })}>
              {["1","2","3","4","5"].map(g => <option key={g}>{g}</option>)}
            </select>
          </Field>
          <Field label="Payment Method">
            <select className={inputClass} value={manualBooking.paymentMethod} onChange={(e) => setManualBooking({ ...manualBooking, paymentMethod: e.target.value })}>
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
              <option>Bank Transfer</option>
            </select>
          </Field>
        </div>
        <Field label="Amount Received (₹)">
          <input type="number" className={inputClass} value={manualBooking.amount} onChange={(e) => setManualBooking({ ...manualBooking, amount: e.target.value })} placeholder="e.g. 4000" />
        </Field>
        <Field label="Special Requests / Notes">
          <textarea className={inputClass} rows={3} value={manualBooking.specialRequests} onChange={(e) => setManualBooking({ ...manualBooking, specialRequests: e.target.value })} />
        </Field>
        {manualBookingMsg && (
          <p className={`font-hind text-sm px-3 py-2 mb-2 ${manualBookingMsg.includes("confirmed") ? "bg-forest/10 text-forest" : "bg-red-50 text-red-600"}`}>
          {manualBookingMsg}
          </p>
        )}
        <div className="flex gap-3 mt-4">
          <button onClick={() => { setManualBookingOpen(false); setManualBookingMsg(""); }} className="btn-secondary flex-1 py-2.5">Cancel</button>
          <button onClick={handleManualBooking} disabled={manualBookingLoading} className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2 disabled:opacity-60">
          <Save size={14} /> {manualBookingLoading ? "Saving..." : "Confirm Booking"}
          </button>
        </div>
      </Modal>
      )}
 
      {/* ── Room Modal */}
      {roomModal.open && (
        <Modal title={roomModal.data.id ? "Edit Room" : "Add New Room"} onClose={closeRoomModal}>
          <Field label="Room Name *">
            <input className={inputClass} value={roomModal.data.name} onChange={(e) => setRoomModal((m) => ({ ...m, data: { ...m.data, name: e.target.value } }))} placeholder="e.g. Mountain View Deluxe" />
          </Field>
          <Field label="Room Type">
            <select className={inputClass} value={roomModal.data.type} onChange={(e) => setRoomModal((m) => ({ ...m, data: { ...m.data, type: e.target.value } }))}>
              {["Deluxe", "Suite", "Family", "Super Deluxe"].map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Price per Night (₹) *">
              <input type="number" className={inputClass} value={roomModal.data.price || ""} onChange={(e) => setRoomModal((m) => ({ ...m, data: { ...m.data, price: Number(e.target.value) } }))} placeholder="3500" />
            </Field>
            <Field label="Occupancy">
              <select className={inputClass} value={roomModal.data.occupancy} onChange={(e) => setRoomModal((m) => ({ ...m, data: { ...m.data, occupancy: e.target.value } }))}>
                {["1 Person", "2 Persons", "3 Persons", "4 Persons", "5+ Persons"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Amenities (comma separated)">
            <input className={inputClass} value={roomModal.data.amenities} onChange={(e) => setRoomModal((m) => ({ ...m, data: { ...m.data, amenities: e.target.value } }))} placeholder="WiFi, Hot Water, Mountain View" />
          </Field>
          <Field label="Status">
            <select className={inputClass} value={roomModal.data.status} onChange={(e) => setRoomModal((m) => ({ ...m, data: { ...m.data, status: e.target.value as "Active" | "Inactive" } }))}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </Field>
          <div className="flex gap-3 mt-6">
            <button onClick={closeRoomModal} className="btn-secondary flex-1 py-2.5">Cancel</button>
            <button onClick={saveRoom} className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2">
              <Save size={14} /> {roomModal.data.id ? "Save Changes" : "Add Room"}
            </button>
          </div>
        </Modal>
      )}
 
      {/* ── Discount Modal */}
      {discountModal.open && (
        <Modal title={discountModal.data.id ? "Edit Discount" : "Add New Discount"} onClose={closeDiscountModal}>
          <Field label="Discount Name *">
            <input className={inputClass} value={discountModal.data.name} onChange={(e) => setDiscountModal((m) => ({ ...m, data: { ...m.data, name: e.target.value } }))} placeholder="e.g. Early Bird Offer" />
          </Field>
          <Field label="Promo Code *">
            <input className={`${inputClass} uppercase`} value={discountModal.data.code} onChange={(e) => setDiscountModal((m) => ({ ...m, data: { ...m.data, code: e.target.value.toUpperCase() } }))} placeholder="e.g. EARLY20" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Discount Type">
              <select className={inputClass} value={discountModal.data.type} onChange={(e) => setDiscountModal((m) => ({ ...m, data: { ...m.data, type: e.target.value as "Percentage" | "Flat" } }))}>
                <option value="Percentage">Percentage (%)</option>
                <option value="Flat">Flat Amount (₹)</option>
              </select>
            </Field>
            <Field label={discountModal.data.type === "Percentage" ? "Discount %" : "Amount Off (₹)"}>
              <input type="number" className={inputClass} value={discountModal.data.value || ""} onChange={(e) => setDiscountModal((m) => ({ ...m, data: { ...m.data, value: Number(e.target.value) } }))} placeholder={discountModal.data.type === "Percentage" ? "20" : "500"} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Minimum Nights">
              <input type="number" className={inputClass} value={discountModal.data.minNights || ""} onChange={(e) => setDiscountModal((m) => ({ ...m, data: { ...m.data, minNights: Number(e.target.value) } }))} placeholder="1" />
            </Field>
            <Field label="Expiry Date">
              <input type="date" className={inputClass} value={discountModal.data.expiry} onChange={(e) => setDiscountModal((m) => ({ ...m, data: { ...m.data, expiry: e.target.value } }))} />
            </Field>
          </div>
          <Field label="Status">
            <select className={inputClass} value={discountModal.data.active ? "Active" : "Inactive"} onChange={(e) => setDiscountModal((m) => ({ ...m, data: { ...m.data, active: e.target.value === "Active" } }))}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </Field>
          <div className="flex gap-3 mt-6">
            <button onClick={closeDiscountModal} className="btn-secondary flex-1 py-2.5">Cancel</button>
            <button onClick={saveDiscount} className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2">
              <Save size={14} /> {discountModal.data.id ? "Save Changes" : "Add Discount"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
 
// ─── Bookings Table ───────────────────────────────────────
function BookingsTable({
  bookings,
  onConfirm,
  onCancel,
  expanded,
  setExpanded,
}: {
  bookings: Booking[];
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
  expanded: string | null;
  setExpanded: (id: string | null) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-ivory border-b border-stone-light">
            {["Ref", "Guest", "Room", "Check-in", "Check-out", "Amount", "Status", "Actions"].map((h) => (
              <th key={h} className="px-4 py-3 text-left font-hind text-[10px] uppercase tracking-widest text-text-muted font-semibold whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-light">
          {bookings.map((b) => (
            <React.Fragment key={b.id}>
              <tr  className="hover:bg-ivory transition-colors">
                <td className="px-4 py-3 font-hind text-sm font-semibold text-charcoal">{b.ref}</td>
                <td className="px-4 py-3 font-hind text-sm text-charcoal whitespace-nowrap">{b.guest}</td>
                <td className="px-4 py-3 font-hind text-sm text-text-muted whitespace-nowrap">
                  {b.room}
                  {b.roomNumber && b.roomNumber !== "—" && (
                    <span className="ml-1.5 font-hind text-[10px] bg-forest/10 text-forest px-1.5 py-0.5">#{b.roomNumber}</span>)}
                </td>
                <td className="px-4 py-3 font-hind text-sm text-text-muted whitespace-nowrap">{b.checkin}</td>
                <td className="px-4 py-3 font-hind text-sm text-text-muted whitespace-nowrap">{b.checkout}</td>
                <td className="px-4 py-3 font-playfair text-base text-charcoal whitespace-nowrap">{b.amount}</td>
                <td className="px-4 py-3">
                  <span className={`font-hind text-[10px] uppercase tracking-wide px-2.5 py-1 whitespace-nowrap ${statusStyle[b.status]}`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setExpanded(expanded === b.id ? null : b.id)}
                      className="font-hind text-[11px] text-forest hover:underline whitespace-nowrap flex items-center gap-0.5"
                    >
                      {expanded === b.id ? <ChevronUp size={11} /> : <ChevronDown size={11} />} Details
                    </button>
                    {b.status !== "Confirmed" && (
                      <button onClick={() => onConfirm(b.id)} className="font-hind text-[11px] text-forest hover:underline whitespace-nowrap">
                        Confirm
                      </button>
                    )}
                    {b.status !== "Cancelled" && (
                      <button onClick={() => onCancel(b.id)} className="font-hind text-[11px] text-red-500 hover:underline whitespace-nowrap">
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
              {expanded === b.id && (
                <tr className="bg-ivory">
                  <td colSpan={8} className="px-6 py-4">
                    <div className="flex flex-wrap gap-6 font-hind text-sm text-charcoal-mid">
                      <span><span className="text-text-muted">Phone:</span> {b.phone}</span>
                      <span><span className="text-text-muted">Email:</span> {b.email}</span>
                      <a href={`mailto:${b.email}`} className="text-saffron hover:underline">Send Email</a>
                      <a href={`https://wa.me/${b.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-forest hover:underline">WhatsApp Guest</a>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 


