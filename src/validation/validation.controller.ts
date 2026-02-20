import { Controller, Post, Body } from '@nestjs/common';
import { ValidationService } from './validation.service';

@Controller('validate')
export class ValidationController {
  constructor(private readonly svc: ValidationService) {}

  @Post('schedule')
  async validateSchedule(@Body() body: {
    schedule_id: string;
    zone_id: string;
    slots: any[];
    asset_ids: string[];
  }) {
    return this.svc.validateSchedule(body);
  }
}
