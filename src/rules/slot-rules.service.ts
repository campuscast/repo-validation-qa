import { Injectable } from '@nestjs/common';

@Injectable()
export class SlotRulesService {
  check(slots: any[]): { severity: 'error' | 'warning' | 'info'; code: string; message: string; slot_id?: string }[] {
    const issues: { severity: 'error' | 'warning' | 'info'; code: string; message: string; slot_id?: string }[] = [];

    for (const slot of slots) {
      if (!slot.asset_id) {
        issues.push({ severity: 'error', code: 'MISSING_ASSET', message: `Slot ${slot.slot_id} has no asset assigned`, slot_id: slot.slot_id });
      }
      if (!slot.start_time || !slot.end_time) {
        issues.push({ severity: 'error', code: 'MISSING_TIME', message: `Slot ${slot.slot_id} missing start/end time`, slot_id: slot.slot_id });
      }
      if (slot.start_time && slot.end_time && new Date(slot.start_time) >= new Date(slot.end_time)) {
        issues.push({ severity: 'error', code: 'INVALID_TIME_RANGE', message: `Slot ${slot.slot_id} start >= end`, slot_id: slot.slot_id });
      }
    }

    if (slots.length === 0) {
      issues.push({ severity: 'warning', code: 'EMPTY_SCHEDULE', message: 'Schedule has no slots' });
    }

    return issues;
  }
}
