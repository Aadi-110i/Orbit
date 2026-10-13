"use client";

import * as React from "react";
import Link from "next/link";

export type ComparisonPlan = {
  id: string;
  name: string;
  price: string;
  interval?: string;
  badge?: string;
  actionLabel: string;
  href?: string;
};

export type ComparisonFeature = {
  id: string;
  label: string;
  values: { [planId: string]: boolean | string | number };
};

export type ComparisonGroup = {
  id: string;
  label: string;
  features: ComparisonFeature[];
};

export type SpotlightComparisonTableProps = {
  plans: ComparisonPlan[];
  groups: ComparisonGroup[];
  selectedPlanId?: string;
  defaultSelectedPlanId?: string;
  onSelectedPlanChange?: (planId: string) => void;
  differencesOnly?: boolean;
  defaultDifferencesOnly?: boolean;
  onDifferencesOnlyChange?: (value: boolean) => void;
  onChoosePlan?: (plan: ComparisonPlan) => void;
  autoplay?: boolean;
  labels?: {
    caption?: string;
    features?: string;
    differences?: string;
    included?: string;
    notIncluded?: string;
    unavailable?: string;
    selectPlan?: string;
    pause?: string;
    play?: string;
    empty?: string;
    allShared?: string;
    hidden?: (count: number) => string;
  };
  className?: string;
};

function Mark({ included }: { included: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      style={{ width: "12px", height: "12px" }}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {included ? <path d="m4 8 2.5 2.5L12 5" /> : <path d="M5 8h6" />}
    </svg>
  );
}

function isShared(feature: ComparisonFeature, plans: ComparisonPlan[]) {
  return (
    plans.length > 1 &&
    plans.every((plan) => Object.is(feature.values[plan.id], feature.values[plans[0]!.id]))
  );
}

