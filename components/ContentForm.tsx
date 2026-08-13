"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { ContentState, ContentType, WifiSecurity } from "@/types/qr";
import { MAX_TEXT_LENGTH, WIFI_SECURITY_OPTIONS } from "@/lib/constants";
import { useI18n } from "@/lib/i18n/store";
import { Checkbox, Field, Input, Select, Textarea } from "@/components/ui/Input";

type FieldErrors = Partial<Record<keyof ContentState, string>>;

function PasswordInput({
  value,
  onChange,
  id,
  invalid,
}: {
  value: string;
  onChange: (value: string) => void;
  id: string;
  invalid?: boolean;
}) {
  const t = useI18n();
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={t.formPasswordPlaceholder}
        invalid={invalid}
        autoComplete="off"
        className="pr-11"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? t.formHidePassword : t.formShowPassword}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-fg-muted transition-colors hover:text-fg"
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

export function ContentForm({
  type,
  content,
  errors,
  onChange,
}: {
  type: ContentType;
  content: ContentState;
  errors: FieldErrors;
  onChange: (key: keyof ContentState, value: string | boolean) => void;
}) {
  const t = useI18n();

  switch (type) {
    case "url":
      return (
        <Field
          label={t.formUrlLabel}
          htmlFor="qr-url"
          error={errors.url}
          hint={t.formUrlHint}
        >
          <Input
            id="qr-url"
            type="url"
            inputMode="url"
            placeholder={t.formUrlPlaceholder}
            value={content.url}
            invalid={!!errors.url}
            onChange={(event) => onChange("url", event.target.value)}
          />
        </Field>
      );

    case "text":
      return (
        <Field
          label={t.formTextLabel}
          htmlFor="qr-text"
          hint={t.formTextCounter(content.text.length, MAX_TEXT_LENGTH)}
        >
          <Textarea
            id="qr-text"
            rows={5}
            placeholder={t.formTextPlaceholder}
            value={content.text}
            maxLength={MAX_TEXT_LENGTH}
            onChange={(event) => onChange("text", event.target.value)}
            className="resize-none"
          />
        </Field>
      );

    case "wifi":
      return (
        <div className="space-y-4">
          <Field label={t.formSsidLabel} htmlFor="qr-ssid" hint={t.formSsidHint}>
            <Input
              id="qr-ssid"
              placeholder={t.formSsidPlaceholder}
              value={content.ssid}
              onChange={(event) => onChange("ssid", event.target.value)}
            />
          </Field>
          {content.security !== "nopass" && (
            <Field label={t.formPasswordLabel} htmlFor="qr-password" hint={t.formPasswordHint}>
              <PasswordInput
                id="qr-password"
                value={content.password}
                onChange={(value) => onChange("password", value)}
              />
            </Field>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t.formSecurityLabel} htmlFor="qr-security">
              <Select
                id="qr-security"
                value={content.security}
                onChange={(event) => onChange("security", event.target.value as WifiSecurity)}
                options={WIFI_SECURITY_OPTIONS}
              />
            </Field>
            <div className="flex items-end pb-2.5">
              <Checkbox
                label={t.formHiddenNetwork}
                checked={content.hidden}
                onChange={(checked) => onChange("hidden", checked)}
              />
            </div>
          </div>
          <p className="text-xs text-fg-muted">{t.formWifiNote}</p>
        </div>
      );

    case "email":
      return (
        <div className="space-y-4">
          <Field label={t.formEmailLabel} htmlFor="qr-email" error={errors.email}>
            <Input
              id="qr-email"
              type="email"
              inputMode="email"
              placeholder={t.formEmailPlaceholder}
              value={content.email}
              invalid={!!errors.email}
              onChange={(event) => onChange("email", event.target.value)}
            />
          </Field>
          <Field label={t.formSubjectLabel} htmlFor="qr-subject">
            <Input
              id="qr-subject"
              placeholder={t.formSubjectPlaceholder}
              value={content.subject}
              onChange={(event) => onChange("subject", event.target.value)}
            />
          </Field>
          <Field label={t.formMessageLabel} htmlFor="qr-message">
            <Textarea
              id="qr-message"
              rows={3}
              placeholder={t.formMessagePlaceholder}
              value={content.message}
              onChange={(event) => onChange("message", event.target.value)}
              className="resize-none"
            />
          </Field>
        </div>
      );

    case "phone":
      return (
        <Field
          label={t.formPhoneLabel}
          htmlFor="qr-phone"
          error={errors.phone}
          hint={t.formPhoneHint}
        >
          <Input
            id="qr-phone"
            type="tel"
            inputMode="tel"
            placeholder={t.formPhonePlaceholder}
            value={content.phone}
            invalid={!!errors.phone}
            onChange={(event) => onChange("phone", event.target.value)}
          />
        </Field>
      );

    case "sms":
      return (
        <div className="space-y-4">
          <Field
            label={t.formSmsPhoneLabel}
            htmlFor="qr-sms-phone"
            error={errors.smsPhone}
            hint={t.formSmsPhoneHint}
          >
            <Input
              id="qr-sms-phone"
              type="tel"
              inputMode="tel"
              placeholder={t.formSmsPhonePlaceholder}
              value={content.smsPhone}
              invalid={!!errors.smsPhone}
              onChange={(event) => onChange("smsPhone", event.target.value)}
            />
          </Field>
          <Field label={t.formSmsMessageLabel} htmlFor="qr-sms-message">
            <Textarea
              id="qr-sms-message"
              rows={3}
              placeholder={t.formSmsMessagePlaceholder}
              value={content.smsMessage}
              onChange={(event) => onChange("smsMessage", event.target.value)}
              className="resize-none"
            />
          </Field>
        </div>
      );

    case "contact":
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label={t.formFirstNameLabel} htmlFor="qr-first-name">
            <Input
              id="qr-first-name"
              placeholder={t.formFirstNamePlaceholder}
              value={content.firstName}
              onChange={(event) => onChange("firstName", event.target.value)}
            />
          </Field>
          <Field label={t.formLastNameLabel} htmlFor="qr-last-name">
            <Input
              id="qr-last-name"
              placeholder={t.formLastNamePlaceholder}
              value={content.lastName}
              onChange={(event) => onChange("lastName", event.target.value)}
            />
          </Field>
          <Field label={t.formContactPhoneLabel} htmlFor="qr-contact-phone" error={errors.contactPhone}>
            <Input
              id="qr-contact-phone"
              type="tel"
              inputMode="tel"
              placeholder={t.formContactPhonePlaceholder}
              value={content.contactPhone}
              invalid={!!errors.contactPhone}
              onChange={(event) => onChange("contactPhone", event.target.value)}
            />
          </Field>
          <Field label={t.formContactEmailLabel} htmlFor="qr-contact-email" error={errors.contactEmail}>
            <Input
              id="qr-contact-email"
              type="email"
              inputMode="email"
              placeholder={t.formContactEmailPlaceholder}
              value={content.contactEmail}
              invalid={!!errors.contactEmail}
              onChange={(event) => onChange("contactEmail", event.target.value)}
            />
          </Field>
          <Field label={t.formCompanyLabel} htmlFor="qr-company">
            <Input
              id="qr-company"
              placeholder={t.formCompanyPlaceholder}
              value={content.company}
              onChange={(event) => onChange("company", event.target.value)}
            />
          </Field>
          <Field label={t.formWebsiteLabel} htmlFor="qr-website">
            <Input
              id="qr-website"
              placeholder={t.formWebsitePlaceholder}
              value={content.website}
              onChange={(event) => onChange("website", event.target.value)}
            />
          </Field>
          <Field label={t.formAddressLabel} htmlFor="qr-address" className="sm:col-span-2">
            <Input
              id="qr-address"
              placeholder={t.formAddressPlaceholder}
              value={content.address}
              onChange={(event) => onChange("address", event.target.value)}
            />
          </Field>
          <p className="text-xs text-fg-muted sm:col-span-2">{t.formVcardNote}</p>
        </div>
      );

    case "location":
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label={t.formLatitudeLabel} htmlFor="qr-latitude" error={errors.latitude}>
              <Input
                id="qr-latitude"
                inputMode="decimal"
                placeholder={t.formLatitudePlaceholder}
                value={content.latitude}
                invalid={!!errors.latitude}
                onChange={(event) => onChange("latitude", event.target.value)}
              />
            </Field>
            <Field label={t.formLongitudeLabel} htmlFor="qr-longitude">
              <Input
                id="qr-longitude"
                inputMode="decimal"
                placeholder={t.formLongitudePlaceholder}
                value={content.longitude}
                onChange={(event) => onChange("longitude", event.target.value)}
              />
            </Field>
          </div>
          <Field label={t.formLocationNameLabel} htmlFor="qr-location-name">
            <Input
              id="qr-location-name"
              placeholder={t.formLocationNamePlaceholder}
              value={content.locationName}
              onChange={(event) => onChange("locationName", event.target.value)}
            />
          </Field>
          <p className="text-xs text-fg-muted">{t.formGeoNote}</p>
        </div>
      );
  }
}
