
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://psaqmckgcqzchudbearx.supabase.co'
const supabaseKey = 'sb_publishable_EunaHHo7si2QebAclpEXxQ_4FfYI_-R'
export const supabase = createClient(supabaseUrl, supabaseKey)