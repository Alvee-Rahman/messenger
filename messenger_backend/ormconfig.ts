import { AuthEntity } from "src/auth/entities/auth.entity";
import { Conversation } from "src/conversation/entities/conversation.entity";
import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: "postgres",
    database: "PRD",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: 'Password',
    entities: [AuthEntity,Conversation],
    synchronize: true
}

export default config;