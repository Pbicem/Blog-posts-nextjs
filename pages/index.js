import styles from "../styles/Home.module.css";
import Link from "next/link";
import router, { useRouter } from "next/router";

export default function Home({ blogs }) {
  //const router = useRouter();
  return (
    <div>
      <div className="blognav">
        <Link href="/">
          <h1 className="blogheading"> BLOG </h1>
        </Link>
        <Link href="/create">
          <a> Create Blog</a>
        </Link>
      </div>
      {/* <button
        onClick={() => {
          router.push("/create");
        }}
      >
        second create blog
      </button> */}
      <div className="divofblogs">
        {blogs.map((blog) => {
          return (
            <Link href={"/blog/" + blog.id} key={blog.id}>
              <div className="singleblogitem">
                {/* <h1> {blog.id} </h1> */}
                <h2 className="blogtitle"> {blog.title}</h2>
                <p className="blogpara"> {blog.para}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/getblogs");
  //console.log(res);

  const data = await res.json();
  const blogarray = data.data;

  //console.log(blogs);

  if (!blogarray) {
    return {
      notFound: true,
    };
  }

  return {
    props: { blogs: blogarray },
  };
}
