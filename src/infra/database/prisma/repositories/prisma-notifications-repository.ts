import { Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma.service';
import { Notification } from 'src/app/entities/notification';
import { NotificationsRepository } from 'src/app/repositories/notifications-repository';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: { recipientId },
    });

    return count;
  }
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notificiations = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notificiations.map(PrismaNotificationMapper.toDomain);
  }

  async findById(notificationId: string): Promise<Notification> {
    const notification = await this.prismaService.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }
  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
