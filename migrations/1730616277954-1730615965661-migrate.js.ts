import { MigrationInterface, QueryRunner } from "typeorm";

export class 1730615965661Migrate.js1730616277954 implements MigrationInterface {
    name = '1730615965661Migrate.js1730616277954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "status" character varying NOT NULL, "deleted_at" TIMESTAMP, "stock" integer NOT NULL, "price" integer NOT NULL, "category_product" character varying NOT NULL, "gender" character varying NOT NULL, "percentaje_discount" integer NOT NULL, "franchise" character varying, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "lastname" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "purchase_order" uuid, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "date" TIMESTAMP NOT NULL, "amount" integer NOT NULL, "envoy" boolean NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cashflows" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "date" TIMESTAMP NOT NULL, "balance_day" integer, "revenue" integer, "expenses" integer, "monthly_balance" integer, "monthly_expenses" integer, "monthly_revenue" integer, CONSTRAINT "PK_bee5495848b3fe5df4dcd0f9b38" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."admin_permissions_enum" AS ENUM('superadmin', 'admin', 'noadmin')`);
        await queryRunner.query(`CREATE TABLE "admin" ("name" character varying NOT NULL, "email" character varying NOT NULL, "lastname" character varying NOT NULL, "password" character varying NOT NULL, "phone" integer NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "create_at" TIMESTAMP NOT NULL DEFAULT now(), "update_at" TIMESTAMP NOT NULL DEFAULT now(), "permissions" "public"."admin_permissions_enum" NOT NULL DEFAULT 'admin', CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_product" ("productsId" uuid NOT NULL, "orderId" uuid NOT NULL, CONSTRAINT "PK_894125ca5c06594312ac094a077" PRIMARY KEY ("productsId", "orderId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_be12a0c9d8c52c739382a23e6d" ON "order_product" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3fb066240db56c9558a9113943" ON "order_product" ("orderId") `);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_4b8f67e30e11211e443291a02cd" FOREIGN KEY ("purchase_order") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_be12a0c9d8c52c739382a23e6da" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_product" ADD CONSTRAINT "FK_3fb066240db56c9558a91139431" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_3fb066240db56c9558a91139431"`);
        await queryRunner.query(`ALTER TABLE "order_product" DROP CONSTRAINT "FK_be12a0c9d8c52c739382a23e6da"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_4b8f67e30e11211e443291a02cd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3fb066240db56c9558a9113943"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_be12a0c9d8c52c739382a23e6d"`);
        await queryRunner.query(`DROP TABLE "order_product"`);
        await queryRunner.query(`DROP TABLE "admin"`);
        await queryRunner.query(`DROP TYPE "public"."admin_permissions_enum"`);
        await queryRunner.query(`DROP TABLE "cashflows"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
