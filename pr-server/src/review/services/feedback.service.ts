import { Injectable } from '@nestjs/common';
import { SubmitFeedbackInput } from '../dto/submit-feedback.input';
import { FeedbackRepository } from '../repositories/feedback.repository';

@Injectable()
export class FeedbackService {
  constructor(private feedbackRepository: FeedbackRepository) {}

  async submitFeedback(submitFeedbackInput: SubmitFeedbackInput) {
    const { reviewerAccountId, reviewId, feedback } = submitFeedbackInput;

    await this.feedbackRepository.update(
      { reviewId, reviewerAccountId },
      { feedback },
    );

    return await this.feedbackRepository.findOne({
      reviewId,
      reviewerAccountId,
    });
  }

  // async create(createFeedbackInput: CreateFeedbackInput) {
  //   return 'This action adds a new Feedback';
  // }

  async findAllRequireFeedbackReviews(accountId) {
    const feedbackWithReviews =
      await this.feedbackRepository.findAllRequireFeedbackReviews(accountId);

    console.log('\x1b[32m', '\n--------------Debug----------------\n');
    console.log('\x1b[36m', `feedbackWithReviews = `, feedbackWithReviews);
    console.log('\x1b[32m', '\n-----------------------------------', '\x1b[0m');
    return feedbackWithReviews.map((feedbackWithReviews) => {
      return feedbackWithReviews.review;
    });
  }

  // async findOne(id: number) {
  //   return `This action returns a #${id} Feedback`;
  // }

  // async update(id: number, updateFeedbackInput: UpdateFeedbackInput) {
  //   return `This action updates a #${id} Feedback`;
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} Feedback`;
  // }
}
