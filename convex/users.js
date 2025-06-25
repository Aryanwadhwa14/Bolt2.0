import { mutation } from "./_generated/server";
import {v} from "convex/values"

export const CreateUser = mutation({
    args: {
        name : v.string(),
        email: v.string(),
        picture : v.string(),
        uid: v.string()
    },
    handler: async(ctx,args)=> {
        // if user already exists 
        const user = await ctx.db.query('users').filter((q)=> q.eq(q.field('email'),args.email)).collect
        console.log(user)

        // if not, then add new user 
        if(user?.length==0) {
            const result = await ctx.db.insert('users', {
                name: args.name,
                picture: args.picture,
                email: args.email,
                uid:args.uid
            });
            console.log(result)
        }
    }
})


export const Getuser = query({
    args: {
        email: v.string()
    }, 
    handler: async(ctx,args)=> {
        const user = await ctx.db.query('users').fileter((q)=> q.eq(q.field('email'),args.email)).collect();
        return user[0];
    }
})

export const UpdateToken = mutation({
    args: {
        email: v.string(),
        token: v.string()
    },
    handler: async(ctx,args)=> {
        const user = await ctx.db.query('users').filter((q)=> q.eq(q.field('email'),args.email)).collect();
        if(user?.length>0) {
            const result = await ctx.db.patch(user[0]._id, {
                token: args.token
            });
            return result;
        }
        return null;
    }
})

export const GetAllUsers = query({  
    handler: async(ctx)=> {
        const users = await ctx.db.query('users').collect();
        return users;
    }
})

export const GetUserById = query({
    args: {
        userId: v.id('users')
    },
    handler: async(ctx,args)=> {
        const user = await ctx.db.get(args.userId);
        if(!user) {
            throw new Error("User not found");
        }
        return user;
    }
})

export const DeleteUser = mutation({
    args: {
        userId: v.id('users')
    },
    handler: async(ctx,args)=> {
        const user = await ctx.db.get(args.userId);
        if(!user) {
            throw new Error("User not found");
        }
        await ctx.db.delete(args.userId);
        return true;
    }
})

export const UpdateUser = mutation({
    args: {
        userId: v.id('users'),
        name: v.string(),
        picture: v.string(),
        email: v.string(),
    },
    handler: async(ctx,args)=> {
        const user = await ctx.db.get(args.userId);
        if(!user) {
            throw new Error("User not found");
        }
        await ctx.db.patch(args.userId, {
            name: args.name,
            picture: args.picture,
            email: args.email,
        });
        return true;
    }
})

export const GetUserByEmail = query({  
    args: {
        email: v.string()
    },
    handler: async(ctx,args)=> {
        const user = await ctx.db.query('users').filter((q)=> q.eq(q.field('email'),args.email)).collect();
        if(user?.length>0) {
            return user[0];
        }
        return null;
    }
})

export const GetUserByUid = query({
    args: {
        uid: v.string()
    },
    handler: async(ctx,args)=> {
        const user = await ctx.db.query('users').filter((q)=> q.eq(q.field('uid'),args.uid)).collect();
        if(user?.length>0) {
            return user[0];
        }
        return null;
    }
})

export const GetUserByName = query({
    args: {
        name: v.string()
    },
    handler: async(ctx,args)=> {
        const user = await ctx.db.query('users').filter((q)=> q.eq(q.field('name'),args.name)).collect();
        if(user?.length>0) {
            return user[0];
        }
        return null;
    }
})

export const GetUserByPicture = query({
    args: {
        picture: v.string()
    },
    handler: async(ctx,args)=> {
        const user = await ctx.db.query('users').filter((q)=> q.eq(q.field('picture'),args.picture)).collect();
        if(user?.length>0) {
            return user[0];
        }
        return null;
    }
})

export const GetUserByToken = query({
    args: {
        token: v.string()
    },
    handler: async(ctx,args)=> {
        const user = await ctx.db.query('users').filter((q)=> q.eq(q.field('token'),args.token)).collect();
        if(user?.length>0) {
            return user[0];
        }
        return null;
    }
})

export const GetUserByEmailAndToken = query({
    args: {
        email: v.string(),
        token: v.string()
    },
    handler: async(ctx,args)=> {
        const user = await ctx.db.query('users').filter((q)=> 
            q.and(
                q.eq(q.field('email'),args.email),
                q.eq(q.field('token'),args.token)
            )
        ).collect();
        if(user?.length>0) {
            return user[0];
        }
        return null;
    }
})