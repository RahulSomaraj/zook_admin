import Sidebar from "../components/sidebar/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0d0e12]">
      <Sidebar />
      <main className="flex-1 overflow-hidden bg-white">
        {children}
      </main>
    </div>
  );
}