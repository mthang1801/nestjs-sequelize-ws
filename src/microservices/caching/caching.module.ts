import { Global, Module } from '@nestjs/common';
import { CachingService } from './caching.service';

@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [CachingService],
    exports: [CachingService],
})
export class CachingModule {}
