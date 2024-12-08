export const LoadingDots = () => {
  return (
    <div className="flex space-x-1 h-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-loading-dots"
          style={{ animationDelay: `${i * 0.16}s` }}
        />
      ))}
    </div>
  );
};