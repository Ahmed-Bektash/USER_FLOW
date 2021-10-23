import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationname1634900282826 implements MigrationInterface {
    name = 'migrationname1634900282826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "upload" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "is_premium" boolean NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "productId" uuid,
                CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "text" character varying NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "reply_to_id" uuid,
                "authorId" uuid,
                "productId" uuid,
                CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "product" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "description" character varying NOT NULL,
                "likes" integer NOT NULL,
                "dislikes" integer NOT NULL,
                "price" double precision NOT NULL,
                "sales" integer NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "ownerId" uuid,
                CONSTRAINT "REL_cbb5d890de1519efa20c42bcd5" UNIQUE ("ownerId"),
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
            CREATE TABLE "user_liked_products_product" (
                "userId" uuid NOT NULL,
                "productId" uuid NOT NULL,
                CONSTRAINT "PK_faba4f6b74fdd55bb0b5bded8fe" PRIMARY KEY ("userId", "productId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_c068ed98598f6fcb7a082299c5" ON "user_liked_products_product" ("userId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_84dc716602dd4662b7c88a078e" ON "user_liked_products_product" ("productId")
        `);
        await queryRunner.query(`
            ALTER TABLE "upload"
            ADD CONSTRAINT "FK_ca00886c4e5467e6bd92f31dc68" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_1e9f24a68bd2dcd6390a4008395" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "comment"
            ADD CONSTRAINT "FK_9e2a4ffe7e228c53a336b3f7380" FOREIGN KEY ("reply_to_id") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_cbb5d890de1519efa20c42bcd52" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
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
            ALTER TABLE "user_liked_products_product"
            ADD CONSTRAINT "FK_c068ed98598f6fcb7a082299c54" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "user_liked_products_product"
            ADD CONSTRAINT "FK_84dc716602dd4662b7c88a078e8" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "user_liked_products_product" DROP CONSTRAINT "FK_84dc716602dd4662b7c88a078e8"
        `);
        await queryRunner.query(`
            ALTER TABLE "user_liked_products_product" DROP CONSTRAINT "FK_c068ed98598f6fcb7a082299c54"
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
            ALTER TABLE "product" DROP CONSTRAINT "FK_cbb5d890de1519efa20c42bcd52"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_9e2a4ffe7e228c53a336b3f7380"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_1e9f24a68bd2dcd6390a4008395"
        `);
        await queryRunner.query(`
            ALTER TABLE "comment" DROP CONSTRAINT "FK_276779da446413a0d79598d4fbd"
        `);
        await queryRunner.query(`
            ALTER TABLE "upload" DROP CONSTRAINT "FK_ca00886c4e5467e6bd92f31dc68"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_84dc716602dd4662b7c88a078e"
        `);
        await queryRunner.query(`
            DROP INDEX "IDX_c068ed98598f6fcb7a082299c5"
        `);
        await queryRunner.query(`
            DROP TABLE "user_liked_products_product"
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
            DROP TABLE "comment"
        `);
        await queryRunner.query(`
            DROP TABLE "upload"
        `);
    }

}
