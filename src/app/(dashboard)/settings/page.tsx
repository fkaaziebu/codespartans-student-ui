"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useChangeStudentPassword,
  useChangePin,
  useRequestStudentAccountDeletion,
} from "@/common/hooks/mutations";
import { DeleteAccountModal } from "@/components/modals";
import { AccountStatus } from "@/graphql/generated/graphql";

type PasswordField = "currentPassword" | "newPassword" | "confirmPassword";
type PinField = "currentPin" | "newPin" | "confirmPin";

export default function SettingsPage() {
  const router = useRouter();
  const { changeStudentPassword, loading } = useChangeStudentPassword();
  const { changePin, loading: pinLoading } = useChangePin();
  const { requestStudentAccountDeletion, loading: deleteLoading } =
    useRequestStudentAccountDeletion();

  const [isChild, setIsChild] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletionScheduledFor, setDeletionScheduledFor] = useState<
    string | undefined
  >();
  const [deleteBanner, setDeleteBanner] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    setIsChild(sessionStorage.getItem("isChild") === "true");
  }, []);

  async function handleDeleteAccount() {
    setDeleteBanner(null);
    try {
      const result = await requestStudentAccountDeletion();
      setDeleteModalOpen(false);
      const data = result.data?.requestStudentAccountDeletion;

      if (
        data?.status === AccountStatus.PendingDeletion &&
        data.deletionScheduledFor
      ) {
        const alreadyPending = !data.message
          ?.toLowerCase()
          .includes("scheduled");
        if (alreadyPending) {
          const date = new Date(data.deletionScheduledFor).toLocaleDateString(
            "en-GB",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            },
          );
          setDeleteBanner({
            type: "error",
            message: `Your account deletion is already pending. It will be permanently deleted on ${date}.`,
          });

          sessionStorage.clear();
          router.replace("/signin?deleted=1");
          return;
        }
      }

      sessionStorage.clear();
      router.replace("/signin?deleted=1");
    } catch (err: unknown) {
      setDeleteModalOpen(false);
      const gqlErr = err as {
        graphQLErrors?: { extensions?: { code?: string }; message?: string }[];
      };
      const code = gqlErr?.graphQLErrors?.[0]?.extensions?.code;
      const msg =
        gqlErr?.graphQLErrors?.[0]?.message ??
        (err instanceof Error ? err.message : "Something went wrong.");
      if (code === "NOT_FOUND") {
        sessionStorage.clear();
        router.replace("/signin");
        return;
      }
      setDeleteBanner({ type: "error", message: msg });
    }
  }

  // ── Change Password ──────────────────────────────────────────────────
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState<Record<PasswordField, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState<Partial<Record<PasswordField, string>>>(
    {},
  );
  const [banner, setBanner] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  function validatePassword() {
    const next: Partial<Record<PasswordField, string>> = {};
    if (!form.currentPassword)
      next.currentPassword = "Current password is required.";
    if (!form.newPassword) next.newPassword = "New password is required.";
    else if (form.newPassword.length < 8)
      next.newPassword = "Must be at least 8 characters.";
    if (!form.confirmPassword)
      next.confirmPassword = "Please confirm your new password.";
    else if (form.newPassword !== form.confirmPassword)
      next.confirmPassword = "Passwords do not match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBanner(null);
    if (!validatePassword()) return;
    try {
      await changeStudentPassword({
        variables: {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
      });
      sessionStorage.clear();
      router.replace("/signin?reason=password_changed");
    } catch (err: unknown) {
      const gqlMsg = (err as { graphQLErrors?: { message?: string }[] })
        ?.graphQLErrors?.[0]?.message;
      if (gqlMsg?.toLowerCase().includes("current password is incorrect")) {
        setErrors((prev) => ({
          ...prev,
          currentPassword: "Current password is incorrect.",
        }));
        return;
      }
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setBanner({ type: "error", message: msg });
    }
  }

  function toggleShow(field: PasswordField) {
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  const passwordFields: {
    key: PasswordField;
    label: string;
    placeholder: string;
  }[] = [
    {
      key: "currentPassword",
      label: "Current Password",
      placeholder: "Enter your current password",
    },
    {
      key: "newPassword",
      label: "New Password",
      placeholder: "At least 8 characters",
    },
    {
      key: "confirmPassword",
      label: "Confirm New Password",
      placeholder: "Repeat your new password",
    },
  ];

  const strengthScore = (() => {
    const p = form.newPassword;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strengthScore];
  const strengthColor = [
    "",
    "var(--red)",
    "var(--amber)",
    "var(--amber)",
    "var(--green)",
  ][strengthScore];

  // ── Change PIN ───────────────────────────────────────────────────────
  const [pinForm, setPinForm] = useState({
    currentPin: "",
    newPin: "",
    confirmPin: "",
  });
  const [pinShow, setPinShow] = useState<Record<PinField, boolean>>({
    currentPin: false,
    newPin: false,
    confirmPin: false,
  });
  const [pinErrors, setPinErrors] = useState<Partial<Record<PinField, string>>>(
    {},
  );
  const [pinBanner, setPinBanner] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  function validatePin() {
    const next: Partial<Record<PinField, string>> = {};
    if (!pinForm.currentPin) next.currentPin = "Current PIN is required.";
    if (!pinForm.newPin) next.newPin = "New PIN is required.";
    if (!pinForm.confirmPin) next.confirmPin = "Please confirm your new PIN.";
    else if (pinForm.newPin !== pinForm.confirmPin)
      next.confirmPin = "PINs do not match.";
    setPinErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handlePinSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPinBanner(null);
    if (!validatePin()) return;
    try {
      await changePin({
        variables: { currentPin: pinForm.currentPin, newPin: pinForm.newPin },
      });
      sessionStorage.clear();
      router.replace("/child-login");
    } catch (err: unknown) {
      const gqlMsg = (err as { graphQLErrors?: { message?: string }[] })
        ?.graphQLErrors?.[0]?.message;
      if (gqlMsg?.toLowerCase().includes("current pin is incorrect")) {
        setPinErrors((prev) => ({
          ...prev,
          currentPin: "Current PIN is incorrect.",
        }));
        return;
      }
      const msg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      setPinBanner({ type: "error", message: msg });
    }
  }

  function togglePinShow(field: PinField) {
    setPinShow((prev) => ({ ...prev, [field]: !prev[field] }));
  }

  const pinFields: { key: PinField; label: string; placeholder: string }[] = [
    {
      key: "currentPin",
      label: "Current PIN",
      placeholder: "Enter your current PIN",
    },
    { key: "newPin", label: "New PIN", placeholder: "Enter your new PIN" },
    {
      key: "confirmPin",
      label: "Confirm New PIN",
      placeholder: "Repeat your new PIN",
    },
  ];

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="main-wrap">
      <div className="mobile-topbar">
        <span
          style={{ cursor: "pointer", color: "var(--t3)" }}
          onClick={() => router.push("/dashboard")}
        >
          ←
        </span>
        <span
          style={{ fontFamily: "var(--serif)", fontSize: 16, fontWeight: 700 }}
        >
          Settings
        </span>
        <span />
      </div>

      <div className="top-bar">
        <div className="breadcrumb">
          <span
            className="bc-link"
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </span>
          <span className="bc-sep">›</span>
          <span className="bc-current">Settings</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: 28, overflowY: "auto" }}>
        <div className="page-title" style={{ marginBottom: 24 }}>
          ⚙️ Settings
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: 20,
            maxWidth: 900,
            marginInline: "auto",
            justifyItems: "center",
          }}
        >
          {/* Change PASSWORD/PIN card — child accounts only */}
          {isChild ? (
            <div
              className="card card-p"
              style={{ gridColumn: "1 / -1", maxWidth: 520, width: "100%" }}
            >
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "var(--r)",
                      background: "var(--purple-lt, #f5f3ff)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    }}
                  >
                    🔑
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: "var(--t1)",
                      }}
                    >
                      Change PIN
                    </div>
                    <div className="text-sm text-muted">
                      Update the PIN you use to log in
                    </div>
                  </div>
                </div>
              </div>

              {pinBanner && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "var(--r)",
                    marginBottom: 16,
                    fontSize: 13,
                    fontWeight: 500,
                    background:
                      pinBanner.type === "success"
                        ? "var(--green-lt, #f0fdf4)"
                        : "#fef2f2",
                    color:
                      pinBanner.type === "success"
                        ? "var(--green, #16a34a)"
                        : "var(--red)",
                    border: `1px solid ${pinBanner.type === "success" ? "var(--green, #16a34a)" : "var(--red)"}`,
                  }}
                >
                  {pinBanner.type === "success" ? "✓ " : "✗ "}
                  {pinBanner.message}
                </div>
              )}

              <form
                onSubmit={handlePinSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {pinFields.map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--t2)",
                        marginBottom: 6,
                      }}
                    >
                      {label}
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={pinShow[key] ? "text" : "password"}
                        className="fs"
                        placeholder={placeholder}
                        value={pinForm[key]}
                        onChange={(e) => {
                          setPinForm((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }));
                          if (pinErrors[key])
                            setPinErrors((prev) => ({
                              ...prev,
                              [key]: undefined,
                            }));
                        }}
                        style={{
                          width: "100%",
                          paddingRight: 40,
                          borderColor: pinErrors[key]
                            ? "var(--red)"
                            : undefined,
                        }}
                        inputMode="numeric"
                      />
                      <button
                        type="button"
                        onClick={() => togglePinShow(key)}
                        style={{
                          position: "absolute",
                          right: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 15,
                          color: "var(--t3)",
                          padding: 0,
                          lineHeight: 1,
                        }}
                        tabIndex={-1}
                      >
                        {pinShow[key] ? "🙈" : "👁"}
                      </button>
                    </div>
                    {pinErrors[key] && (
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--red)",
                          marginTop: 4,
                        }}
                      >
                        {pinErrors[key]}
                      </div>
                    )}
                  </div>
                ))}

                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={pinLoading}
                    style={{ minWidth: 140 }}
                  >
                    {pinLoading ? "Saving…" : "Update PIN"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setPinForm({
                        currentPin: "",
                        newPin: "",
                        confirmPin: "",
                      });
                      setPinErrors({});
                      setPinBanner(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div
              className="card card-p"
              style={{ gridColumn: "1 / -1", maxWidth: 520, width: "100%" }}
            >
              <div style={{ marginBottom: 20 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "var(--r)",
                      background: "var(--indigo-lt, #eef2ff)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                    }}
                  >
                    🔒
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 15,
                        color: "var(--t1)",
                      }}
                    >
                      Change Password
                    </div>
                    <div className="text-sm text-muted">
                      Keep your account secure with a strong password
                    </div>
                  </div>
                </div>
              </div>

              {banner && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "var(--r)",
                    marginBottom: 16,
                    fontSize: 13,
                    fontWeight: 500,
                    background:
                      banner.type === "success"
                        ? "var(--green-lt, #f0fdf4)"
                        : "#fef2f2",
                    color:
                      banner.type === "success"
                        ? "var(--green, #16a34a)"
                        : "var(--red)",
                    border: `1px solid ${banner.type === "success" ? "var(--green, #16a34a)" : "var(--red)"}`,
                  }}
                >
                  {banner.type === "success" ? "✓ " : "✗ "}
                  {banner.message}
                </div>
              )}

              <form
                onSubmit={handlePasswordSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {passwordFields.map(({ key, label, placeholder }) => (
                  <div key={key}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--t2)",
                        marginBottom: 6,
                      }}
                    >
                      {label}
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type={show[key] ? "text" : "password"}
                        className="fs"
                        placeholder={placeholder}
                        value={form[key]}
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }));
                          if (errors[key])
                            setErrors((prev) => ({
                              ...prev,
                              [key]: undefined,
                            }));
                        }}
                        style={{
                          width: "100%",
                          paddingRight: 40,
                          borderColor: errors[key] ? "var(--red)" : undefined,
                        }}
                        autoComplete={
                          key === "currentPassword"
                            ? "current-password"
                            : "new-password"
                        }
                      />
                      <button
                        type="button"
                        onClick={() => toggleShow(key)}
                        style={{
                          position: "absolute",
                          right: 12,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 15,
                          color: "var(--t3)",
                          padding: 0,
                          lineHeight: 1,
                        }}
                        tabIndex={-1}
                      >
                        {show[key] ? "🙈" : "👁"}
                      </button>
                    </div>
                    {errors[key] && (
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--red)",
                          marginTop: 4,
                        }}
                      >
                        {errors[key]}
                      </div>
                    )}
                    {key === "newPassword" && form.newPassword && (
                      <div style={{ marginTop: 8 }}>
                        <div
                          style={{ display: "flex", gap: 4, marginBottom: 4 }}
                        >
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              style={{
                                flex: 1,
                                height: 4,
                                borderRadius: 2,
                                background:
                                  i <= strengthScore
                                    ? strengthColor
                                    : "var(--border)",
                                transition: "background 0.2s",
                              }}
                            />
                          ))}
                        </div>
                        {strengthLabel && (
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: strengthColor,
                            }}
                          >
                            {strengthLabel}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    disabled={loading}
                    style={{ minWidth: 140 }}
                  >
                    {loading ? "Saving…" : "Update Password"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setForm({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                      setErrors({});
                      setBanner(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tips card */}
          <div
            className="card card-p"
            style={{ gridColumn: "1 / -1", maxWidth: 520, width: "100%" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "var(--r)",
                  background: "var(--amber-lt, #fffbeb)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                💡
              </div>
              <div
                style={{ fontWeight: 700, fontSize: 15, color: "var(--t1)" }}
              >
                Password Tips
              </div>
            </div>
            <ul
              style={{
                margin: 0,
                paddingLeft: 18,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                fontSize: 13,
                color: "var(--t2)",
              }}
            >
              <li>Use at least 8 characters</li>
              <li>Mix uppercase and lowercase letters</li>
              <li>Include numbers and special characters (!@#$…)</li>
              <li>Avoid using your name or common words</li>
            </ul>
          </div>

          {/* Danger Zone card — hidden for child accounts */}
          {!isChild && (
            <div
              className="card card-p"
              style={{
                gridColumn: "1 / -1",
                maxWidth: 520,
                width: "100%",
                borderColor: "var(--red, #ef4444)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "var(--r)",
                    background: "#fef2f2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}
                >
                  ⚠️
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      color: "var(--red, #ef4444)",
                    }}
                  >
                    Danger Zone
                  </div>
                  <div className="text-sm text-muted">
                    Irreversible account actions
                  </div>
                </div>
              </div>

              {deleteBanner && (
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "var(--r)",
                    marginBottom: 16,
                    fontSize: 13,
                    fontWeight: 500,
                    background: "#fef2f2",
                    color: "var(--red)",
                    border: "1px solid var(--red)",
                  }}
                >
                  ✗ {deleteBanner.message}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "14px 16px",
                  borderRadius: "var(--r)",
                  border: "1px solid var(--border)",
                  background: "var(--surface, #fafafa)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: 13,
                      color: "var(--t1)",
                    }}
                  >
                    Delete My Account
                  </div>
                  <div
                    style={{ fontSize: 12, color: "var(--t3)", marginTop: 2 }}
                  >
                    Schedules permanent deletion after a 90-day grace period
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm"
                  style={{
                    background: "none",
                    border: "1px solid var(--red, #ef4444)",
                    color: "var(--red, #ef4444)",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                  onClick={() => {
                    setDeleteBanner(null);
                    setDeleteModalOpen(true);
                  }}
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <DeleteAccountModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteAccount}
        loading={deleteLoading}
        deletionScheduledFor={deletionScheduledFor}
      />
    </div>
  );
}
