import { GetRecipientNotifications } from './../../app/use-cases/get-recipient-notifications';
import { CancelNotification } from './../../app/use-cases/cancel-notification';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/app/use-cases/send-notifications';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CountRecipientsNotifications } from 'src/app/use-cases/count-recipients-notifications';
import { ReadNotifications } from 'src/app/use-cases/read-notifications';
import { UnreadNotifications } from 'src/app/use-cases/unread-notifications';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientsNotifications,
    GetRecipientNotifications,
    ReadNotifications,
    UnreadNotifications,
  ],
})
export class HttpModule {}
