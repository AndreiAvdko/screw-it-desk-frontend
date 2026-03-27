export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="p-8">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      <p className="mt-2 max-w-lg text-sm text-muted-foreground">
        Раздел в разработке. Здесь позже появится содержимое.
      </p>
    </div>
  )
}
