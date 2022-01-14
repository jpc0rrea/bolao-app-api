export default interface ICreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  permissionLevel?: number;
}
