var path = require('path');

module.exports = {
    appname: "CDS",
    port: process.env.PORT || 9999,
    session: {
        key: "asdklghakjhsadd21721973hsa1892",
        cookieName: "asdklghakjhsadd21721973hsa1892",
        maxAge: 3600000,
        expires: 3600000
    },
    token: 'auth_token',
    orgId: 'org_token'
};
