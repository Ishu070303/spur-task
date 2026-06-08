import app from './app';
import { env } from './config/env';
import './config/database';

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});
