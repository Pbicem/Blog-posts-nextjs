import blogs from "../src/data/data";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function CreateBlog() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  async function submitaction(e) {
    //e.preventDefault();
    console.log(text, title);

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
      <form className="formelement" onSubmit={submitaction}>
        <label className="labelel">Title</label>
        <input
          className="titleinput"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <label className="labelel">Text</label>
        <textarea
          className="textinput"
          type="text"
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <button className="submitbutton" type="submit">
          {" "}
          submit
        </button>
      </form>
    </div>
  );
}
