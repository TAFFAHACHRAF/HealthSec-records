import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface INavLink {
  icon?: LucideIcon;
  title: string;
  className?: string;
  desc?: string;
}

export const NavLink = ({ icon: Icon, title, className, desc }: INavLink) => {
  return (
    <div className={cn("flex items-center gap-x-4", className)}>
      {Icon && (
        <Icon className="h-6 w-6 lg:h-7 lg:w-7 text-primary flex-shrink-0" />
      )}
      <div className="flex flex-col">
        <h1 className="text-p3 lg:p2">{title}</h1>
        {desc && (
          <p className="text-xs lg:text-p3 text-accent-black/50">{desc}</p>
        )}
      </div>
    </div>
  );
};
