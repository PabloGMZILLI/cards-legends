import Sidebar from '@/components/Sidebar/Sidebar';

export default function LoggedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-[220px] w-full min-h-screen bg-zinc-900 text-white p-6">
        {children}
      </main>
    </div>
  );
}
