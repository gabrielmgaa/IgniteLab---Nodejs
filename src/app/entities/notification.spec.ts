import { Content } from './content';
import { Notification } from './notification';

describe('Notification content', () => {
  it('should be able to create a notificiation', () => {
    const notification = new Notification({
      content: new Content('Pedido de amiaze'),
      category: 'socia',
      recipientId: 'example-recipientId',
    });

    expect(notification).toBeTruthy();
  });
});
