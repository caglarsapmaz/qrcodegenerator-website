import type {
  CornerDotType,
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  Options,
} from "qr-code-styling";
import type { ErrorCorrection, QREyeStyle, QRPattern, QRSettings } from "../../types/qr";
import { QR_CANVAS_SIZE } from "../constants";

const PATTERN_MAP: Record<QRPattern, DotType> = {
  square: "square",
  rounded: "rounded",
  dots: "dots",
};

const EYE_MAP: Record<QREyeStyle, CornerSquareType> = {
  square: "square",
  rounded: "extra-rounded",
  circle: "dot",
};

const EYE_DOT_MAP: Record<QREyeStyle, CornerDotType> = {
  square: "square",
  rounded: "square",
  circle: "dot",
};

const ERROR_CORRECTION_MAP: Record<ErrorCorrection, ErrorCorrectionLevel> = {
  L: "L",
  M: "M",
  Q: "Q",
  H: "H",
};

/** Translate the app's settings into qr-code-styling options. */
export function buildQROptions(
  settings: QRSettings,
  payload: string,
  logo: string | null,
): Options {
  return {
    type: "svg",
    width: QR_CANVAS_SIZE,
    height: QR_CANVAS_SIZE,
    data: payload,
    margin: settings.margin,
    qrOptions: {
      errorCorrectionLevel: ERROR_CORRECTION_MAP[settings.errorCorrection],
    },
    image: logo ?? undefined,
    imageOptions: {
      imageSize: settings.logoSize / 100,
      margin: 6,
      hideBackgroundDots: true,
    },
    dotsOptions: {
      type: PATTERN_MAP[settings.pattern],
      color: settings.foreground,
      roundSize: true,
    },
    cornersSquareOptions: {
      type: EYE_MAP[settings.eyeStyle],
      color: settings.foreground,
    },
    cornersDotOptions: {
      type: EYE_DOT_MAP[settings.eyeStyle],
      color: settings.foreground,
    },
    backgroundOptions: {
      color: settings.background,
      round: 0,
    },
  };
}
