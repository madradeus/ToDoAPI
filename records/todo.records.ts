import {v4 as uuid} from "uuid";
import {pool} from "../utils/db";
import {NotFoundError, ValidationError} from "../error/handleError";
import {FieldPacket} from "mysql2";


export class TodoRecord {
     public id: string;
     public title: string;
    constructor(obj: Omit<TodoRecord, 'insert' | 'delete' | 'update'>) {
        this.validate();
        this.id = obj.id ?? uuid();
        this.title = obj.title;
    }

    private validate(): void {
        if (this.title) {
            if (this.title.trim().length < 5 ) {
                throw new ValidationError('Todo title should be at least 5 characters');
            }
            if (this.title.length > 150) {
                throw new ValidationError('Todo title should be less than 150 characters');
            }
        } else {throw new ValidationError ('Incorrect request body')}

    }

    async insert(): Promise<string> {
        await pool.execute('INSERT INTO `todos` VALUES(:id, :title)', {
            id: this.id,
            title: this.title,
        });
        return this.id;
    }

    async delete(): Promise<string> {
        if (!this.id) {
            throw new ValidationError('Todo has no ID.')
        }

        await pool.execute('DELETE FROM `todos` WHERE `id` = :id', {
            id: this.id,
        });
        return this.id;
    }

    async update(title: string): Promise<string> {
        if (!this.id) {
            throw new ValidationError('Todo has no ID.');
        }
        this.validate();
        await pool.execute('UPDATE `todos` SET `title` = :title WHERE `id` = :id', {
            id: this.id,
            title,
        });
        return this.id;
    }
    static async findOne(id: string): Promise<TodoRecord> {
        const [foundOne] = await pool.execute('SELECT * FROM `todos` WHERE `id` = :id', {
            id,
        }) as [TodoRecord[], FieldPacket[]];

        if (foundOne.length < 1) {
            throw new NotFoundError()
        }
        return new TodoRecord(foundOne[0])
    }

    static async findAll(): Promise<TodoRecord[]> {
        const [foundAll] = await pool.execute('SELECT * FROM `todos`') as [TodoRecord[], FieldPacket[]]
        const foundAllAsTodoRecord = foundAll.map(el => new TodoRecord(el))

        return foundAllAsTodoRecord
    }
}
