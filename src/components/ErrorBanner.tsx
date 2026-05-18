import { useError } from '../utils/ErrorDisplay';

export default function ErrorBanner() {
  const { error, setError } = useError();

  if (!error) return null;

  return (
    <div
      style={{
        background: '#ffdddd',
        padding: 10,
        margin: 10,
        borderRadius: 6,
        color: 'red',
      }}
    >
      {error}
      <button onClick={() => setError(null)} style={{ marginLeft: 10 }}>
        X
      </button>
    </div>
  );
}