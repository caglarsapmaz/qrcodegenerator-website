import {
  Link,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Type,
  UserRound,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import type { ContentType } from "../types/qr";

export const TYPE_ICONS: Record<ContentType, LucideIcon> = {
  url: Link,
  text: Type,
  wifi: Wifi,
  email: Mail,
  phone: Phone,
  sms: MessageSquareText,
  contact: UserRound,
  location: MapPin,
};

export function getTypeIcon(type: ContentType): LucideIcon {
  return TYPE_ICONS[type];
}
