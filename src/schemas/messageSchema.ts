import { z } from "zod";

export const messageSchema = z.object({
   content: z.string()
   .min(10,{message:"at least 10 char"})
   .max(300,{message:"at most 300 char"})
})

// Nextjs is an Edge time framework , means as soon as the user request for something it provide that time only, not all the time.
//exp=>, mostly backend are continuous running for that we use cloud etc but nextjs does not do so ,it only works as per the user request. It is not running all time, means databse is not connected all time.