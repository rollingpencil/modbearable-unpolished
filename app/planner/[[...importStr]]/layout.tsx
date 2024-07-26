export default function PlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 h-full">
      {children}
    </section>
  );
}
