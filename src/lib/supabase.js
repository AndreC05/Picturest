import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  (process.env.SUPABASE_PROJECT_URL =
    'https://hivfhpsvvsuowlpqbsdw.supabase.co'),
  (process.env.SUPABASE_ANON_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhpdmZocHN2dnN1b3dscHFic2R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyNzE5NDQsImV4cCI6MjA0OTg0Nzk0NH0.9HKegTm6CGBzobTIK23uvP29RDK1eKmDJP0AhGhhqmE')
);
