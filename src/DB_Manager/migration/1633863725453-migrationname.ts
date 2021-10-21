import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationname1633863725453 implements MigrationInterface {
    name = 'migrationname1633863725453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "upload" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "is_premium" boolean NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" uuid,
                "productId" uuid,
                CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "product" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "phone_number" character varying NOT NULL,
                "email" character varying NOT NULL,
                "is_prenium_account" boolean NOT NULL DEFAULT false,
                "password" character varying NOT NULL,
                "type" "user_type_enum" NOT NULL,
                "reset_password_token" character varying,
                "reset_password_expire_time" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_01eea41349b6c9275aec646eee0" UNIQUE ("phone_number"),
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "address" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "city" character varying,
                "area" character varying NOT NULL,
                "street" character varying,
                "building" character varying,
                "flat" character varying,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "profileId" uuid,
                CONSTRAINT "REL_d037a6704e2acea2438d9ab218" UNIQUE ("profileId"),
                CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "card" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "holder" character varying NOT NULL,
                "type" character varying NOT NULL,
                "number" integer NOT NULL,
                "expiration_date" TIMESTAMP NOT NULL,
                "ccv" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "userId" uuid,
                CONSTRAINT "REL_77d7cc9d95dccd574d71ba221b" UNIQUE ("userId"),
                CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_relation_user" (
                "userId_1" uuid NOT NULL,
                "userId_2" uuid NOT NULL,
                CONSTRAINT "PK_d091bd15571458433fc6403c131" PRIMARY KEY ("userId_1", "userId_2")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_163320348f33c06f651cd3cccc" ON "user_relation_user" ("userId_1")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_6515ffb6df8858ecc263a54979" ON "user_relation_user" ("userId_2")
        `);
        await queryRunner.query(`
            CREATE TABLE "user_product_product" (
                "userId" uuid NOT NULL,
                "productId" uuid NOT NULL,
                CONSTRAINT "PK_7457123b80c99e88d63aaedc3af" PRIMARY KEY ("userId", "productId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_705c03c5c9a2eda0f6fd0871eb" ON "user_product_product" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_73a925ab0a8f1239c9e46dbd5c" ON "user_product_product" ("productId")
        `);
        await queryRunner.query(`
            ALTER TABLE "upload"
            ADD CONSTRAINT "FK_0acad24db01762fb1d5b51a70cd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "upload"
            ADD CONSTRAINT "FK_ca00886c4e5467e6bd92f31dc68" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "address"
            ADD CONSTRAINT "FK_d037a6704e2acea2438d9ab218b" FOREIGN KEY ("profileId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "card"
            ADD CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user_relation_user"
            ADD CONSTRAINT "FK_163320348f33c06f651cd3ccccd" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "user_relation_user"
            ADD CONSTRAINT "FK_6515ffb6df8858ecc263a549797" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "user_product_product"
            ADD CONSTRAINT "FK_705c03c5c9a2eda0f6fd0871eb5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "user_product_product"
            ADD CONSTRAINT "FK_73a925ab0a8f1239c9e46dbd5c8" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_product_product" DROP CONSTRAINT "FK_73a925ab0a8f1239c9e46dbd5c8"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_product_product" DROP CONSTRAINT "FK_705c03c5c9a2eda0f6fd0871eb5"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_relation_user" DROP CONSTRAINT "FK_6515ffb6df8858ecc263a549797"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_relation_user" DROP CONSTRAINT "FK_163320348f33c06f651cd3ccccd"
        `);
        await queryRunner.query(`
            ALTER TABLE "card" DROP CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0"
        `);
        await queryRunner.query(`
            ALTER TABLE "address" DROP CONSTRAINT "FK_d037a6704e2acea2438d9ab218b"
        `);
        await queryRunner.query(`
            ALTER TABLE "upload" DROP CONSTRAINT "FK_ca00886c4e5467e6bd92f31dc68"
        `);
        await queryRunner.query(`
            ALTER TABLE "upload" DROP CONSTRAINT "FK_0acad24db01762fb1d5b51a70cd"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_73a925ab0a8f1239c9e46dbd5c"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_705c03c5c9a2eda0f6fd0871eb"
        `);
        await queryRunner.query(`
            DROP TABLE "user_product_product"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_6515ffb6df8858ecc263a54979"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_163320348f33c06f651cd3cccc"
        `);
        await queryRunner.query(`
            DROP TABLE "user_relation_user"
        `);
        await queryRunner.query(`
            DROP TABLE "card"
        `);
        await queryRunner.query(`
            DROP TABLE "address"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP TABLE "product"
        `);
        await queryRunner.query(`
            DROP TABLE "upload"
        `);
    }

}
