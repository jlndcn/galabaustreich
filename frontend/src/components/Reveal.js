import { useReveal } from "@/hooks/useReveal";

// Wrapper that fades/slides content in on scroll (respects reduced motion via the hook).
export const Reveal = ({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  ...rest
}) => {
  const { ref, visible } = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};
