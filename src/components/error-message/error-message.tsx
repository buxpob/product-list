import { useAppSelector } from '../../hooks';
import './error-message.css';

export default function ErrorMessageComponent(): JSX.Element | null {
  const { error } = useAppSelector((state) => state);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;
}
