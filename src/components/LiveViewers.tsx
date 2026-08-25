import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { heartbeatViewer, leaveViewer } from "@/lib/viewers.server";

const HEARTBEAT_INTERVAL_MS = 20_000;

function getVisitorId() {
  const key = "rl-visitor-id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export function LiveViewers({ unitNr }: { unitNr: number }) {
  const [othersCount, setOthersCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const visitorId = getVisitorId();

    async function beat() {
      try {
        const res = await heartbeatViewer({ data: { unitNr, visitorId } });
        if (!cancelled) setOthersCount(Math.max(0, res.count - 1));
      } catch {
        // still — kein Zähler ist besser als ein falscher
      }
    }

    beat();
    const interval = setInterval(beat, HEARTBEAT_INTERVAL_MS);

    function onLeave() {
      leaveViewer({ data: { unitNr, visitorId } }).catch(() => {});
    }
    window.addEventListener("beforeunload", onLeave);

    return () => {
      cancelled = true;
      clearInterval(interval);
      window.removeEventListener("beforeunload", onLeave);
      onLeave();
    };
  }, [unitNr]);

  if (othersCount < 1) return null;

  return (
    <div className="mt-4 inline-flex items-center gap-2 border border-brass/40 bg-brass/10 px-3 py-1.5 text-xs text-brass">
      <Eye className="size-3.5" strokeWidth={1.75} />
      {othersCount === 1
        ? "Gerade schaut sich noch jemand diese Wohnung an"
        : `Gerade schauen sich ${othersCount} weitere Personen diese Wohnung an`}
    </div>
  );
}
