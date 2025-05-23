"use client";

import styled from "@emotion/styled";
const breakpoints = {
  sm: "@media (min-width: 300px) and (max-width: 430px)", // Mobile
  smm: "@media (min-width: 430px) and (max-width: 600px)", // Mobile
  md: "@media (min-width: 601px) and (max-width: 1024px)", // Tablet
  lg: "@media (min-width: 1025px)", // Desktop
};
const Head1 = styled.span((props) => ({
  position: props.position,
  color: props.color || "#005900",
  fontWeight: props.fontWeight || "bold",
  width: props.width,
  textAlign: props.textAlign || "center",
  paddingBottom: props.paddingBottom,
  height: props.height,

  // Default font size

  [breakpoints.lg]: {
    textAlign: props.textAlign?.lg || "center",
    fontSize: props.fontSize?.lg || "3rem",
  },

  // Breakpoint-specific font sizes
  [breakpoints.md]: {
    fontSize: props.fontSize?.md || "2rem",
    textAlign: props.textAlign?.md || "center",
  },
  [breakpoints.smm]: {
    fontSize: props.fontSize?.smm || "1.4rem",
    textAlign: props.textAlign?.smm || "center",
  },
  [breakpoints.sm]: {
    fontSize: props.fontSize?.sm || "1.5rem",
    textAlign: props.textAlign?.sm || "center",
    width: props.width?.sm,
    height: props.height?.sm,
  },
  // [breakpoints.xs]: {
  //   fontSize: props.fontSize?.xs || "0.4rem",
  // },
}));

const Head2 = styled.span((props) => ({
  color: props.color || "#005900",
  fontWeight: props.fontWeight || "bold",
  width: props.width,
  textAlign: props.textAlign || "center",

  // Default font size
  fontSize: props.fontSize?.lg || "5rem",

  // Breakpoint-specific font sizes
  [breakpoints.md]: {
    fontSize: props.fontSize?.md || "2.5rem",
  },
  [breakpoints.smm]: {
    fontSize: props.fontSize?.smm || "2rem",
  },
  [breakpoints.sm]: {
    fontSize: props.fontSize?.sm || "1.5rem",
  },
}));

const Head3 = styled.span((props) => ({
  color: props.color || "#005900",
  fontWeight: props.fontWeight || "bold",
  textAlign: props.textAlign || "center",
  width: props.width,
  fontSize: props.fontSize?.lg || "1.8rem",
  margin: props.margin || "0",

  // Breakpoint-specific font sizes
  [breakpoints.md]: {
    fontSize: props.fontSize?.md || "1.5rem",
    width: props.width?.md,
  },
  [breakpoints.smm]: {
    fontSize: props.fontSize?.smm || "1.2rem",
    width: props.width?.smm,
  },
  [breakpoints.sm]: {
    fontSize: props.fontSize?.sm || "0.9rem",
    width: props.width?.sm,
  },
}));

const Head4 = styled.span((props) => ({
  color: props.color || "#005900",
  fontWeight: props.fontWeight || "bold",
  textAlign: props.textAlign || "center",
  width: props.width,
  height: props.height,

  // Default font size
  fontSize: props.fontSize?.lg || "1.3rem",
  textAlign: props.textAlign?.lg,
  fontWeight: props.fontWeight?.lg,
  height: props.height?.lg,

  // Breakpoint-specific font sizes
  [breakpoints.md]: {
    fontSize: props.fontSize?.md || "1rem",
    textAlign: props.textAlign?.md,
    fontWeight: props.fontWeight?.md,
    height: props.height?.md,
  },
  [breakpoints.smm]: {
    fontSize: props.fontSize?.smm || "1rem",
    textAlign: props.textAlign?.smm,
    fontWeight: props.fontWeight?.smm,
    height: props.height?.smm,
  },
  [breakpoints.sm]: {
    fontSize: props.fontSize?.sm || "1rem",
    textAlign: props.textAlign?.sm,
    fontWeight: props.fontWeight?.sm,
    height: props.height?.sm
  },
}));

export { Head1, Head2, Head3, Head4 };
