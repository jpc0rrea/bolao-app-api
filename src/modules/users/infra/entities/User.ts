import { Exclude, Expose } from 'class-transformer';

@Expose()
class ExposedUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  @Exclude()
  password: string;

  avatarUrl: string | null;
  permissionLevel: number;

  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;

  @Expose({ name: 'fullName' })
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export default ExposedUser;