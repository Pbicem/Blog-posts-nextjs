import blogs from "../../src/data/data";
import { useRouter } from "next/router";

export default function handler(req, res) {
  const pathid = req.query.id;
  const myblog = blogs.filter((blog) => {
    return blog.id == pathid;
  });
  //console.log("printing ", myblog);
  res.status(200).json({ data: myblog });
}
