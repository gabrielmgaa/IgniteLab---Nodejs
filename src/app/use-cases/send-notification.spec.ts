import { InMemoryNotificationsRepository } from './../../../test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notifications';

describe('Send Notification', () => {
  it('should be able to send a notification', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const notification = new SendNotification(notificationsRepository);

    notification.execute({
      content: 'The first notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
