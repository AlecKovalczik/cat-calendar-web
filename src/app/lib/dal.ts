import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { sql } from '@vercel/postgres'

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (!session?.sub) {
        redirect('/login')
    }

    return { isAuth: true, userId: session.sub }
})

export const getUser = cache(async () => {
    const session = await verifySession()

    try {
        const idString = session.userId;
        const data = await sql`
            SELECT id, username, email FROM users
            WHERE id = ${idString};
        `;

        const user = data.rows[0];
        if (!user) return null

        return user
    } catch {
        console.log('Failed to fetch user')
        return null
    }
})