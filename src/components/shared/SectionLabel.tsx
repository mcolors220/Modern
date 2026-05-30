interface SectionLabelProps {
  text: string;
  className?: string;
  centered?: boolean;
}

export default function SectionLabel({ text, className = "", centered = false }: SectionLabelProps) {
  return (
    <p className={`section-label ${centered ? "text-center" : ""} ${className}`}>
      {text}
    </p>
  );
}
