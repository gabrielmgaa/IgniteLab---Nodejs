import { Notification } from './../entities/notification';
import { Content } from './../entities/content';
import { NotificationsRepository } from '../repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface sendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface sendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: sendNotificationRequest,
  ): Promise<sendNotificationResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
