import {defineSchema,defineTable}from "convex/server";
import {v} from "convex/values";
export default defineSchema({
    users :defineTable({
        name :v.string(),
        email :v.string(),
        userId:v.string(),
    })
    .index("byUserId",["userId"])
    .index("byEmail",["email"]),

    properties:defineTable({
        title:v.string(),
        description:v.string(),
        price:v.number(),
        bedrooms:v.number(),
        bathrooms:v.number(),
        area:v.number(),
        address:v.string(),
        city:v.string(),
        state:v.string(),
        zipCode:v.string(),


        propertyType:v.union(
            v.literal("House"),
            v.literal("Apartment"),
            v.literal("Condo"),
            v.literal("Townhouse")
        ),
        images:v.array(v.string()),
        featured : v.optional(v.boolean()),}),


        propertyViewings : defineTable({
            propertyId : v.id("properties"),
           propertyTitle : v.string(),
           userEmail : v.string (),
           userName: v.string(),
           userPhone : v.string(),
           status : v.union(
            v.literal("Pending"),
            v.literal("confirmed"),),
            

            viewingDate : v.string(),
            viewingTime : v.string(),
            message : v.optional(v.string()),
             
            createdAt : v.string(),
            userId : v.optional(v.string()),})
            .index("by_property",["propertyId"])
            .index("by_user",["userId"])
            .index("by_email",["userEmail"])


})