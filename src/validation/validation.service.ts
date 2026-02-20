import { Injectable, Logger } from '@nestjs/common';
import { SlotRulesService } from '../rules/slot-rules.service';
import { ContentRulesService } from '../rules/content-rules.service';

export interface ValidationIssue {
  severity: 'error' | 'warning' | 'info';
  code: string;
  message: string;
  slot_id?: string;
}

@Injectable()
export class ValidationService {
  private readonly logger = new Logger(ValidationService.name);

  constructor(
    private readonly slotRules: SlotRulesService,
    private readonly contentRules: ContentRulesService,
  ) {}

  async validateSchedule(params: {
    schedule_id: string;
    zone_id: string;
    slots: any[];
    asset_ids: string[];
  }): Promise<{ valid: boolean; has_fatal: boolean; issues: ValidationIssue[] }> {
    const issues: ValidationIssue[] = [];

    issues.push(...this.slotRules.check(params.slots));
    issues.push(...await this.contentRules.check(params.asset_ids));

    const has_fatal = issues.some(i => i.severity === 'error');
    this.logger.log(`Validation: schedule=${params.schedule_id} issues=${issues.length} fatal=${has_fatal}`);

    return { valid: !has_fatal, has_fatal, issues };
  }
}
