function page({ dataset }) {
  return (
    <ul>
      {dataset.data.map((instance) => (
        <li>{instance.email}</li>
      ))}
    </ul>
  )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const res = await fetch('https://reqres.in/api/users?page=2')
  const dataset = await res.json()

  return {
    props: {
      dataset,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  }
}

export default page