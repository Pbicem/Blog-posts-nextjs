import blogs from "../../src/data/data";
import nc from "next-connect";

const handler = nc().post((req, res) => {
  const id = blogs.length + 1;
  const blog = { id, ...req.body };

  console.log(req.body);

  blogs.push(blog);
  return res.json({ data: blog });
});

export default handler;
