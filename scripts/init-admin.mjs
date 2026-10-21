import {randomBytes,pbkdf2Sync} from 'node:crypto';
const salt=randomBytes(16).toString('hex'),id=randomBytes(12).toString('hex'),eid=randomBytes(12).toString('hex');const hash=pbkdf2Sync('secret',salt,210000,32,'sha256').toString('hex');
console.log(`INSERT OR IGNORE INTO enterprises (id,name) VALUES ('${eid}','MEGA SERVICES');`);
console.log(`INSERT OR IGNORE INTO users (id,enterprise_id,name,email,password_hash,password_salt,role,must_change) SELECT '${id}',id,'Super Admin','mega@services.local','${hash}','${salt}','superadmin',1 FROM enterprises WHERE id='${eid}';`);
console.error('À exécuter uniquement dans une console D1 privée. Ne pas committer cette sortie.');
