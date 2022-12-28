import { InMemoryNotificationsRepository } from './../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientsNotifications } from './count-recipients-notifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countNoficiations = new CountRecipientsNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'example-recipient-id1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'example-recipient-id1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'example-recipient-id2' }),
    );

    const { count } = await countNoficiations.execute({
      recipientId: 'example-recipient-id1',
    });

    expect(count).toEqual(2);
  });
});
