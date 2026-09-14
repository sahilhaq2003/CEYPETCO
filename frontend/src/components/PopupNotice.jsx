import { useEffect, useRef, useState } from "react";
import api from "../api";

const VIEW_PREFIX = "ceypetco_popup_viewed_";

const getViewKey = (notice) => {
  const version = notice.updatedAt ? new Date(notice.updatedAt).getTime() : 0;
  return `${VIEW_PREFIX}${notice._id}_${version}`;
};

const hasViewed = (notice) => {
  try {
    const storage = notice.showOnce
      ? window.localStorage
      : window.sessionStorage;
    return Boolean(storage.getItem(getViewKey(notice)));
  } catch {
    return false;
  }
};

const markViewed = (notice) => {
  try {
    const storage = notice.showOnce
      ? window.localStorage
      : window.sessionStorage;
    storage.setItem(getViewKey(notice), "1");
  } catch {
    // Storage unavailable (e.g. private mode) — never block the popup.
  }
};

const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const PopupNotice = ({ notice: forcedNotice, preview = false }) => {
  const [display, setDisplay] = useState(null);
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(false);
  const [closing, setClosing] = useState(false);
  const displayRef = useRef(null);

  const close = () => {
    if (displayRef.current && !preview) markViewed(displayRef.current);
    if (!visible) return;
    setClosing(true);
    window.setTimeout(() => {
      setVisible(false);
      setClosing(false);
      setShown(false);
    }, 320);
  };

  useEffect(() => {
    let cancelled = false;
    let delayTimer;

    const maybeShow = (data) => {
      if (cancelled || !data) return;
      if (!preview && hasViewed(data)) return;
      displayRef.current = data;
      setDisplay(data);
      delayTimer = window.setTimeout(
        () => {
          if (cancelled) return;
          setVisible(true);
        },
        preview ? 150 : 450
      );
    };

    if (forcedNotice) {
      maybeShow(forcedNotice);
    } else {
      api
        .get("/admin/popup-notices/active")
        .then((res) => {
          if (cancelled) return;
          maybeShow(res.data && res.data.data ? res.data.data : null);
        })
        .catch(() => {
          // Fail silently — never disrupt the public site on API errors.
        });
    }

    return () => {
      cancelled = true;
      window.clearTimeout(delayTimer);
    };
  }, [forcedNotice, preview]);

  useEffect(() => {
    if (!visible) {
      setShown(false);
      return undefined;
    }
    const raf = window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => setShown(true))
    );
    return () => window.cancelAnimationFrame(raf);
  }, [visible]);

  useEffect(() => {
    if (!visible) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, close]);

  const handleAction = () => {
    const notice = displayRef.current;
    if (notice && !preview) {
      const link = notice.buttonLink;
      if (notice.buttonEnabled && link) {
        if (notice.linkType === "external") {
          window.open(link, "_blank", "noopener,noreferrer");
        } else if (link.startsWith("/") && !link.startsWith("//")) {
          window.history.pushState({}, "", link);
          window.dispatchEvent(new PopStateEvent("popstate"));
        }
      }
    }
    close();
  };

  if (!visible || !display) return null;

  const wrapperClass = [
    "popup-overlay",
    shown ? "is-open" : "",
    closing ? "is-closing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={wrapperClass}
      onClick={close}
      role="presentation"
      aria-hidden={closing}
    >
      <div
        className="popup-card"
        role="dialog"
        aria-modal="true"
        aria-label={display.title || "Announcement"}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="popup-close"
          onClick={close}
          aria-label="Close announcement"
        >
          <CloseIcon />
        </button>
        {display.imageUrl && (
          <div className="popup-visual">
            <img src={display.imageUrl} alt="" loading="lazy" />
          </div>
        )}
        <div className="popup-body">
          {display.title && <h2 className="popup-title">{display.title}</h2>}
          {display.description && (
            <p className="popup-desc">{display.description}</p>
          )}
          {display.buttonEnabled && display.buttonText && (
            <button type="button" className="popup-action" onClick={handleAction}>
              {display.buttonText}
              <ArrowIcon />
            </button>
          )}
          <p className="popup-brand">
            <b>CEYPETCO</b>
            <span> · Official announcement</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PopupNotice;