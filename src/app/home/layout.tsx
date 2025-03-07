import SideNav from "@/app/ui/home/side-nav";

export const experimental_ppr = true;

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-100">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow md:overflow-y-auto">{children}</div>
    </div>
  );
}