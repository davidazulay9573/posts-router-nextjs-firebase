

export default function Page({ data }) {
   return data.map(a => {return <p> {a.id}</p>})
}
 
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const data = await res.json()
 
  // Pass data to the page via props
  return { props: { data } }
}
