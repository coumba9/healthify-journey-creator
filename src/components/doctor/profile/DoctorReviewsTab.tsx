
import DoctorReviewItem from "./DoctorReviewItem";

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface DoctorReviewsTabProps {
  reviews: Review[];
}

const DoctorReviewsTab = ({ reviews }: DoctorReviewsTabProps) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <DoctorReviewItem 
          key={review.id}
          id={review.id}
          author={review.author}
          rating={review.rating}
          comment={review.comment}
          date={review.date}
        />
      ))}
      {reviews.length === 0 && (
        <p className="text-center py-4 text-gray-500">Aucun avis pour ce médecin.</p>
      )}
    </div>
  );
};

export default DoctorReviewsTab;
