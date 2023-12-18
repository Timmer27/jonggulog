import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";

export default function BookingCard() {
  return (
    // shadow-[0px_0px_9px_-1px_#b3b3b347]
    <div className="w-full  p-4 border-[#d0d0d0] rounded-xl">
      <Typography variant="h5" color="gray">
        순서 1
      </Typography>
      <Typography color="gray">
        Enter a freshly updated and thoughtfully furnished peaceful home
        surrounded by ancient trees, stone walls, and open meadows.
      </Typography>
    </div>
  );
}
