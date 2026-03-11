import { MapPin } from "lucide-react";

type Props = {
  isRealTime: boolean;
};

export default function DashboardHeader({ isRealTime }: Props) {
  return (
    <header className="flex items-center gap-4 mb-6 shrink-0">
      <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/15">
        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
      </div>
      <h1 className="text-2xl font-bold text-foreground">
        2022 縣市長選舉開票地圖
      </h1>
      {isRealTime && (
        <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-2 sm:px-2.5 sm:py-1">
          <div className="live-dot"></div>
          <span className="hidden sm:inline text-xs">即時</span>
        </div>
      )}
      <a
        href="https://github.com/fionasgithub/react-tw-elections-dashboard"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto inline-flex items-center rounded-md p-2 hover:bg-surface/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-foreground"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.583 0-.288-.01-1.05-.016-2.06-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.746.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.76-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.469-2.38 1.235-3.22-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.004 2.045.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.803 5.624-5.473 5.92.43.372.813 1.102.813 2.222 0 1.604-.014 2.896-.014 3.289 0 .322.216.701.825.582C20.565 21.796 24 17.298 24 12c0-6.63-5.373-12-12-12z" />
        </svg>
        <span className="sr-only">GitHub</span>
      </a>
    </header>
  );
}
