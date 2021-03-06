import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFeedbackInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
