
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ReviewProps {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

const DoctorReviewItem = ({ id, author, rating, comment, date }: ReviewProps) => {
  return (
    <Card key={id}>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-gray-500">
              {new Date(date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400" />
            <span className="ml-1">{rating}</span>
          </div>
        </div>
        <p className="mt-2">{comment}</p>
      </CardContent>
    </Card>
  );
};

export default DoctorReviewItem;
