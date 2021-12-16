import { Dispatch, SetStateAction, useRef, useState } from "react";
import { submitFeedback } from "../../graphql/apollo-client";
import styles from "../../styles/Home.module.css";

const FeedbackCard = ({
  reviewerId,
  review,
  setReviews,
}: {
  reviewerId: number;
  review: any;
  setReviews: Dispatch<SetStateAction<any[]>>;
}) => {
  const [feedback, setFeedback] = useState("");
  const submit = async () => {
    if (!feedback) {
      alert("Invalid Feedback Content...");
      return;
    }
    await submitFeedback(reviewerId, review.id, feedback);

    setReviews((old) => {
      return [...old.filter((oldView) => oldView.id !== review.id)];
    });
  };

  return (
    <div className={styles.card}>
      <h2>Name: {review.name}</h2>
      <p>Description: {review.description}</p>
      <div>
        <textarea
          onChange={(e) => {
            setFeedback(e.target.value);
          }}
        ></textarea>
      </div>
      <button onClick={submit}>Submit</button>
    </div>
  );
};

export default FeedbackCard;
