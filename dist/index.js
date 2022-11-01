import { memo as C, useRef as u, useState as b, createElement as g, Children as w, useEffect as A } from "react";
import d from "gsap";
import { jsx as l, jsxs as S, Fragment as f } from "react/jsx-runtime";
import { createContext as k, useContextSelector as m } from "use-context-selector";
const v = (t) => t.split("").map((n) => /* @__PURE__ */ l("div", {
  className: "char",
  style: {
    position: "relative",
    display: "inline-block",
    whiteSpace: "break-spaces"
  },
  children: n
})), E = (t, n = "WORD") => t.split(/\s+/).map((r, a) => {
  if (r === "")
    return " ";
  let s = null;
  return n === "CHAR" && (s = v(r)), /* @__PURE__ */ S(f, {
    children: [a !== 0 ? " " : null, /* @__PURE__ */ l("div", {
      className: "word",
      style: {
        position: "relative",
        display: "inline-block",
        whiteSpace: "break-spaces"
      },
      children: n === "CHAR" ? s : r
    })]
  });
}), c = k(null), P = C(({
  as: t = "span",
  by: n = "WORD",
  animate: i = !1,
  children: o
}) => {
  const r = u(o), [a, s] = b(!1), h = m(c, (e) => Boolean(e == null ? void 0 : e.hasAnimationEnded)), p = m(c, (e) => e == null ? void 0 : e.by) || n, y = () => {
    s(!0);
  }, {
    ref: x
  } = R({
    enabled: i,
    targets: p === "WORD" ? ".word" : ".char",
    onComplete: y
  });
  return g(t, {
    ref: x
  }, /* @__PURE__ */ l(c.Provider, {
    value: {
      hasAnimationEnded: a,
      setHasAnimationEnded: s,
      by: n
    },
    children: h || a ? r.current : w.map(o, (e) => typeof e == "string" ? E(e, p) : /* @__PURE__ */ l(f, {
      children: e
    }))
  }));
}), R = ({
  enabled: t,
  targets: n,
  onComplete: i
}) => {
  const o = u(null);
  return A(() => {
    let r = null;
    return t && (r = d.context(() => {
      d.from(n, {
        duration: 0.8,
        yPercent: 70,
        skewY: 8,
        opacity: 0,
        ease: "back",
        stagger: 0.03,
        onComplete: i
      });
    }, o)), () => {
      r && r.revert();
    };
  }, [t, n]), {
    ref: o
  };
};
export {
  P as SplitText,
  R as useStaggerAnimation
};
