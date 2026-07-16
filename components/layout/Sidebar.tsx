import { SidebarContent } from "./SidebarContent";

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar-bg p-6 lg:flex">
      <SidebarContent />
    </aside>
  );
}
