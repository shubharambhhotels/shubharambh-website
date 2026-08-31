interface Props {
  id?: string;
  className?: string;
  children: React.ReactNode;
  bgColor?: string; // tailwind bg class, defaults to bg-ivory
}

export default function SectionWrapper({
  id,
  className = "",
  children,
  bgColor = "bg-ivory",
}: Props) {
  return (
    <section id={id} className={`${bgColor} py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {children}
      </div>
    </section>
  );
}
