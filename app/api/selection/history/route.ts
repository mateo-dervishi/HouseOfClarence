import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { data: submissions, error } = await supabase
      .from('selection_submissions')
      .select('id, total_items, total_rooms, filename, submitted_at, status')
      .eq('user_id', user.id)
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Error fetching submission history:', error);
      return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
    }

    return NextResponse.json({ submissions: submissions || [] });

  } catch (error) {
    console.error('Submission history error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

