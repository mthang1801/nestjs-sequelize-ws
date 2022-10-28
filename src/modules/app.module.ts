import { Logger, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { APP_GUARD } from '@nestjs/core/constants';
import { ScheduleModule } from '@nestjs/schedule/dist';
import { SequelizeModule } from '@nestjs/sequelize';
import { RedisModule } from 'nestjs-redis';
import { join } from 'path';
import { AllExceptionsFilter } from 'src/common/filters/all-exception.filter';
import { AuthGuard } from 'src/common/guards/auth.guards';
import { configService } from 'src/configs/configService';
import { HomeController } from 'src/controllers/common/home.controller';
import { CronJobModule } from './cronJob.module';
import { UploadModule } from './upload.module';

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            logging: true,
            models: [join(__dirname, 'models/*.model.ts')],
            autoLoadModels: true,
            synchronize: true,
            timezone: '+07:00',
            replication: {
                write: {
                    host: configService.DatabaseConfig().master.host,
                    username: configService.DatabaseConfig().master.username,
                    database: configService.DatabaseConfig().master.database,
                    password: configService.DatabaseConfig().master.password,
                    port: configService.DatabaseConfig().master.port
                },
                read: [
                    {
                        host: configService.DatabaseConfig().slave.host,
                        username: configService.DatabaseConfig().slave.username,
                        database: configService.DatabaseConfig().slave.database,
                        password: configService.DatabaseConfig().slave.password,
                        port: configService.DatabaseConfig().slave.port
                    }
                ]
            }
        }),
        ScheduleModule.forRoot(),
        RedisModule.register({
            host: configService.RedisConfig().host,
            port: configService.RedisConfig().port,
            password: configService.RedisConfig().password,
            onClientReady: (client) => {
                client.on('error', (err) => {
                    Logger.error('Connect redis error', err);
                });

                client.once('ready', () => {
                    Logger.log('Redis is ready');
                });
            }
        }),
        // CronJobModule,
        // UploadModule
    ],
    controllers: [HomeController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        }
    ]
})
export class AppModule {}
