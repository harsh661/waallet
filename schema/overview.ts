import { z } from "zod";

export const OverviewSchema = z.object({
    from: z.coerce.date(),
    to: z.coerce.date(),
})