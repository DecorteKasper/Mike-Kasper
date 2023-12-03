import { Module, forwardRef, Global } from '@nestjs/common'
import { NotificationsGateway } from './notifications.gateway'
// import { LivelocationsModule } from 'src/livelocations/livelocations.module'
// import { LocationsModule } from 'src/locations/locations.module'
import { TodoModule } from 'src/todo/todo.module'
import { AuthenticationModule } from 'src/authentication/authentication.module'
import { UsersModule } from 'src/users/users.module'

@Global()
@Module({
    imports: [
        forwardRef(() => TodoModule),
        // AuthenticationModule,
        // UsersModule,
    ],
    providers: [NotificationsGateway],
    exports: [NotificationsGateway],
})
export class NotificationsModule { }