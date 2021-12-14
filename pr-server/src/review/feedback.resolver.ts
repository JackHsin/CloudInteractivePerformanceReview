import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/account/guard/roles.guard';
import { RoleTypeEnum } from 'src/account/enum/account.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Feedback } from './entities/feedback.entity.gql';
import { FeedbackService } from './services/feedback.service';
import { Review } from './entities/review.entity.gql';
import { SubmitFeedbackInput } from './dto/submit-feedback.input';
import { GqlJwtAuthGuard } from 'src/auth/jwt/graphql-jwt-auth.guard';

@UseGuards(RolesGuard)
@Roles(RoleTypeEnum.ADMIN, RoleTypeEnum.EMPLOYEE)
@UseGuards(GqlJwtAuthGuard)
@Resolver(() => Feedback)
export class FeedbackResolver {
  constructor(private feedbackService: FeedbackService) {}

  @Mutation(() => Feedback)
  async submit(
    @Args('submitFeedbackInput') submitFeedbackInput: SubmitFeedbackInput,
  ) {
    return await this.feedbackService.submitFeedback(submitFeedbackInput);
  }

  @Query(() => [Review], { name: 'findAllReviewsByAccountId' })
  async findAllReviewsByAccountId(
    @Args('accountId', { type: () => Int }) accountId: number,
  ) {
    console.log('\x1b[32m', '\n--------------Debug----------------\n');
    console.log('\x1b[36m', `accountId = `, accountId);
    console.log('\x1b[32m', '\n-----------------------------------', '\x1b[0m');
    return await this.feedbackService.findAllRequireFeedbackReviews(accountId);
  }
}
