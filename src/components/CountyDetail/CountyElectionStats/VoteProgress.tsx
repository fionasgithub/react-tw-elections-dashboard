interface VoteProgressProps {
  progress: number;
}

const VoteProgress = ({ progress }: VoteProgressProps) => {
  return (
    <div className="mt-3 flex items-center gap-3">
      <span className="text-sm text-muted-foreground">開票進度</span>
      <div className="progress-track flex-1">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <span className="text-sm font-bold tabular-nums text-foreground">
        {progress.toFixed(1)}%
      </span>
    </div>
  );
};

export default VoteProgress;
