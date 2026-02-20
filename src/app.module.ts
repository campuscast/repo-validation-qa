import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ValidationModule } from './validation/validation.module';
import { HealthController } from './common/health.controller';
import { appConfig, validate } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validate,
    }),
    ValidationModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
