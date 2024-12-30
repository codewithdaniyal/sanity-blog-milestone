import { simpleBlogCard } from "./lib/interface";
import { client, urlFor } from "./lib/sanity";
import Link from "next/link";

export const revalidate = 30;

async function getData() {
  const query = `
  *[_type == 'blog'] | order(_createdAt desc) {
    title,
      smallDescription,
      "currentSlug": slug.current,
      titleImage
  }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  return (
    <div className="px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Featured Article */}
      <div className="relative group overflow-hidden rounded-lg shadow-lg md:col-span-2 lg:col-span-2">
        <img
          src={urlFor(data[0].titleImage).url()}
          alt={data[0].title}
          className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 z-10 text-white">
          <h3 className="text-2xl font-bold">{data[0].title}</h3>
          <p className="text-sm mt-1">{data[0].smallDescription}</p>
          <Link href={`/blog/${data[0].currentSlug}`}>
            <button className="mt-2 px-4 py-2 bg-yellow-500 text-sm font-semibold rounded hover:bg-yellow-400">
              Read More
            </button>
          </Link>
        </div>
      </div>

      {/* Other Articles */}
      {data.slice(1).map((post, idx) => (
        <div
          key={idx}
          className="relative group overflow-hidden rounded-lg shadow-lg"
        >
          <img
            src={urlFor(post.titleImage).url()}
            alt={post.title}
            className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
          <div className="absolute bottom-4 left-4 z-10 text-white">
            <h3 className="text-lg font-bold">{post.title}</h3>
            <p className="text-sm mt-1">{post.smallDescription}</p>
            <Link href={`/blog/${post.currentSlug}`}>
              <button className="mt-2 px-4 py-2 bg-yellow-500 text-sm font-semibold rounded hover:bg-yellow-400">
                Read More
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
