"use client";

import { useEffect, useRef, useState } from "react";
import {
  useListSubscriptionPlans,
  useGetStudentSubscription,
  useListStudentSubscriptions,
} from "@/common/hooks/queries";
import { useInitiatePayment } from "@/common/hooks/mutations";
import type { SubscriptionPlan } from "@/common/hooks/queries/use-list-subscription-plans";
import { SubscriptionStatus } from "@/common/graphql/generated/graphql";

function numMonths(durationDays: number) {
  if (durationDays <= 31) return 1;
  if (durationDays <= 62) return 2;
  if (durationDays <= 93) return 3;
  return 12;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BillingPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showToast(msg: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(msg);
    toastTimer.current = setTimeout(() => setToastMsg(null), 5000);
  }

  const { listSubscriptionPlans, data: allPlans, loading: plansLoading } =
    useListSubscriptionPlans();
  const { getStudentSubscription, data: subscription, loading: subLoading } =
    useGetStudentSubscription();
  const { listStudentSubscriptions, data: subscriptionHistory, loading: historyLoading } =
    useListStudentSubscriptions();
  const { initiatePayment, loading: paymentLoading } = useInitiatePayment();

  useEffect(() => {
    listSubscriptionPlans();
    getStudentSubscription();
    listStudentSubscriptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const plans = allPlans.filter((p) => p.plan_key.startsWith("student_"));
  const selectedPlan = plans.find((p) => p.id === selectedPlanId) ?? null;

  const hasActiveSub =
    !!subscription && subscription.status === SubscriptionStatus.Active;

  const canSubscribe = !!selectedPlanId && !isSubmitting && !paymentLoading;

  function getPriceDisplay(plan: SubscriptionPlan) {
    const months = numMonths(plan.duration_days);
    return {
      perMonth: Math.round(plan.price / months),
      total: Math.round(plan.price),
    };
  }

  function getPriceSummary() {
    if (!selectedPlan) return null;
    const months = numMonths(selectedPlan.duration_days);
    return `${months} month${months > 1 ? "s" : ""} · ${selectedPlan.name} → ${selectedPlan.currency} ${selectedPlan.price}`;
  }

  async function handleSubscribe() {
    if (!selectedPlanId) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      const result = await initiatePayment({
        variables: { planId: selectedPlanId, children: [] },
      });
      const firstError = result.errors?.[0]?.message;
      if (firstError) {
        setErrorMsg(firstError);
        showToast(firstError);
        return;
      }
      const url = result.data?.initiatePayment.authorization_url;
      if (url) window.location.href = url;
    } catch (err) {
      const msg = (err as Error)?.message ?? "Failed to initiate payment. Please try again.";
      setErrorMsg(msg);
      showToast(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="main-wrap">
      <div className="top-bar">
        <div className="top-bar-left">
          <div className="page-title" id="page-title">
            Billing
          </div>
        </div>
        <div className="top-bar-right">
          <button className="notif-btn">
            <svg
              width={16}
              height={16}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <div className="notif-dot" id="notif-dot" style={{ display: "none" }} />
          </button>
        </div>
      </div>

      <div className="content">
        <div className="view active" id="view-billing">
          {/* Heading row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 28,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <div className="section-heading">Billing &amp; Subscription</div>
              <div className="section-subheading" style={{ marginBottom: 0 }}>
                Manage your plan and view payment history.
              </div>
            </div>
            <div className="billing-status-pill">
              <span
                className="billing-status-dot"
                style={{ background: hasActiveSub ? undefined : "var(--gray300)" }}
              />
              <span>
                {subLoading
                  ? "Loading…"
                  : hasActiveSub
                  ? `${subscription!.plan.name} · Active`
                  : "No active plan"}
              </span>
            </div>
          </div>

          {/* Active subscription */}
          <div className="billing-section-label">Active subscription</div>
          <div id="billing-active-subs" style={{ marginBottom: 32 }}>
            {subLoading ? (
              <div style={{ color: "var(--gray400)", fontSize: 13, padding: "8px 0" }}>
                Loading…
              </div>
            ) : hasActiveSub ? (
              <div className="billing-active-subs-grid">
                <div className="bsub-card">
                  <div
                    className="bsub-avatar"
                    style={{ background: "#EAF3DE", color: "#27500A" }}
                  >
                    ✓
                  </div>
                  <div>
                    <div className="bsub-name">{subscription!.plan.name}</div>
                    <div className="bsub-meta">Your plan</div>
                  </div>
                  <div className="bsub-right">
                    <div className="bsub-amount">
                      {subscription!.plan.currency} {subscription!.plan.price}
                    </div>
                    <div className="bsub-cycle">
                      per{" "}
                      {numMonths(subscription!.plan.duration_days) === 1
                        ? "month"
                        : `${numMonths(subscription!.plan.duration_days)} months`}
                    </div>
                    <div className="bsub-renew">
                      Renews {formatDate(subscription!.expires_at)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ color: "var(--gray400)", fontSize: 13, padding: "8px 0" }}>
                No active subscription. Subscribe below to unlock access.
              </div>
            )}
          </div>

          {/* Choose a plan */}
          <div className="billing-scope-block">
            <div className="billing-scope-heading">
              <span className="billing-scope-num">1</span>
              Choose a plan
            </div>
            <div className="billing-plans-grid" id="billing-plans-grid">
              {plansLoading
                ? null
                : plans.map((plan) => {
                    const { perMonth, total } = getPriceDisplay(plan);
                    const months = numMonths(plan.duration_days);
                    const isSelected = selectedPlanId === plan.id;
                    return (
                      <div
                        key={plan.id}
                        className={`billing-plan-card${isSelected ? " active" : ""}`}
                        onClick={() => setSelectedPlanId(isSelected ? null : plan.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {plan.billing_label && (
                          <div className="billing-plan-badge">{plan.billing_label}</div>
                        )}
                        <div className="billing-plan-duration">{plan.name}</div>
                        <div className="billing-plan-price">
                          {plan.currency} {perMonth}
                        </div>
                        <div className="billing-plan-per">per month</div>
                        <div className="billing-plan-total">
                          Total: {plan.currency} {total}
                        </div>
                        {months > 1 && plan.tagline && (
                          <div style={{ fontSize: 11, color: "var(--t600)", marginTop: 4 }}>
                            {plan.tagline}
                          </div>
                        )}
                        <div
                          className="billing-plan-radio"
                          style={{ background: isSelected ? "var(--g500)" : undefined }}
                        />
                      </div>
                    );
                  })}
            </div>
          </div>

          {/* CTA */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div className="billing-price-summary" id="billing-price-summary">
              {getPriceSummary()}
            </div>
            <button
              className="billing-cta-btn"
              id="billing-subscribe-btn"
              style={{
                opacity: canSubscribe ? 1 : 0.4,
                pointerEvents: canSubscribe ? "auto" : "none",
              }}
              onClick={handleSubscribe}
              disabled={!canSubscribe}
            >
              <svg
                width={15}
                height={15}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <rect x={1} y={4} width={22} height={16} rx={2} />
                <line x1={1} y1={10} x2={23} y2={10} />
              </svg>
              <span>
                {isSubmitting || paymentLoading ? "Redirecting…" : "Proceed to payment"}
              </span>
            </button>
          </div>
          {errorMsg && (
            <div style={{ marginTop: 12, color: "#c0392b", fontSize: 13 }}>
              {errorMsg}
            </div>
          )}

          {/* Payment history */}
          <div className="billing-section-label" style={{ marginTop: 40 }}>
            Payment history
          </div>
          <div className="billing-history-table">
            <div className="bht-header">
              <div>Date</div>
              <div>Description</div>
              <div>Duration</div>
              <div>Amount</div>
              <div>Status</div>
              <div />
            </div>
            <div id="billing-history-body">
              {historyLoading ? (
                <div style={{ padding: "16px 0", color: "var(--gray400)", fontSize: 13 }}>
                  Loading…
                </div>
              ) : subscriptionHistory.length > 0 ? (
                subscriptionHistory.map((sub) => (
                  <div className="bht-row" key={sub.id}>
                    <div className="bht-date">{formatDate(sub.started_at)}</div>
                    <div className="bht-desc">{sub.plan.name}</div>
                    <div style={{ color: "var(--gray500)", fontSize: 12 }}>
                      {numMonths(sub.plan.duration_days) === 1
                        ? "1 month"
                        : `${numMonths(sub.plan.duration_days)} months`}
                    </div>
                    <div className="bht-amount">
                      {sub.plan.currency} {sub.plan.price}
                    </div>
                    <div>
                      <span
                        className={`bht-badge ${
                          sub.status === "ACTIVE" ? "bht-paid" : "bht-refunded"
                        }`}
                      >
                        {sub.status === "ACTIVE" ? "Paid" : "Expired"}
                      </span>
                    </div>
                    <div>
                      <button className="bht-dl-btn" title="Download receipt">
                        <svg
                          width={13}
                          height={13}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1={12} y1={15} x2={12} y2={3} />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ padding: "16px 0", color: "var(--gray400)", fontSize: 13 }}>
                  No payment history yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {toastMsg && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            right: 28,
            zIndex: 9999,
            background: "#FCEBEB",
            border: "1px solid #F09595",
            color: "#A32D2D",
            borderRadius: 10,
            padding: "14px 16px",
            fontSize: 13,
            maxWidth: 400,
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          }}
        >
          <svg
            width={16}
            height={16}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
            style={{ flexShrink: 0, marginTop: 1 }}
          >
            <circle cx={12} cy={12} r={10} />
            <line x1={12} y1={8} x2={12} y2={12} />
            <line x1={12} y1={16} x2={12} y2={16} />
          </svg>
          <span style={{ flex: 1, lineHeight: 1.5 }}>{toastMsg}</span>
          <button
            onClick={() => setToastMsg(null)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#A32D2D",
              fontSize: 16,
              lineHeight: 1,
              padding: 0,
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