export function SpotlightComparisonTable({
  plans,
  groups,
  selectedPlanId,
  defaultSelectedPlanId,
  onSelectedPlanChange,
  differencesOnly,
  defaultDifferencesOnly = false,
  onDifferencesOnlyChange,
  onChoosePlan,
  autoplay = false,
  labels = {},
  className = "",
}: SpotlightComparisonTableProps) {
  const [localPlan, setLocalPlan] = React.useState(defaultSelectedPlanId ?? plans[1]?.id ?? plans[0]?.id ?? "");
  const [localDifferences, setLocalDifferences] = React.useState(defaultDifferencesOnly);
  const [reduced, setReduced] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const [compact, setCompact] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const root = React.useRef<HTMLDivElement | null>(null);
  const stage = React.useRef<HTMLDivElement | null>(null);

  const activeId = plans.some((plan) => plan.id === (selectedPlanId ?? localPlan))
    ? (selectedPlanId ?? localPlan)
    : (plans[0]?.id ?? "");
  const activeIndex = Math.max(0, plans.findIndex((plan) => plan.id === activeId));
  const onlyDifferences = differencesOnly ?? localDifferences;
  const headingId = React.useId();
  const tableId = React.useId();
  const featureCount = groups.reduce((sum, group) => sum + group.features.length, 0);
  const sharedCount = groups.reduce(
    (sum, group) => sum + group.features.filter((feature) => isShared(feature, plans)).length,
    0
  );
  const playing = autoplay && ready && !reduced && !paused && plans.length > 1;

  const selectPlan = React.useCallback(
    (id: string) => {
      if (selectedPlanId === undefined) setLocalPlan(id);
      onSelectedPlanChange?.(id);
    },
    [selectedPlanId, onSelectedPlanChange]
  );

  const filterRows = React.useCallback(
    (value: boolean) => {
      if (differencesOnly === undefined) setLocalDifferences(value);
      onDifferencesOnlyChange?.(value);
    },
    [differencesOnly, onDifferencesOnlyChange]
  );

  const actions = React.useRef({ selectPlan, filterRows });
  React.useEffect(() => {
    actions.current = { selectPlan, filterRows };
  });

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(media.matches);
      setReady(true);
    };
    update();
    media.addEventListener("change", update);
    const observer = new ResizeObserver(([entry]) => setCompact((entry?.contentRect.width ?? 640) < 600));
    if (root.current) observer.observe(root.current);
    return () => {
      media.removeEventListener("change", update);
      observer.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (!playing) return;
    let timers: number[] = [];
    const cycle = () => {
      actions.current.selectPlan(plans[0]!.id);
      actions.current.filterRows(false);
      const steps: [number, () => void][] = [
        [400, () => actions.current.selectPlan(plans[1]!.id)],
        [2000, () => actions.current.filterRows(true)],
        [3600, () => actions.current.selectPlan(plans[Math.min(2, plans.length - 1)]!.id)],
        [5200, () => actions.current.filterRows(false)],
        [6800, () => actions.current.selectPlan(plans[1]!.id)],
        [8800, cycle],
      ];
      timers = steps.map(([delay, action]) => window.setTimeout(action, delay));
    };
    cycle();
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [playing, plans]);

  const choose = (id: string) => {
    setPaused(true);
    selectPlan(id);
  };

  return (
    <div
      ref={root}
      className={className}
      style={{
        width: "100%",
        color: "#ededed",
        fontFamily: "'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          borderRadius: "16px",
          border: "1px solid #27272a",
          background: "#121215",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.4)",
          overflow: "hidden",
        }}
      >
        {/* Top Control Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderBottom: "1px solid #27272a",
            background: "#18181b",
          }}
        >
          <span id={headingId} style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>
            {labels.caption ?? "Compare plans"}
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {autoplay && (
              <button
                type="button"
                onClick={() => setPaused(!paused)}
                aria-label={playing ? "Pause preview" : "Play preview"}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#a1a1aa",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: "4px",
                }}
              >
                {playing ? (
                  <svg style={{ width: "14px", height: "14px" }} fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4 3h3v10H4zM9 3h3v10H9z" />
                  </svg>
                ) : (
                  <svg style={{ width: "14px", height: "14px" }} fill="currentColor" viewBox="0 0 16 16">
                    <path d="m5 3 8 5-8 5z" />
                  </svg>
                )}
              </button>
            )}

            <button
              type="button"
              role="switch"
              aria-checked={onlyDifferences}
              onClick={() => {
                setPaused(true);
                filterRows(!onlyDifferences);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                border: "none",
                fontSize: "12px",
                color: "#a1a1aa",
                cursor: "pointer",
              }}
            >
              <span>{labels.differences ?? "Show differences only"}</span>
              <span
                style={{
                  display: "inline-flex",
                  width: "34px",
                  height: "18px",
                  borderRadius: "99px",
                  background: onlyDifferences ? "#ffffff" : "#27272a",
                  padding: "2px",
                  transition: "background 0.2s",
                }}
              >
                <span
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    background: onlyDifferences ? "#111111" : "#71717a",
                    transform: onlyDifferences ? "translateX(16px)" : "translateX(0px)",
                    transition: "transform 0.2s",
                  }}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Stage Table */}
        <div ref={stage} style={{ position: "relative", overflowX: "auto" }}>
          {/* Spotlight Highlight Column */}
          <div
            aria-hidden="true"
            style={{
              pointerEvents: "none",
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "34%",
              width: `${66 / plans.length}%`,
              transform: `translateX(${activeIndex * 100}%)`,
              background: "rgba(255, 255, 255, 0.04)",
              borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
              borderRight: "1px solid rgba(255, 255, 255, 0.08)",
              transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div style={{ height: "2px", background: "#fff", width: "100%" }} />
          </div>

          <table id={tableId} style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: "34%" }} />
              {plans.map((p) => (
                <col key={p.id} style={{ width: `${66 / plans.length}%` }} />
              ))}
            </colgroup>

            {/* Table Header */}
            <thead>
              <tr style={{ borderBottom: "1px solid #27272a" }}>
                <th style={{ padding: "24px 20px", textAlign: "left", verticalAlign: "bottom" }}>
                  <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#71717a" }}>
                    THE ESSENTIALS
                  </span>
                  <div style={{ fontSize: "12px", color: "#a1a1aa", marginTop: "4px" }}>
                    {onlyDifferences ? featureCount - sharedCount : featureCount} / {featureCount}
                  </div>
                </th>

                {plans.map((plan) => {
                  const isSelected = plan.id === activeId;
                  return (
                    <th
                      key={plan.id}
                      onClick={() => choose(plan.id)}
                      style={{
                        padding: "24px 16px",
                        textAlign: "left",
                        verticalAlign: "top",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ height: "18px" }}>
                        {plan.badge && (
                          <span
                            style={{
                              fontSize: "9px",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              letterSpacing: "0.08em",
                              color: isSelected ? "#e1aa8b" : "#71717a",
                            }}
                          >
                            {plan.badge}
                          </span>
                        )}
                      </div>

                      <div style={{ fontSize: "15px", fontWeight: 600, color: "#fff", marginTop: "4px" }}>
                        {plan.name}
                      </div>

                      <div style={{ display: "flex", alignItems: "baseline", gap: "2px", margin: "6px 0 16px 0" }}>
                        <span style={{ fontSize: "28px", fontWeight: 600, letterSpacing: "-0.03em", color: "#fff" }}>
                          {plan.price}
                        </span>
                        <span style={{ fontSize: "12px", color: "#71717a" }}>{plan.interval}</span>
                      </div>

                      <Link
                        href={plan.href ?? "/signup"}
                        onClick={() => {
                          choose(plan.id);
                          onChoosePlan?.(plan);
                        }}
                        style={{
                          display: "inline-flex",
                          width: "100%",
                          height: "36px",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: 600,
                          textDecoration: "none",
                          background: isSelected ? "#ffffff" : "#1f1f23",
                          color: isSelected ? "#09090b" : "#ededed",
                          border: isSelected ? "none" : "1px solid #333338",
                          transition: "all 0.15s",
                        }}
                      >
                        {plan.actionLabel} &nearr;
                      </Link>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Table Body Groups */}
            {groups.map((group) => {
              const hiddenCount = group.features.filter((f) => isShared(f, plans)).length;
              const visibleFeatures = onlyDifferences
                ? group.features.filter((f) => !isShared(f, plans))
                : group.features;

              if (onlyDifferences && visibleFeatures.length === 0) return null;

              return (
                <tbody key={group.id}>
                  {/* Category Header Row */}
                  <tr>
                    <th
                      colSpan={plans.length + 1}
                      style={{
                        padding: "10px 20px",
                        textAlign: "left",
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#71717a",
                        background: "#18181b",
                        borderBottom: "1px solid #27272a",
                      }}
                    >
                      {group.label}
                      {onlyDifferences && hiddenCount > 0 && (
                        <span
                          style={{
                            marginLeft: "10px",
                            fontSize: "9px",
                            fontWeight: 500,
                            padding: "2px 8px",
                            borderRadius: "99px",
                            background: "#27272a",
                            color: "#a1a1aa",
                            textTransform: "none",
                          }}
                        >
                          {hiddenCount} shared hidden
                        </span>
                      )}
                    </th>
                  </tr>

                  {/* Feature Rows */}
                  {visibleFeatures.map((feature) => (
                    <tr
                      key={feature.id}
                      style={{
                        borderBottom: "1px solid rgba(39, 39, 42, 0.6)",
                      }}
                    >
                      <th
                        scope="row"
                        style={{
                          padding: "12px 20px",
                          textAlign: "left",
                          fontSize: "13px",
                          fontWeight: 400,
                          color: "#d4d4d8",
                        }}
                      >
                        {feature.label}
                      </th>

                      {plans.map((plan) => {
                        const val = feature.values[plan.id];
                        const isSelected = plan.id === activeId;

                        return (
                          <td
                            key={plan.id}
                            onClick={() => choose(plan.id)}
                            style={{
                              padding: "12px 16px",
                              textAlign: "center",
                              fontSize: "13px",
                              color: isSelected ? "#ffffff" : "#a1a1aa",
                              fontWeight: isSelected ? 600 : 400,
                              cursor: "pointer",
                            }}
                          >
                            {typeof val === "boolean" ? (
                              <div
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "22px",
                                  height: "22px",
                                  borderRadius: "50%",
                                  background: val
                                    ? isSelected
                                      ? "#ffffff"
                                      : "#27272a"
                                    : "transparent",
                                  color: val
                                    ? isSelected
                                      ? "#111"
                                      : "#a1a1aa"
                                    : "#52525b",
                                }}
                              >
                                <Mark included={val} />
                              </div>
                            ) : (
                              <span>{val ?? "—"}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}
