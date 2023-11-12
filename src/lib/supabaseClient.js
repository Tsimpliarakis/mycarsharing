import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://igohglatbbhgyelsipze.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlnb2hnbGF0YmJoZ3llbHNpcHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNTI5NzMsImV4cCI6MjAxNDkyODk3M30.0kAm5Z0owBVjy1kzzbbFsAgeGdQVIH7oUHobIi4lQag"
);
