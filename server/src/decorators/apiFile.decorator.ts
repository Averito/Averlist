import { ApiBody } from '@nestjs/swagger'

export const ApiFile =
	(fieldName = 'file'): MethodDecorator =>
	(target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		ApiBody({
			schema: {
				type: 'object',
				properties: {
					[fieldName]: {
						type: 'string',
						format: 'binary'
					}
				}
			}
		})(target, propertyKey, descriptor)
	}
