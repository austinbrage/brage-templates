import { z } from 'zod';

export class UsersValidation {

    schema = z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
    })
    
    getByID = (data) => this.schema.pick({ id: true }).safeParse(data)
    addNew = (data) => this.schema.pick({ name: true, email: true }).safeParse(data)
    changeAll = (data) => this.schema.pick({ name: true, email: true, id: true }).safeParse(data)
    remove = (data) => this.schema.pick({ id: true }).safeParse(data)

}

export class UsersStringValidation {

    schema = z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
    })
    
    getByID = (data) => this.schema.pick({ id: true }).safeParse(data)
    
    
    
}