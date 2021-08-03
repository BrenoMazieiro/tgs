const {
  uuidRoleSystem,
  uuidRoleBOadmin,
  uuidRoleRegular,
  uuidUserSystem,
  uuidUserMigration
} = require('./constants')

exports.up = (knex) => Promise.all([
  knex.raw(`
    INSERT INTO roles(id, name, code, created_at, updated_at, created_by, updated_by)
    VALUES('${uuidRoleSystem}', 'System', 'SYSTEM', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserMigration}', '${uuidUserMigration}');
    `),
  knex.raw(`
    INSERT INTO roles(id, name, code, created_at, updated_at, created_by, updated_by)
    VALUES('${uuidRoleBOadmin}', 'backoffice admin', 'BOADMIN', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserMigration}', '${uuidUserMigration}');
    `),
  knex.raw(`
    INSERT INTO roles(id, name, code, created_at, updated_at, created_by, updated_by)
    VALUES('${uuidRoleRegular}', 'regular user', 'REGULAR', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserMigration}', '${uuidUserMigration}');
    `),

  knex.raw(`INSERT INTO public.users
    (id, role_id, name, picture, email, username, "password", approval_token, created_at, updated_at, created_by, updated_by)
    VALUES('${uuidUserSystem}', '${uuidRoleSystem}', 'system', '', 'admin@thegodstack.com', 'system', 'Xx()*6%.js@#45654AAdd', null, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserSystem}', '${uuidUserSystem}')`),
  knex.raw(`INSERT INTO public.users
    (id, role_id, name, picture, email, username, "password", approval_token, created_at, updated_at, created_by, updated_by)
    VALUES('${uuidUserMigration}', '${uuidRoleSystem}', 'migration', '', 'migration@thegodstack.com', 'migration', 'Xx()*6%.js@#45654AAdd', null, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserSystem}', '${uuidUserSystem}')`),


  knex.raw(`
      INSERT INTO permissions(id, code, description, created_at, updated_at, created_by, updated_by) VALUES('15c18aa9-199c-4d45-b35a-fbfa2e65f250', 'usr_c', 'User managment create',CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserMigration}', '${uuidUserMigration}');
    `),
  knex.raw(`
      INSERT INTO permissions(id, code, description, created_at, updated_at, created_by, updated_by) VALUES('15c18aa9-199c-4d45-b35a-fbfa2e65f251', 'usr_r', 'User managment read',CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserMigration}', '${uuidUserMigration}');
    `),
  knex.raw(`
      INSERT INTO permissions(id, code, description, created_at, updated_at, created_by, updated_by) VALUES('15c18aa9-199c-4d45-b35a-fbfa2e65f252', 'usr_u', 'User managment update',CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserMigration}', '${uuidUserMigration}');
    `),
  knex.raw(`
      INSERT INTO permissions(id, code, description, created_at, updated_at, created_by, updated_by) VALUES('15c18aa9-199c-4d45-b35a-fbfa2e65f253', 'usr_d', 'User managment delete',CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserMigration}', '${uuidUserMigration}');
    `),

  knex.raw(`
      INSERT INTO role_permissions(role_id, permission_id, created_at, updated_at, created_by, updated_by) VALUES ('${uuidRoleSystem}', '15c18aa9-199c-4d45-b35a-fbfa2e65f250', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserMigration}', '${uuidUserMigration}');
    `),
  knex.raw(`
      INSERT INTO role_permissions(role_id, permission_id, created_at, updated_at, created_by, updated_by) VALUES ('${uuidRoleSystem}', '15c18aa9-199c-4d45-b35a-fbfa2e65f251', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserMigration}', '${uuidUserMigration}');
    `),
  knex.raw(`
      INSERT INTO role_permissions(role_id, permission_id, created_at, updated_at, created_by, updated_by) VALUES ('${uuidRoleSystem}', '15c18aa9-199c-4d45-b35a-fbfa2e65f252', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserMigration}', '${uuidUserMigration}');
    `),
  knex.raw(`
      INSERT INTO role_permissions(role_id, permission_id, created_at, updated_at, created_by, updated_by) VALUES ('${uuidRoleSystem}', '15c18aa9-199c-4d45-b35a-fbfa2e65f253', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserMigration}', '${uuidUserMigration}');
    `),

  knex.raw(`
      INSERT INTO role_permissions(role_id, permission_id, created_at, updated_at, created_by, updated_by) VALUES ('${uuidRoleBOadmin}', '15c18aa9-199c-4d45-b35a-fbfa2e65f250', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserMigration}', '${uuidUserMigration}');
    `),
  knex.raw(`
      INSERT INTO role_permissions(role_id, permission_id, created_at, updated_at, created_by, updated_by) VALUES ('${uuidRoleBOadmin}', '15c18aa9-199c-4d45-b35a-fbfa2e65f251', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserMigration}', '${uuidUserMigration}');
    `),
  knex.raw(`
      INSERT INTO role_permissions(role_id, permission_id, created_at, updated_at, created_by, updated_by) VALUES ('${uuidRoleBOadmin}', '15c18aa9-199c-4d45-b35a-fbfa2e65f252', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserMigration}', '${uuidUserMigration}');
    `),
  knex.raw(`
      INSERT INTO role_permissions(role_id, permission_id, created_at, updated_at, created_by, updated_by) VALUES ('${uuidRoleBOadmin}', '15c18aa9-199c-4d45-b35a-fbfa2e65f253', CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), '${uuidUserMigration}', '${uuidUserMigration}');
    `),

])

exports.down = (knex) => null
