const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-slate-50 p-4 md:p-8">
    <header className="mb-8">
      <h1 className="text-3xl font-bold">2026 九合一選舉即時開票</h1>
    </header>
    <main className="grid grid-cols-12 gap-4 max-w-[1440px] mx-auto">
      {children}
    </main>
  </div>
);

export default DashboardLayout;
