import { readRolesById } from "../../../Infrastructure/readRolesById.js"

export const UserChain = {
  name: (parent) => `${parent.name} XXX`,
  role: (parent, _, ctx) => readRolesById(ctx, parent.roleId),
}