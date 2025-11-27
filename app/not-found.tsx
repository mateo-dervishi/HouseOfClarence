import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1 className="text-6xl md:text-8xl font-display tracking-widest mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl tracking-widest mb-4">PAGE NOT FOUND</h2>
      <p className="text-warm-grey mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">RETURN TO HOME</Link>
      </Button>
    </div>
  );
}

