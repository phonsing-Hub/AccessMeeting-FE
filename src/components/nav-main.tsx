
import { useNavigate, useLocation } from "react-router";

import { LayoutDashboard, ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
    }[];
  }[];
}) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Access Meeting</SidebarGroupLabel>
      <SidebarMenu>
      <SidebarMenuButton tooltip="Dashboard" 
      onClick={() => navigate("/")}
      isActive={location.pathname == "/" ? true : false}
      >
        <LayoutDashboard/>
        <span>Dashboard</span> 
      </SidebarMenuButton>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={location.pathname == item.url ? true : false}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton 
                  tooltip={item.title}

                  >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        onClick={() => navigate(subItem.url)}
                        isActive={location.pathname == subItem.url ? true : false}
                        className=" cursor-pointer"
                      >
                        {subItem.icon && <subItem.icon />}
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
