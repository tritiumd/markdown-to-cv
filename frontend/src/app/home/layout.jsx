import { NavbarComponent } from "@/components/main-nav";
import { SidebarMenu } from "@/components/Sidebar";
export const metadata = {
  title: "Home",
  description: "Home Page",
};
function RootLayout({ children }) {
  return (
    <div>
      <NavbarComponent />
      <div className="flex">
        <div className="hidden sm:block">
          <SidebarMenu />
        </div>
        <main className="w-full p-4">{children}</main>
      </div>
    </div>
  );
}
export default RootLayout;
