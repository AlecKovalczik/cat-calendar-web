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
    if (!session) return null

    try {
        const idString = session.userId.toString();
        const data = await sql`
            SELECT id, name, email FROM users
            WHERE id = ${idString}
            LIMIT 1;
        `;

        const user = data.rows.at(0);

        return user
    } catch {
        console.log('Failed to fetch user')
        return null
    }
})