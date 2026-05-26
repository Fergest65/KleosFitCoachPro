import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dicfqbqdbqkyggjezpaz.supabase.co';

const supabaseKey = 'sb_publishable_m4WBBkaDzYRfeEQYrCkdGw_LSKwPBB_';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: false,
    detectSessionInUrl: false,
  },
});