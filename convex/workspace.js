import { mutation } from "./_generated/server";

export const CreateWorkspace = mutation({
    args: { 
        messages: v.any(),
        user: v.id('users')
    },
    handler: async(ctx,args) => {
        const workspaceId= await ctx.db.insert("workspace", {
            message:args.messages,
            user: args.user
        })
        return workspaceId;
     }
})


export const Workspace= query({
    args: { 
        workspaceId: v.id('workspace'),
    },
    handler: async(ctx, args) => {
        const workspace = await ctx.db.get(args.workspaceId);
        if(!workspace) {
            throw new Error("Workspace not found");
        }
        return workspace;
    }
})

export const GetAllworksppace = query({
    args: { 
        userId: v.id('users'),
    },
    handler: async(ctx, args) => {
        const result = await ctx.db.query("workspace").filter((q) => q.eq(q.field("user"), args.userId)).collect();
        return result;
    }
})