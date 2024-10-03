export enum UserRole {
  ADMIN = 'ADMIN',
  MAINT = 'MAINT',
  OPER = 'OPER',
  VIEWER = 'VIEWER',
}

export interface UserAttributes {
  id: string;
  fullname: string;
  username: string;
  password: string;
  role: UserRole;
  active: boolean;
}

export interface UserCreationAttributes
  extends Omit<UserAttributes, 'id' | 'role'> {
}

export interface UserUpdateAttributes
  extends Partial<UserAttributes> {
}

export interface UserCredentialsAttributes {
  username: string;
  password: string;
}

export interface SessionOperatorsAttributes {
  id: string;
  start_time: Date;
  end_time: Date;
  operator_id: string;
  session_id: string;
}