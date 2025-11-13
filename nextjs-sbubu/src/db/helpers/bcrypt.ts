import bcrypt from "bcryptjs";

export function hashPassword(password: string) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function comparePassword(password: string, hashedPass: string) {
  return bcrypt.compareSync(password, hashedPass);
}


