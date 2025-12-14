import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET - Load user's selection
export async function GET() {
  try {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { data: selection, error } = await supabase
      .from('client_selections')
      .select('items, labels, updated_at')
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows found (which is fine for new users)
      console.error('Error fetching selection:', error);
      return NextResponse.json({ error: 'Failed to fetch selection' }, { status: 500 });
    }

    return NextResponse.json({
      items: selection?.items || [],
      labels: selection?.labels || [],
      updatedAt: selection?.updated_at || null,
    });

  } catch (error) {
    console.error('Selection GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST - Save user's selection
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { items, labels } = await request.json();

    // Upsert - insert if doesn't exist, update if it does
    const { error } = await supabase
      .from('client_selections')
      .upsert(
        {
          user_id: user.id,
          items: items || [],
          labels: labels || [],
        },
        {
          onConflict: 'user_id',
        }
      );

    if (error) {
      console.error('Error saving selection:', error);
      return NextResponse.json({ error: 'Failed to save selection' }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Selection POST error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

