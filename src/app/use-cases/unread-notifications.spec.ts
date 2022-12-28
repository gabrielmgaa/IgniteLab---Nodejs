import { ReadNotifications } from './read-notifications';
import { UnreadNotifications } from './unread-notifications';
import { makeNotification } from '@test/factories/notification-factory';
import { NotificationNotFound } from './errors/notification-not-found';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';

describe('unread Notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotficiations = new UnreadNotifications(
      notificationsRepository,
    );

    const notification = makeNotification({ readAt: new Date() });

    notificationsRepository.create(notification);

    await unreadNotficiations.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to ', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotifications = new ReadNotifications(notificationsRepository);

    expect(() => {
      return readNotifications.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
