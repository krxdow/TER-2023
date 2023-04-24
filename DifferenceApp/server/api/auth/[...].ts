// file: ~/server/api/auth/[...].ts

import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import {NuxtAuthHandler} from '#auth'
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import {PrismaClient} from "@prisma/client"
import {randomBytes, randomUUID} from "crypto";

const prisma = new PrismaClient()


export default NuxtAuthHandler({
    // A secret string you define, to ensure correct encryption


    session: {
        strategy: 'jwt',
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },


    pages: {
        /*   signIn: '/custom-signin',*/
        signIn: '/login',
    },

    adapter: PrismaAdapter(prisma),
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        GithubProvider.default({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET

        }),

        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {label: 'Username', type: 'text', placeholder: '(hint: jsmith)'},
                password: {label: 'Password', type: 'password', placeholder: '(hint: hunter2)'}
            },
            authorize(credentials: any) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // NOTE: THE BELOW LOGIC IS NOT SAFE OR PROPER FOR AUTHENTICATION!

                const user = {id: '1', name: 'J Smith', username: 'jsmith', password: 'hunter2'}

                if (credentials?.username === user.username && credentials?.password === user.password) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // eslint-disable-next-line no-console
                    console.error('Warning: Malicious login attempt registered, bad credentials provided')

                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    //@ts-ignore
    secret: process.env.AUTH_SECRET ?? 'test-123',
})
