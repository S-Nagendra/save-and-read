import { SQLiteDatabase } from "expo-sqlite";
import { migration002 } from "./002_add_created_at";

interface Migration {
  id: string;
  run: (db: SQLiteDatabase) => Promise<void>;
}

export const migrations: Migration[] = [
  {
    id: "002_add_created_at",
    run: migration002,
  },
];