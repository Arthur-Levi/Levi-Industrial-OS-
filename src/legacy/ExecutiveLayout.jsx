export default function ExecutiveLayout({

  sidebar,
  topbar,
  children

}) {

  return (

    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">

      {sidebar}

      <div className="flex-1 flex flex-col">

        {topbar}

        <main className="flex-1 overflow-auto p-8">

          {children}

        </main>

      </div>

    </div>

  );

}