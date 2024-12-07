import { Lock, Warning } from "@mui/icons-material";

export function RizzScore({ score, empty }: { score: number; empty: boolean }) {
  return (
    <div className="flex flex-col gap-2 items-center justify-center w-full">
      <div className="relative w-[200px] h-[180px]">
        <div className="absolute left-0 right-0">
          <Ring color="primary" percentage={score / 100} />
        </div>
        <div className="flex items-center justify-center absolute left-0 right-0 bottom-0 top-10">
          <div
            className={`text-8xl font-bold text-white ${
              empty ? "opacity-50" : ""
            }`}
          >
            {empty ? (
              <div className="w-[100px] h-[100px]">
                <Lock className="w-full h-full" />
              </div>
            ) : (
              score
            )}
          </div>
        </div>
      </div>
      <div className="rounded-full p-2 text-primary text-lg">
        Your Rizz This Week
      </div>
      {empty && (
        <div className="bg-error-base rounded-md px-2 py-1 text-error-base-content">
          <span>
            <Warning /> Unlock score: go on at least 2 dates
          </span>
        </div>
      )}
    </div>
  );
}

export function Ring({
  percentage,
  color,
}: {
  percentage: number;
  color: string;
}) {
  const fullSweep = (Math.PI * 4) / 3;
  const percentageSweep = fullSweep * percentage;
  const start = Math.PI / 2 + (Math.PI / 6) * 2;
  const pathFull = arcPath(50, 50, 45, 45, start, fullSweep);
  const pathPercentage = arcPath(50, 50, 45, 45, start, percentageSweep);

  return (
    <div className={`text-${color} w-full h-full relative`}>
      <svg
        viewBox={`0 0 100 100`}
        className="stroke-primary absolute left-0 right-0 top-0 bottom-0"
      >
        <g>
          <path
            d={pathFull}
            stroke="currentColor"
            strokeWidth="8"
            opacity={0.2}
            style={{
              strokeLinecap: "round",
              fill: "none",
            }}
          />
        </g>
      </svg>
      <svg
        viewBox={`0 0 100 100`}
        className="absolute text-primary left-0 right-0 top-0 bottom-0 "
      >
        <g>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "yellow", stopOpacity: 1 }} />
            <stop
              offset="100%"
              style={{ stopColor: "currentcolor", stopOpacity: 1 }}
            />
          </linearGradient>
          <path
            d={pathPercentage}
            stroke="url(#grad1)"
            strokeWidth="8"
            style={{
              strokeLinecap: "round",
              fill: "none",
            }}
          />
        </g>
      </svg>
    </div>
  );
}

const arcPath = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  start_angle: number,
  sweep_angle: number,
) => {
  const cos = Math.cos;
  const sin = Math.sin;

  // @ts-ignore
  const f_matrix_times = ([[a, b], [c, d]], [x, y]) => [
    a * x + b * y,
    c * x + d * y,
  ];
  // @ts-ignore
  const f_rotate_matrix = (x) => [
    [cos(x), -sin(x)],
    [sin(x), cos(x)],
  ];
  // @ts-ignore
  const f_vec_add = ([a1, a2], [b1, b2]) => [a1 + b1, a2 + b2];
  // @ts-ignore

  sweep_angle = sweep_angle % (2 * Math.PI);
  const rotMatrix = f_rotate_matrix(0);
  const [sX, sY] = f_vec_add(
    // @ts-ignore
    f_matrix_times(rotMatrix, [rx * cos(start_angle), ry * sin(start_angle)]),
    [cx, cy],
  );
  const [eX, eY] = f_vec_add(
    // @ts-ignore
    f_matrix_times(rotMatrix, [
      rx * cos(start_angle + sweep_angle),
      ry * sin(start_angle + sweep_angle),
    ]),
    [cx, cy],
  );
  const fA = sweep_angle > Math.PI ? 1 : 0;
  const fS = sweep_angle > 0 ? 1 : 0;
  return (
    "M " +
    sX +
    " " +
    sY +
    " A " +
    [rx, ry, (90 / (2 * Math.PI)) * 360, fA, fS, eX, eY].join(" ")
  );
};
