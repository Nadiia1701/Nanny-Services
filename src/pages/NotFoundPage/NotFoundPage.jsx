import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      Not Found! Go to <Link to="/">Home Page</Link>
    </div>
  );
}
