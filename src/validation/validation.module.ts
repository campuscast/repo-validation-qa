import { Module } from '@nestjs/common';
import { ValidationService } from './validation.service';
import { ValidationController } from './validation.controller';
import { SlotRulesService } from '../rules/slot-rules.service';
import { ContentRulesService } from '../rules/content-rules.service';
@Module({
  providers: [ValidationService, SlotRulesService, ContentRulesService],
  controllers: [ValidationController],
  exports: [ValidationService],
})
export class ValidationModule {}
