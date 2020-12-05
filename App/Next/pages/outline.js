import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

// Learn more about using SWR to fetch data from
// your API routes -> https://swr.vercel.app/
export default function App() {
  const { data, error } = useSWR(
    'https://www.businessinsider.com/aws-ceo-andy-jassy-on-complicated-relationship-with-snowflake-2020-11',
    fetcher
  );

  //if (error) return 'An error has occurred.';
  //if (!data) return 'Loading...';
  return <code>{JSON.stringify(error, null, 2)}</code>;
  //return <code>{JSON.stringify(data, null, 2)}</code>;
  //return <html>{data}</html>;
}