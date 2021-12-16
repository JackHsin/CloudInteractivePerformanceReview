import { useRef, useState } from "react";
import { submitFeedback } from "../../graphql/apollo-client";
import styles from "../../styles/Home.module.css";

const FeedbackCard = ({
  reviewerId,
  review,
}: {
  reviewerId: number;
  review: any;
}) => {
  const [feedback, setFeedback] = useState("");
  const submit = () => {
    submitFeedback(reviewerId, review.id, feedback);
  };

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <h2>Name: {review.name}</h2>
        <p>Description {review.description}</p>
        <div>
          <textarea
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          ></textarea>
        </div>
        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
};

export default FeedbackCard;
