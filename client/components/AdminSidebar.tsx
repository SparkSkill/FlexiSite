export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4 space-y-3">
      <h2 className="font-semibold text-lg">Admin</h2>
      <nav className="flex flex-col space-y-2">
        <a href="/admin" className="hover:underline">Dashboard</a>
        <a href="/admin/pages/home" className="hover:underline">Pages</a>
        <a href="/admin/services" className="hover:underline">Services</a>
        <a href="/admin/messages" className="hover:underline">Messages</a>
        <a href="/admin/settings" className="hover:underline">Settings</a>
        <a href="/login" className="hover:underline" onClick={() => localStorage.removeItem("token")}>Logout</a>
      </nav>
    </aside>
  );
}
