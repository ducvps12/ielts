import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Length,
} from "class-validator";

export class RegisterDto {
  @IsString()
  @Length(2, 80)
  displayName!: string;

  @IsEmail()
  @Length(3, 254)
  email!: string;

  @IsString()
  @Length(10, 128)
  password!: string;

  @IsBoolean()
  acceptedTerms!: boolean;
}

export class VerifyEmailDto {
  @IsString()
  @Length(20, 256)
  token!: string;
}

export class LoginDto {
  @IsEmail()
  @Length(3, 254)
  email!: string;

  @IsString()
  @Length(1, 128)
  password!: string;

  @IsOptional()
  @IsBoolean()
  remember?: boolean;
}

export class ForgotPasswordDto {
  @IsEmail()
  @Length(3, 254)
  email!: string;
}

export class ResetPasswordDto {
  @IsString()
  @Length(20, 256)
  token!: string;

  @IsString()
  @Length(10, 128)
  password!: string;
}
