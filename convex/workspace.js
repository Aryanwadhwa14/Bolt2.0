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


export const DeleteWorkspace = mutation({
    args: { 
        workspaceId: v.id('workspace'),
    },
    handler: async(ctx, args) => {
        const workspace = await ctx.db.get(args.workspaceId);
        if(!workspace) {
            throw new Error("Workspace not found");
        }
        await ctx.db.delete(args.workspaceId);
        return true;
    }
})

export const UpdateWorkspace = mutation({  
    args: { 
        workspaceId: v.id('workspace'),
        messages: v.any(),
    },
    handler: async(ctx, args) => {
        const workspace = await ctx.db.get(args.workspaceId);
        if(!workspace) {
            throw new Error("Workspace not found");
        }
        await ctx.db.patch(args.workspaceId, {
            message: args.messages,
        });
        return true;
    }

})

export const GetWorkspaceByUser = query({   
    args: { 
        userId: v.id('users'),
    },
    handler: async(ctx, args) => {
        const workspace = await ctx.db.query("workspace").filter((q) => q.eq(q.field("user"), args.userId)).collect();
        if(workspace.length === 0) {
            throw new Error("Workspace not found for this user");
        }
        return workspace;
    }
})

export const ModifyWorkspace = mutation({   
    args: { 
        workspaceId: v.id('workspace'),
        messages: v.any(),
    },
    handler: async(ctx, args) => {
        const workspace = await ctx.db.get(args.workspaceId);
        if(!workspace) {
            throw new Error("Workspace not found");
        }
        await ctx.db.patch(args.workspaceId, {
            message: args.messages,
        });
        return true;
    }
})

export const GetWorkspaceById = query({ 
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

export const FilterWorkspacesByUser = query({
    args: { 
        userId: v.id('users'),
    },
    handler: async(ctx, args) => {
        const workspaces = await ctx.db.query("workspace").filter((q) => q.eq(q.field("user"), args.userId)).collect();
        if(workspaces.length === 0) {
            throw new Error("No workspaces found for this user");
        }
        return workspaces;
    }
})

export const GetWorkspaceMessages = query({
    args: { 
        workspaceId: v.id('workspace'),
    },
    handler: async(ctx, args) => {
        const workspace = await ctx.db.get(args.workspaceId);
        if(!workspace) {
            throw new Error("Workspace not found");
        }
        return workspace.message;
    }
})


