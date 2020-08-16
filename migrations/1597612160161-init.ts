import {MigrationInterface, QueryRunner} from "typeorm";

export class init1597612160161 implements MigrationInterface {
    name = 'init1597612160161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "is_active" boolean NOT NULL, "email" varchar NOT NULL, "birth_date" date NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`, undefined);
        await queryRunner.query(`CREATE TABLE "posts" ("created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "body" text NOT NULL, "user_id" integer)`, undefined);
        await queryRunner.query(`CREATE TABLE "categories_posts" ("created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "some_column" varchar NOT NULL, "post_id" integer, "category_id" integer)`, undefined);
        await queryRunner.query(`CREATE TABLE "categories" ("created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "label" varchar NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_posts" ("created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "body" text NOT NULL, "user_id" integer, CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_posts"("created_at", "updated_at", "id", "body", "user_id") SELECT "created_at", "updated_at", "id", "body", "user_id" FROM "posts"`, undefined);
        await queryRunner.query(`DROP TABLE "posts"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_posts" RENAME TO "posts"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_categories_posts" ("created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "some_column" varchar NOT NULL, "post_id" integer, "category_id" integer, CONSTRAINT "FK_653a5dd4ae2517979bc6be018ab" FOREIGN KEY ("post_id") REFERENCES "posts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_70980bcc3dc8718e5d580afc620" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_categories_posts"("created_at", "updated_at", "id", "some_column", "post_id", "category_id") SELECT "created_at", "updated_at", "id", "some_column", "post_id", "category_id" FROM "categories_posts"`, undefined);
        await queryRunner.query(`DROP TABLE "categories_posts"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_categories_posts" RENAME TO "categories_posts"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories_posts" RENAME TO "temporary_categories_posts"`, undefined);
        await queryRunner.query(`CREATE TABLE "categories_posts" ("created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "some_column" varchar NOT NULL, "post_id" integer, "category_id" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "categories_posts"("created_at", "updated_at", "id", "some_column", "post_id", "category_id") SELECT "created_at", "updated_at", "id", "some_column", "post_id", "category_id" FROM "temporary_categories_posts"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_categories_posts"`, undefined);
        await queryRunner.query(`ALTER TABLE "posts" RENAME TO "temporary_posts"`, undefined);
        await queryRunner.query(`CREATE TABLE "posts" ("created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "body" text NOT NULL, "user_id" integer)`, undefined);
        await queryRunner.query(`INSERT INTO "posts"("created_at", "updated_at", "id", "body", "user_id") SELECT "created_at", "updated_at", "id", "body", "user_id" FROM "temporary_posts"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_posts"`, undefined);
        await queryRunner.query(`DROP TABLE "categories"`, undefined);
        await queryRunner.query(`DROP TABLE "categories_posts"`, undefined);
        await queryRunner.query(`DROP TABLE "posts"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
