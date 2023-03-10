import { NotificationsRepository } from '../repositories/notifications-repository';
import { Injectable } from '@nestjs/common';

interface CountRecipientsNotificationsRequest {
  recipientId: string;
}

interface CountRecipientsNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientsNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: CountRecipientsNotificationsRequest,
  ): Promise<CountRecipientsNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.notificationsRepository.countManyByRecipientId(
      recipientId,
    );

    return {
      count,
    };
  }
}
