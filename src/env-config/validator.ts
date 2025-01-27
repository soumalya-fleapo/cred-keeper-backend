import { Logger } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvConfig } from './config';

export function validate(config: Record<string, unknown>): EnvConfig {
  const validatedConfig = plainToInstance(EnvConfig, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length) {
    new Logger().log({
      message: 'Please provide valid ENV',
      errors: errors.reduce((acc, error) => {
        return { ...acc, [error.property]: error.constraints };
      }, {}),
    });

    process.exit(1);
  }

  return validatedConfig;
}
