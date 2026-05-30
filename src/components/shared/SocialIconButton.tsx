import type { LucideIcon } from "lucide-react";

interface SocialIconButtonProps {
  icon: LucideIcon;
  href: string;
  size?: "sm" | "md";
}

export default function SocialIconButton({ icon: Icon, href, size = "md" }: SocialIconButtonProps) {
  const sizeClasses = size === "sm" ? "w-9 h-9" : "w-10 h-10";
  const iconSize = size === "sm" ? 16 : 18;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${sizeClasses} rounded-full bg-white border border-black/[0.06] flex items-center justify-center text-brand-gray hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-all duration-200`}
    >
      <Icon size={iconSize} />
    </a>
  );
}
