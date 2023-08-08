import prismadb from "@/Prisma"

export const connectToDatabase = async () => {
    try{
        await prismadb.$connect()
    } catch(e){
        console.log(e)
        throw new Error("Could not connect to database")
    }
}