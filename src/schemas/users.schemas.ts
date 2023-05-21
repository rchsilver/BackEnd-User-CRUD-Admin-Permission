import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
  admin: z.boolean().optional(),
  active: z.boolean().optional(),
});

const requestUserSchema = userSchema.omit({ id: true });

const requestPostUserSchema = userSchema.omit({ id: true, active: true });

const responseUserSchema = userSchema.omit({ password: true });

const requestAllUsersSchema = z.array(responseUserSchema);

const updateUserSchema = requestUserSchema.partial();

const requestPatchUserSchema = updateUserSchema.omit({
  admin: true,
  active: true,
});

const responsePatchUserSchema = responseUserSchema.partial();

export {
  userSchema,
  requestUserSchema,
  responseUserSchema,
  requestAllUsersSchema,
  requestPostUserSchema,
  updateUserSchema,
  requestPatchUserSchema,
  responsePatchUserSchema,
};
