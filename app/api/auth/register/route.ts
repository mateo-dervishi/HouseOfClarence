import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password, firstName, lastName, phone, accountType } = await request.json()

    const supabase = await createClient()

    // Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 400 })
    }

    // Generate account number using the database function
    const { data: accountNumber } = await supabase.rpc('generate_account_number')

    // Create profile with account number and lead source
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      email,
      first_name: firstName,
      last_name: lastName,
      phone: phone || null,
      account_type: accountType,
      account_number: accountNumber,
      lead_source: 'website_signup',
      interest_level: 'warm',
    })

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // Don't fail the whole registration if profile creation fails
      // The user can still log in
    }

    return NextResponse.json({
      success: true,
      user: authData.user,
      accountNumber,
      message: 'Account created successfully! Please check your email to verify your account.',
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

