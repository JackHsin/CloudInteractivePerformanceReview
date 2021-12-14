import { Module } from '@nestjs/common';
import { ReviewService } from './services/review.service';
import { ReviewResolver } from './review.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewRepository } from './repositories/review.repository';
import { FeedbackRepository } from './repositories/feedback.repository';
import { FeedbackResolver } from './feedback.resolver';
import { FeedbackService } from './services/feedback.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewRepository, FeedbackRepository])],
  providers: [ReviewResolver, ReviewService, FeedbackResolver, FeedbackService],
})
export class ReviewModule {}
