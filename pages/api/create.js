import prisma from "../../lib/prisma";

export default async function handle(req, res) {
  const { firstName, lastName, avatar, email } = req.body;

  const result = await prisma.user.create({
    data: {
      firstName: firstName,
      lastName: lastName,
      avatar: avatar,
      email: email,
    },
  });
  res.json(result);
}
