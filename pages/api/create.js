import prisma from "../../lib/prisma";

// POST /api/post
export default async function handle(req, res) {
  const { fname, lname, avatar, email } = req.body;

  const result = await prisma.user.create({
    data: {
      firstName: fname,
      lastName: lname,
      avatar: avatar,
      email: email,
    },
  });
  res.json(result);
}
