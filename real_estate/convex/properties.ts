// get all properties with optional filters 

import { query } from "./_generated/server";
import { v } from "convex/values";

export const getProperties = query({
    args: {
        propertyType: v.optional(v.string()),
        status: v.optional(v.string()),
        minPrice: v.optional(v.number()),
        maxPrice: v.optional(v.number()),
        bedrooms: v.optional(v.number()),
        bathrooms: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        let properties = await ctx.db.query("properties").collect();

        // apply filters
        if (args.propertyType && args.propertyType !== "all") {
            properties = properties.filter((p) => p.propertyType === args.propertyType);
        }
        if (args.status && args.status !== "all") {
            properties = properties.filter((p) => p.status === args.status);
        }
        if (args.minPrice !== undefined) {
            properties = properties.filter((p) => p.price >= args.minPrice!);
        }
        if (args.maxPrice !== undefined) {
            properties = properties.filter((p) => p.price <= args.maxPrice!);
        }
        if (args.bedrooms !== undefined) {
            properties = properties.filter((p) => p.bedrooms === args.bedrooms!);
        }
        if (args.bathrooms !== undefined) {
            properties = properties.filter((p) => p.bathrooms === args.bathrooms!);
        }

        // Sort by creation time (newest first) and return
        return properties.sort((a, b) => b._creationTime - a._creationTime);
    },
});