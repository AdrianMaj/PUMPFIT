import { NextRequest } from 'next/server'
import prisma from '../../../../lib/prisma'
import { redirect } from 'next/navigation'

const GET = async (request: NextRequest, { params }: { params: { token: string } }) => {
	const { token } = params
	const account = await prisma.account.findFirst({
		where: {
			ActivateToken:{
                some:{
                    AND: [
                        {
                            activatedAt: null,
                        },
                        {
                            createdAt: {
                                gt: new Date(Date.now() - 24 * 60 * 60 * 1000) //24 hrs
                            }
                        },
                        {
                            token
                        }
                    ]
                }
            }
		},
	})
    
    if(!account){
        throw new Error('Invalid token')
    }

    await prisma.account.update({
        where: {
            id: account.id
        },
        data: {
            active: true;
        }
    })

    await prisma.activateToken.update({
        where: {
            token
        },
        data:{
            activatedAt: new Date(),
        }
    })
    
    redirect('/login')
}
