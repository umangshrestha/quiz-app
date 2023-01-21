import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenService } from './access-token.service';
import { AccessTokenStrategy } from './access-token.strategy';

@Module({
  providers: [AccessTokenStrategy, AccessTokenService],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        secret: ConfigService.getOrThrow('ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: ConfigService.getOrThrow('ACCESS_TOKEN_EXPIRATION_TIME'),
        },
      }),
    }),
  ],
  exports: [JwtModule, AccessTokenService],
})
export class AccessTokenModule {}
