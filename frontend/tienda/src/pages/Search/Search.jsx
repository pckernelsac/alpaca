import { useNavigate } from 'react-router-dom';
import SearchOverlay from '@/components/ecommerce/SearchOverlay/SearchOverlay';

export default function Search() {
  const navigate = useNavigate();
  return <SearchOverlay isOpen onClose={() => navigate(-1)} />;
}