import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Blogpage({ myblog }) {
  const [iseditable, seteditvalue] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();

  async function submitaction(e) {
    //e.preventDefault();
    //console.log(text, title);

    // const blogid = blogs.length + 1;
    // blogs.push({
    //   id: blogid,
    //   title: title,
    //   para: text,
    // });

    // //console.log(blogs.length + " hello baby");
    // console.log(blogs);
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/addblog", {
      body: JSON.stringify({
        title: title,
        para: text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();

    router.push("/");
  }

  //console.log(myblog);
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

      <div className="blogpagewithid">
        <h2 className="blogtitle"> {myblog[0].title}</h2>
        <p className="blogpara"> {myblog[0].para}</p>
      </div>

      <button
        onClick={() => {
          seteditvalue(true);
          setText(myblog[0].para);
          setTitle(myblog[0].title);
        }}
      >
        Edit
      </button>
      {iseditable == true ? (
        <form className="formelement" onSubmit={submitaction}>
          <label className="labelel">Title</label>
          <input
            className="titleinput"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <label className="labelel">Text</label>
          <textarea
            className="textinput"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <button className="submitbutton" type="submit">
            {" "}
            submit
          </button>
        </form>
      ) : (
        <h1></h1>
      )}
    </div>
  );
}

export async function getServerSideProps({ params, req, res }) {
  console.log("params id", params.id);
  const resp = await fetch(`http://localhost:3000/api/${params.id}`);
  //console.log(res);

  const data = await resp.json();
  const blog = data.data;

  //console.log(blogs);

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: { myblog: blog },
  };
}
