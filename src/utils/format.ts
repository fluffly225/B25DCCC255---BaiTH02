import type { Unit } from '../types';

/** Quy đổi từ °C sang đơn vị đang chọn (không gọi lại API). */
export function convertTemp(celsius: number, unit: Unit): number {
  return Math.round(unit === 'C' ? celsius : (celsius * 9) / 5 + 32);
}

/** Bỏ dấu tiếng Việt để tìm kiếm: "Đà Nẵng" -> "da nang". */
export function removeDiacritics(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

const WEEKDAYS = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

/** Chuỗi "YYYY-MM-DD" -> Date theo giờ địa phương (tránh lệch ngày do múi giờ). */
function parseDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function weekdayLabel(iso: string): string {
  return WEEKDAYS[parseDate(iso).getDay()];
}

export function dayMonthLabel(iso: string): string {
  const [, m, d] = iso.split('-');
  return `${d}/${m}`;
}

/** "2026-10-21T14:15" -> "14:15, 21/10/2026" */
export function formatUpdatedAt(iso: string): string {
  const [date, time] = iso.split('T');
  const [y, m, d] = date.split('-');
  return `${time}, ${d}/${m}/${y}`;
}
