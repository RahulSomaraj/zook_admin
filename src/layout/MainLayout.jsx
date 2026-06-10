import Sidebar from "../components/sidebar/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#0d0e12]">
      <Sidebar />
      <main className="flex-1 p-6 bg-white">
        {children}
      </main>
    </div>
  );
}