const { Pool } = require('pg');

module.exports = new Pool({
  connectionString:
    'postgresql://naing_htwe_aung:naing_htwe_aung@localhost:5432/members_only',
});
