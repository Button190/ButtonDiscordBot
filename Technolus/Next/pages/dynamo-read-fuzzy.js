import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

// Learn more about using SWR to fetch data from
// your API routes -> https://swr.vercel.app/
export default function App() {
  const { data, error } = useSWR(
    '/api/dynamo?user=joaoramos.dev@gmail.com&space=.entertainment.&fuzzy=1',
    fetcher
  );

  if (error) return 'An error has occurred.';
  if (!data) return 'Loading...';
  return <code>{JSON.stringify(data, null, 2)}</code>;
}