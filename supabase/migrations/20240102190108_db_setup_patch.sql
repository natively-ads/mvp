alter table "public"."campaigns" drop column "ads";

alter table "public"."campaigns" add column "adId" bigint not null;

alter table "public"."impressions" drop column "adId";

alter table "public"."campaigns" add constraint "campaigns_adId_fkey" FOREIGN KEY ("adId") REFERENCES ads("adId") not valid;

alter table "public"."campaigns" validate constraint "campaigns_adId_fkey";


