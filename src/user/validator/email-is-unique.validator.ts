import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserService } from '../user.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailIsUniqueValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: any): Promise<boolean> {
    console.log('validador');
    const userAlreadyExists = await this.userService.findByEmail(value);
    return !userAlreadyExists;
  }
}

export const EmailIsUnique = (validationsOptions: ValidationOptions) => {
  return (object: object, propety: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propety,
      options: validationsOptions,
      constraints: [],
      validator: EmailIsUniqueValidator,
    });
  };
};
