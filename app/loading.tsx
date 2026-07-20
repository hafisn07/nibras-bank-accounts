const shimmer = "linear-gradient(90deg,#E8ECE9 25%,#F3F6F4 37%,#E8ECE9 63%)";

function Skel({ w, h, r = 6, delay = 0 }: { w: number | string; h: number; r?: number; delay?: number }) {
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: r,
        background: shimmer,
        backgroundSize: "200% 100%",
        animation: `nbShimmer 1.4s linear ${delay}s infinite`,
      }}
    />
  );
}

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8 md:py-[34px]">
      <Skel w={140} h={22} r={7} />
      <div className="mt-[18px] grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {[0, 0.15].map((d, i) => (
          <div key={i} className="rounded-[14px] border border-[#EEF2EF] p-4">
            <Skel w={70} h={11} r={5} delay={d} />
            <div className="mt-3">
              <Skel w={120} h={20} r={6} delay={d + 0.05} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 overflow-hidden rounded-[14px] border border-[#EEF2EF]">
        {[0, 0.2].map((d, i) => (
          <div key={i} className={`flex items-center gap-3.5 p-[15px_18px] ${i > 0 ? "border-t border-line-soft" : ""}`}>
            <Skel w={40} h={40} r={11} delay={d} />
            <div className="flex-1">
              <Skel w={150} h={13} r={5} delay={d} />
              <div className="mt-2">
                <Skel w={90} h={10} r={5} delay={d + 0.1} />
              </div>
            </div>
            <Skel w={80} h={16} r={5} delay={d} />
          </div>
        ))}
      </div>
    </div>
  );
}
