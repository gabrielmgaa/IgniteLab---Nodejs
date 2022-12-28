import { CountRecipientsNotifications } from './../../../app/use-cases/count-recipients-notifications';
import { UnreadNotifications } from './../../../app/use-cases/unread-notifications';
import { CancelNotification } from './../../../app/use-cases/cancel-notification';
import { SendNotification } from './../../../app/use-cases/send-notifications';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { Body, Controller, Post } from '@nestjs/common';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { Get, Param, Patch } from '@nestjs/common/decorators';
import { ReadNotifications } from 'src/app/use-cases/read-notifications';
import { GetRecipientNotifications } from 'src/app/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotifications: ReadNotifications,
    private unreadNotifications: UnreadNotifications,
    private countRecipientsNotifications: CountRecipientsNotifications,
    private getRecipientsNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotifications.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotifications.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientsNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientsNotifications.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
