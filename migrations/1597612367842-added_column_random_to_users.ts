import {MigrationInterface, QueryRunner} from "typeorm";

export class addedColumnRandomToUsers1597612367842 implements MigrationInterface {
    name = 'addedColumnRandomToUsers1597612367842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "is_active" boolean NOT NULL, "email" varchar NOT NULL, "birth_date" date NOT NULL, "password" varchar NOT NULL, "random" varchar NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_users"("created_at", "updated_at", "id", "first_name", "last_name", "is_active", "email", "birth_date", "password") SELECT "created_at", "updated_at", "id", "first_name", "last_name", "is_active", "email", "birth_date", "password" FROM "users"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "is_active" boolean NOT NULL, "email" varchar NOT NULL, "birth_date" date NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`, undefined);
        await queryRunner.query(`INSERT INTO "users"("created_at", "updated_at", "id", "first_name", "last_name", "is_active", "email", "birth_date", "password") SELECT "created_at", "updated_at", "id", "first_name", "last_name", "is_active", "email", "birth_date", "password" FROM "temporary_users"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_users"`, undefined);
    }

}
