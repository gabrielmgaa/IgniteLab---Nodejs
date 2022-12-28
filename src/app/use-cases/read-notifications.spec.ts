import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotifications } from './read-notifications';
import { NotificationNotFound } from './errors/notification-not-found';
import { InMemoryNotificationsRepository } from './../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotifications(notificationsRepository);

    const notification = makeNotification();

    notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationsRepository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
