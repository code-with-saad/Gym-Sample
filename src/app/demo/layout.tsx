export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Demo routes render their own nav and footer per-lead.
  // This layout is intentionally minimal — no shared nav/footer.
  return <>{children}</>;
}
