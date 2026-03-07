import { Injectable } from '@nestjs/common';

@Injectable()
export class ContentRulesService {
  async check(assetIds: string[]): Promise<{ severity: 'error' | 'warning' | 'info'; code: string; message: string }[]> {
    const issues: { severity: 'error' | 'warning' | 'info'; code: string; message: string }[] = [];

    // Stub: in production, verify each asset_id exists in content-service and has status=ready
    for (const assetId of assetIds) {
      if (!assetId) {
        issues.push({ severity: 'error', code: 'NULL_ASSET_REF', message: 'Null asset reference in schedule' });
      }
    }

    return issues;
  }
}
