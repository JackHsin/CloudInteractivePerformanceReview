import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReviewService } from './services/review.service';
import { Review } from './entities/review.entity.gql';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { AssignReviewInput } from './dto/assign-review.input';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/account/guard/roles.guard';
import { RoleTypeEnum } from 'src/account/enum/account.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { GqlJwtAuthGuard } from 'src/auth/jwt/graphql-jwt-auth.guard';

@UseGuards(RolesGuard)
@Roles(RoleTypeEnum.ADMIN)
@UseGuards(GqlJwtAuthGuard)
@Resolver(() => Review)
export class ReviewResolver {
  constructor(private reviewService: ReviewService) {}

  @Mutation(() => Review)
  createReview(
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ) {
    return this.reviewService.create(createReviewInput);
  }

  @Mutation(() => Review)
  assignEmployeesToReview(
    @Args('assignReviewInput') assignReviewInput: AssignReviewInput,
  ) {
    return this.reviewService.assignEmployeesToReview(assignReviewInput);
  }

  @Query(() => [Review], { name: 'review' })
  findAll() {
    return this.reviewService.findAll();
  }

  @Query(() => Review, { name: 'review' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reviewService.findOne(id);
  }

  @Mutation(() => Review)
  updateReview(
    @Args('updateReviewInput') updateReviewInput: UpdateReviewInput,
  ) {
    return this.reviewService.update(updateReviewInput.id, updateReviewInput);
  }

  @Mutation(() => Review)
  removeReview(@Args('id', { type: () => Int }) id: number) {
    return this.reviewService.remove(id);
  }
}
