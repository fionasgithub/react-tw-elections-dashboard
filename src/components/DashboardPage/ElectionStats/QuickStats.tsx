interface QuickStatsProps {
  stats: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    color: string;
  }[];
}

const QuickStats = ({ stats }: QuickStatsProps) => {
  return (
    <div className="bento-cell">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        開票概況
      </h3>

      <div className="space-y-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-3">
            <div className={`rounded-lg bg-muted/50 p-2 ${stat.color}`}>
              <stat.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold tabular-nums text-foreground">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStats;
