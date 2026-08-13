"use client";

import type { ErrorCorrection, QREyeStyle, QRPattern, QRSettings } from "@/types/qr";
import { ERROR_CORRECTION_OPTIONS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/store";
import { ColorField, RadioGroup, SegmentedControl, Slider } from "@/components/ui/Input";
import { SectionLabel } from "@/components/ui/Card";
import { LogoUploader } from "@/components/LogoUploader";

export function CustomizationPanel({
  settings,
  onChange,
  logo,
  onLogoChange,
}: {
  settings: QRSettings;
  onChange: (patch: Partial<QRSettings>) => void;
  logo: string | null;
  onLogoChange: (dataUrl: string | null) => void;
}) {
  const t = useI18n();

  const patternOptions: Array<{ value: QRPattern; label: string }> = [
    { value: "square", label: t.custSquare },
    { value: "rounded", label: t.custRounded },
    { value: "dots", label: t.custDots },
  ];

  const eyeOptions: Array<{ value: QREyeStyle; label: string }> = [
    { value: "square", label: t.custSquare },
    { value: "rounded", label: t.custRounded },
    { value: "circle", label: t.custCircle },
  ];

  const EC_LABEL_KEYS: Record<
    ErrorCorrection,
    "custEcLow" | "custEcMedium" | "custEcQuartile" | "custEcHigh"
  > = {
    L: "custEcLow",
    M: "custEcMedium",
    Q: "custEcQuartile",
    H: "custEcHigh",
  };

  const errorCorrectionOptions = ERROR_CORRECTION_OPTIONS.map((option) => ({
    value: option.value,
    label: t[EC_LABEL_KEYS[option.value]],
    hint: option.percent,
  }));

  return (
    <div className="space-y-7">
      <section aria-labelledby="style-heading" className="space-y-4">
        <SectionLabel>{t.custQrStyle}</SectionLabel>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ColorField
            label={t.custForeground}
            value={settings.foreground}
            onChange={(foreground) => onChange({ foreground })}
          />
          <ColorField
            label={t.custBackground}
            value={settings.background}
            onChange={(background) => onChange({ background })}
          />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-medium text-fg-secondary">{t.custPattern}</span>
          <SegmentedControl
            label={t.custPattern}
            options={patternOptions}
            value={settings.pattern}
            onChange={(pattern) => onChange({ pattern })}
          />
        </div>
        <div className="space-y-1.5">
          <span className="text-xs font-medium text-fg-secondary">{t.custEyeStyle}</span>
          <SegmentedControl
            label={t.custEyeStyle}
            options={eyeOptions}
            value={settings.eyeStyle}
            onChange={(eyeStyle) => onChange({ eyeStyle })}
          />
        </div>
      </section>

      <section aria-labelledby="logo-heading" className="space-y-4">
        <SectionLabel>{t.custLogo}</SectionLabel>
        <LogoUploader
          logo={logo}
          logoSize={settings.logoSize}
          onLogoChange={onLogoChange}
          onLogoSizeChange={(logoSize) => onChange({ logoSize })}
        />
      </section>

      <section aria-labelledby="quiet-zone-heading" className="space-y-4">
        <SectionLabel>{t.custQuietZone}</SectionLabel>
        <Slider
          label={t.custMargin}
          value={settings.margin}
          min={0}
          max={64}
          onChange={(margin) => onChange({ margin })}
          format={(value) => `${value}px`}
          hint={t.custQuietZoneHint}
        />
      </section>

      <section aria-labelledby="error-correction-heading" className="space-y-3">
        <SectionLabel>{t.custErrorCorrection}</SectionLabel>
        <RadioGroup
          label={t.custErrorCorrection}
          options={errorCorrectionOptions}
          value={settings.errorCorrection}
          onChange={(errorCorrection) => onChange({ errorCorrection })}
        />
        <p className="text-xs text-fg-muted">{t.custEcNote}</p>
      </section>
    </div>
  );
}
