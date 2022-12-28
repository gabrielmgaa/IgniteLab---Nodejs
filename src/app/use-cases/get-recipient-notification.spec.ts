import { GetRecipientNotifications } from './get-recipient-notifications';
import { InMemoryNotificationsRepository } from './../../../test/repositories/in-memory-notifications-repository';
import { makeNotification } from '@test/factories/notification-factory';

describe('Get recipients notifications', () => {
  it('should be able to get recipient notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countNoficiations = new GetRecipientNotifications(
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

    const { notifications } = await countNoficiations.execute({
      recipientId: 'example-recipient-id1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-id1' }),
        expect.objectContaining({ recipientId: 'example-recipient-id1' }),
      ]),
    );
  });
});
